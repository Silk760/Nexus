import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Vercel: disable body parsing so we can read raw body for hash verification
export const config = { api: { bodyParser: false } }

async function buffer(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

function verifyTapHash(body, hashHeader, secretKey) {
  const data = body
  // Tap hashstring = HMAC-SHA256 of: id + amount + currency + gateway_reference + payment_reference + status + created
  const toHash = [
    data.id || '',
    String(data.amount || ''),
    data.currency || '',
    data.reference?.gateway || '',
    data.reference?.payment || '',
    data.status || '',
    String(data.transaction?.created || ''),
  ].join('')

  const computed = crypto
    .createHmac('sha256', secretKey)
    .update(toHash)
    .digest('hex')

  return computed === hashHeader
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body
  try {
    const buf = await buffer(req)
    body = JSON.parse(buf.toString())
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  // Verify Tap webhook authenticity
  const hashHeader = req.headers.hashstring
  if (hashHeader && process.env.TAP_SECRET_KEY) {
    const valid = verifyTapHash(body, hashHeader, process.env.TAP_SECRET_KEY)
    if (!valid) {
      console.error('Tap webhook hash verification failed')
      return res.status(400).json({ error: 'Invalid hash' })
    }
  }

  // Only process captured (successful) charges
  if (body.status !== 'CAPTURED') {
    return res.status(200).json({ received: true, status: body.status })
  }

  const type = body.metadata?.type
  const id = body.metadata?.id

  // Record the payment
  await supabase.from('payments').insert({
    stripe_session_id: body.id, // reusing column for Tap charge ID
    batch_id: type === 'batch' ? id : null,
    course_id: type === 'course' ? id : null,
    amount: Math.round((body.amount || 0) * 100), // store in halalas
    status: 'completed',
  })

  // Increment seats for batch purchases
  if (type === 'batch') {
    const { data, error } = await supabase.rpc('increment_seats', {
      batch_uuid: id,
    })
    if (error) {
      console.error('Failed to increment seats:', error)
    } else {
      console.log(`Batch ${id} now has ${data} registered seats`)
    }
  }

  return res.status(200).json({ received: true })
}
