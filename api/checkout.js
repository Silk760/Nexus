export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { type, id, amount, currency } = req.body

    if (!type || !id || !amount) {
      return res.status(400).json({ error: 'Missing type, id, or amount' })
    }

    const origin = req.headers.origin || `https://${req.headers.host}`
    const redirectPath = type === 'batch' ? 'training' : 'courses'

    const charge = await fetch('https://api.tap.company/v2/charges/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: currency || 'SAR',
        source: { id: 'src_all' },
        redirect: { url: `${origin}/${redirectPath}?success=1` },
        post: { url: `${origin}/api/webhook` },
        metadata: { type, id },
        description:
          type === 'batch'
            ? `NEXUS Training Workshop – 1 Seat`
            : `NEXUS Course Enrollment`,
      }),
    })

    const data = await charge.json()

    if (!charge.ok || !data.transaction?.url) {
      console.error('Tap charge error:', data)
      return res
        .status(500)
        .json({ error: data.errors?.[0]?.description || 'Failed to create charge' })
    }

    return res.status(200).json({ url: data.transaction.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return res.status(500).json({ error: err.message })
  }
}
