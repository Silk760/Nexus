import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../i18n/LanguageContext'

const MAX_SEATS = 20

const WS_COLORS = ['#c8a2ff', '#78dce8', '#a9dc76', '#ffab70', '#ff7eb6', '#c8a2ff']

const SCHEDULE = [
  { id: 'ws-productivity-mar15', workshopIndex: 0, color: WS_COLORS[0] },
  { id: 'ws-agents-mar22', workshopIndex: 1, color: WS_COLORS[1] },
  { id: 'ws-decision-mar29', workshopIndex: 2, color: WS_COLORS[2] },
  { id: 'ws-genai-apr5', workshopIndex: 3, color: WS_COLORS[3] },
  { id: 'ws-integration-apr12', workshopIndex: 4, color: WS_COLORS[4] },
  { id: 'ws-strategy-apr19', workshopIndex: 5, color: WS_COLORS[5] },
]

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function TrainingRegistrationForm({ workshopId, seatsTaken, onRegistered, user, t }) {
  const [mode, setMode] = useState('linkedin')
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const seatsLeft = MAX_SEATS - seatsTaken
  const isFull = seatsLeft <= 0

  async function handleLinkedInSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: { redirectTo: window.location.origin + '/training' },
    })
  }

  async function handleLinkedInRegister() {
    if (!user || isFull) return
    setStatus('loading')
    setErrorMsg('')
    const userName = user.user_metadata?.full_name || user.user_metadata?.name || ''
    const userEmail = user.email || ''
    if (!userName || !userEmail) {
      setStatus('error')
      setErrorMsg('Could not retrieve your name or email from LinkedIn.')
      return
    }
    const { error } = await supabase
      .from('training_registrations')
      .insert({ workshop_id: workshopId, name: userName, email: userEmail.toLowerCase(), method: 'linkedin' })
      .select()
    if (error) {
      if (error.code === '23505') setStatus('duplicate')
      else { setStatus('error'); setErrorMsg(t('training.registrationFailed')) }
    } else { setStatus('success'); onRegistered() }
  }

  async function handleEmailRegister(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || isFull) return
    setStatus('loading')
    setErrorMsg('')
    const { error } = await supabase
      .from('training_registrations')
      .insert({ workshop_id: workshopId, name: name.trim(), email: email.trim().toLowerCase(), method: 'email' })
      .select()
    if (error) {
      if (error.code === '23505') setStatus('duplicate')
      else { setStatus('error'); setErrorMsg(t('training.registrationFailed')) }
    } else { setStatus('success'); onRegistered() }
  }

  if (status === 'success') {
    return (
      <div className="training-reg-confirmed">
        <div className="training-reg-confirmed-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <div>
          <div className="training-reg-confirmed-title">{t('training.registrationConfirmed')}</div>
          <div className="training-reg-confirmed-desc">{t('training.registrationConfirmedDesc')}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="training-reg-section">
      <div className="training-reg-header">
        <span className="training-reg-title">{t('training.registerTitle')}</span>
        <span className={`training-reg-seats ${isFull ? 'training-reg-seats--full' : seatsLeft <= 5 ? 'training-reg-seats--low' : ''}`}>
          {isFull ? t('training.soldOut') : `${seatsLeft} / ${MAX_SEATS} ${t('training.seatsLeft')}`}
        </span>
      </div>

      {isFull ? (
        <div className="training-reg-full">{t('training.workshopFull')}</div>
      ) : (
        <>
          <div className="training-reg-tabs">
            <button
              className={`training-reg-tab ${mode === 'linkedin' ? 'training-reg-tab--active' : ''}`}
              onClick={() => setMode('linkedin')}
            >
              <LinkedInIcon />
              {t('training.registerWithLinkedIn')}
              <span className="training-reg-preferred">{t('training.preferred')}</span>
            </button>
            <span className="training-reg-or">{t('training.orText')}</span>
            <button
              className={`training-reg-tab ${mode === 'email' ? 'training-reg-tab--active' : ''}`}
              onClick={() => setMode('email')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 7 12 13 2 7" /></svg>
              {t('training.registerWithEmail')}
            </button>
          </div>

          {mode === 'linkedin' && (
            <div className="training-reg-linkedin-body">
              {!user ? (
                <button className="training-reg-linkedin-btn" onClick={handleLinkedInSignIn}>
                  <LinkedInIcon /> {t('training.registerWithLinkedIn')}
                </button>
              ) : (
                <div className="training-reg-linkedin-confirm">
                  <div className="training-reg-user-badge">
                    <LinkedInIcon />
                    <span>{user.user_metadata?.full_name || user.email}</span>
                  </div>
                  <button
                    className="training-reg-submit-btn"
                    onClick={handleLinkedInRegister}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? t('training.submitting') : t('training.submitRegistration')}
                  </button>
                </div>
              )}
            </div>
          )}

          {mode === 'email' && (
            <form className="training-reg-email-form" onSubmit={handleEmailRegister}>
              <div className="training-reg-field">
                <label className="training-reg-label">{t('training.nameLabel')}</label>
                <input
                  className="training-reg-input"
                  type="text"
                  placeholder={t('training.enterName')}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="training-reg-field">
                <label className="training-reg-label">{t('training.emailLabel')}</label>
                <input
                  className="training-reg-input"
                  type="email"
                  placeholder={t('training.enterEmail')}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                className="training-reg-submit-btn"
                type="submit"
                disabled={status === 'loading' || !name.trim() || !email.trim()}
              >
                {status === 'loading' ? t('training.submitting') : t('training.submitRegistration')}
              </button>
            </form>
          )}

          {status === 'duplicate' && <div className="training-reg-msg training-reg-msg--warn">{t('training.alreadyRegistered')}</div>}
          {status === 'error' && <div className="training-reg-msg training-reg-msg--error">{errorMsg || t('training.registrationFailed')}</div>}
        </>
      )}
    </div>
  )
}

