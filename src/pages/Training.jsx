import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { checkout } from '../lib/checkout'
import { useLanguage } from '../i18n/LanguageContext'

const WS_COLORS = ['#c8a2ff', '#78dce8', '#a9dc76', '#ffab70', '#ff7eb6', '#c8a2ff']

export default function Training() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(null)
  const { t } = useLanguage()

  useEffect(() => {
    supabase
      .from('batches')
      .select('*')
      .eq('active', true)
      .then(({ data, error }) => {
        if (error) console.error('Failed to load batches:', error)
        else {
          const sorted = (data || []).sort(
            (a, b) => new Date(a.start_date) - new Date(b.start_date)
          )
          setBatches(sorted)
        }
        setLoading(false)
      })

    const channel = supabase
      .channel('batches-realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'batches' }, (payload) => {
        setBatches((prev) => prev.map((b) => (b.id === payload.new.id ? { ...b, ...payload.new } : b)))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  async function handlePayCheckout(batch) {
    if (batch.registered >= batch.total_seats) return
    setCheckingOut(batch.id)
    try { await checkout('batch', batch.id, batch.price_sar) }
    catch (err) { console.error(err); alert('Could not start checkout. Please try again.') }
    finally { setCheckingOut(null) }
  }

  const workshops = t('training.workshops')

  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">{t('training.number')}</div>
      <h2 className="section-title">{t('training.title')}</h2>
      <p className="section-subtitle">{t('training.subtitle')}</p>

      <div className="training-info-row">
        <div className="training-info-card">
          <div className="training-info-value">{t('training.seatsOnlyValue')}</div>
          <div className="training-info-label">{t('training.seatsOnlyLabel')}</div>
        </div>
        <div className="training-info-card">
          <div className="training-info-value">{t('training.sarSeatValue')}</div>
          <div className="training-info-label">{t('training.sarSeatLabel')}</div>
        </div>
        <div className="training-info-card">
          <div className="training-info-value">{t('training.oneWeekValue')}</div>
          <div className="training-info-label">{t('training.oneWeekLabel')}</div>
        </div>
        <div className="training-info-card">
          <div className="training-info-value">{t('training.newBatchesValue')}</div>
          <div className="training-info-label">{t('training.newBatchesLabel')}</div>
        </div>
      </div>

      <h3 className="training-sub-heading">{t('training.upcomingBatches')}</h3>
      <div className="batches-list">
        {loading && <p style={{ color: '#999', textAlign: 'center' }}>{t('training.loadingBatches')}</p>}
        {!loading && batches.length === 0 && <p style={{ color: '#999', textAlign: 'center' }}>{t('training.noBatches')}</p>}
        {batches.map((batch) => {
          const remaining = batch.total_seats - batch.registered
          const isFull = remaining <= 0
          const pct = Math.min((batch.registered / batch.total_seats) * 100, 100)
          return (
            <div className={`batch-row ${isFull ? 'batch-row--full' : ''}`} key={batch.id}>
              <div className="batch-left">
                <div className="batch-dates">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {batch.start_date} &ndash; {batch.end_date}
                </div>
                <div className="batch-seats-info">
                  <div className="batch-seats-bar">
                    <div className={`batch-seats-fill ${isFull ? 'batch-seats-fill--full' : ''}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="batch-seats-text">
                    <strong>{batch.registered}</strong>/{batch.total_seats} {t('training.registered')}
                    {!isFull && <> &mdash; <span className="batch-remaining">{remaining} {t('training.seatsLeft')}</span></>}
                    {isFull && <> &mdash; <span className="batch-full-label">{t('training.batchFull')}</span></>}
                  </span>
                </div>
              </div>
              <div className="batch-right">
                {isFull ? (
                  <span className="batch-sold-out">{t('training.soldOut')}</span>
                ) : (
                  <div className="batch-pay-buttons">
                    <button className="pay-btn pay-btn--tap" disabled={checkingOut === batch.id} onClick={() => handlePayCheckout(batch)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                      {checkingOut === batch.id ? t('training.redirecting') : t('training.payNow')}
                    </button>
                    <a className="pay-btn pay-btn--tabby" href="#" target="_blank" rel="noopener noreferrer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v4H3V3zm0 7h18v4H3v-4zm0 7h18v4H3v-4z" /></svg>
                      {t('training.tabby')}
                    </a>
                    <a className="pay-btn pay-btn--tamara" href="#" target="_blank" rel="noopener noreferrer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" /></svg>
                      {t('training.tamara')}
                    </a>
                    <span className="batch-price-tag">{batch.price_sar?.toLocaleString()} SAR</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <h3 className="training-sub-heading">{t('training.whatYouLearn')}</h3>
      <div className="workshops-grid">
        {workshops.map((ws, i) => (
          <div className="workshop-card" key={i}>
            <div className="workshop-accent" style={{ background: WS_COLORS[i] }} />
            <div className="workshop-body">
              <h3 className="workshop-title" style={{ color: WS_COLORS[i] }}>{ws.title}</h3>
              <p className="workshop-desc">{ws.description}</p>
              <ul className="workshop-topics">
                {ws.topics.map((topic, j) => (
                  <li key={j}>
                    <span className="workshop-topic-dot" style={{ background: WS_COLORS[i] }} />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="corporate-block">
        <div className="corporate-content">
          <div className="corporate-badge">{t('training.forCompanies')}</div>
          <h3 className="corporate-title">{t('training.corpTitle')}</h3>
          <p className="corporate-desc">{t('training.corpDesc')}</p>
          <div className="corporate-price">
            <span className="corporate-price-amount">{t('training.corpPrice')}</span>
            <span className="corporate-price-detail">{t('training.corpPriceDetail')}</span>
          </div>
          <div className="corporate-actions">
            <a className="pay-btn pay-btn--tap corporate-pay" href="#" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
              {t('training.corpPayNow')}
            </a>
            <a className="pay-btn pay-btn--tabby corporate-pay" href="#" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v4H3V3zm0 7h18v4H3v-4zm0 7h18v4H3v-4z" /></svg>
              {t('training.corpPayTabby')}
            </a>
            <a className="pay-btn pay-btn--tamara corporate-pay" href="#" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" /></svg>
              {t('training.corpPayTamara')}
            </a>
            <a className="corporate-contact" href="mailto:nexus@example.com">
              {t('training.corpContact')}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="section-callout" style={{ marginTop: '2.5rem' }}>{t('training.callout')}</div>
    </section>
  )
}
