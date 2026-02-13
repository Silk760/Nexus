/**
 * Initiates a Tap Payments checkout by calling the serverless API,
 * then redirects the user to the Tap-hosted payment page.
 *
 * @param {'batch'|'course'} type - Item type
 * @param {string} id - Supabase batch UUID or course slug
 * @param {number} amount - Amount in SAR
 * @param {string} [currency='SAR'] - Currency code
 */
export async function checkout(type, id, amount, currency = 'SAR') {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, id, amount, currency }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to create checkout session')
  }

  const { url } = await res.json()
  window.location.href = url
}
