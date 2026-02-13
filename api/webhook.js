import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Vercel: disable body parsing so we can verify the raw signature
export const config = { api: { bodyParser: false } }

async function buffer(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: `Webhook Error: ${err.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { type, id } = session.metadata

    // Record the payment
    await supabase.from('payments').insert({
      stripe_session_id: session.id,
      batch_id: type === 'batch' ? id : null,
      course_id: type === 'course' ? id : null,
      amount: session.amount_total,
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
  }

  return res.status(200).json({ received: true })
}
