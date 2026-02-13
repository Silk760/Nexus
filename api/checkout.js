import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { type, id, priceId } = req.body

    if (!type || !id || !priceId) {
      return res.status(400).json({ error: 'Missing type, id, or priceId' })
    }

    const origin = req.headers.origin || `https://${req.headers.host}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { type, id },
      success_url: `${origin}/${type === 'batch' ? 'training' : 'courses'}?success=1`,
      cancel_url: `${origin}/${type === 'batch' ? 'training' : 'courses'}?canceled=1`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return res.status(500).json({ error: err.message })
  }
}