export default function Training() {
  const [counts, setCounts] = useState({})
  const [user, setUser] = useState(null)
  const { t } = useLanguage()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => setUser(u))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const fetchCounts = useCallback(async () => {
    const ids = SCHEDULE.map(s => s.id)
    const { data } = await supabase
      .from('training_registrations')
      .select('workshop_id')
      .in('workshop_id', ids)
    if (data) {
      const map = {}
      data.forEach(r => { map[r.workshop_id] = (map[r.workshop_id] || 0) + 1 })
      setCounts(map)
    }
  }, [])

  useEffect(() => { fetchCounts() }, [fetchCounts])

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

      <h3 className="training-sub-heading">{t('training.scheduleTitle')}</h3>

      <div className="training-schedule">
        {SCHEDULE.map((item, i) => {
          const ws = workshops[item.workshopIndex]
          const seatsTaken = counts[item.id] || 0
          const pct = Math.min((seatsTaken / MAX_SEATS) * 100, 100)
          const isFull = seatsTaken >= MAX_SEATS
          const remaining = MAX_SEATS - seatsTaken

          return (
            <div className="workshop-card" key={item.id}>
              <div className="workshop-accent" style={{ background: item.color }} />
              <div className="workshop-body">
                <div className="workshop-week-badge" style={{ color: item.color, background: `${item.color}15` }}>
                  Week {i + 1}
                </div>
                <h3 className="workshop-title" style={{ color: item.color }}>{ws.title}</h3>
                <div className="workshop-date-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {ws.dates}
                </div>
                <p className="workshop-desc">{ws.description}</p>
                <ul className="workshop-topics">
                  {ws.topics.map((topic, j) => (
                    <li key={j}>
                      <span className="workshop-topic-dot" style={{ background: item.color }} />
                      {topic}
                    </li>
                  ))}
                </ul>

                <div className="workshop-seats-section">
                  <div className="batch-seats-info">
                    <div className="batch-seats-bar">
                      <div
                        className={`batch-seats-fill ${isFull ? 'batch-seats-fill--full' : ''}`}
                        style={{ width: `${pct}%`, background: isFull ? undefined : item.color }}
                      />
                    </div>
                    <span className="batch-seats-text">
                      <strong>{seatsTaken}</strong>/{MAX_SEATS} {t('training.registered')}
                      {!isFull && <> &mdash; <span className="batch-remaining">{remaining} {t('training.seatsLeft')}</span></>}
                      {isFull && <> &mdash; <span className="batch-full-label">{t('training.workshopFull')}</span></>}
                    </span>
                  </div>
                  <div className="workshop-price-note">{t('training.priceNote')}</div>
                </div>

                <TrainingRegistrationForm
                  workshopId={item.id}
                  seatsTaken={seatsTaken}
                  onRegistered={fetchCounts}
                  user={user}
                  t={t}
                />
              </div>
            </div>
          )
        })}
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
            <a className="corporate-contact" href="mailto:nexus@nexus-aii.com">
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
