/**
 * Initiates a Stripe Checkout session by calling the serverless API,
 * then redirects the user to the Stripe-hosted payment page.
 *
 * @param {'batch'|'course'} type - Item type
 * @param {string} id - Supabase batch UUID or course slug
 * @param {string} priceId - Stripe Price ID (from dashboard)
 */
export async function checkout(type, id, priceId) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, id, priceId }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to create checkout session')
  }

  const { url } = await res.json()
  window.location.href = url
}
