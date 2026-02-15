import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../i18n/LanguageContext'

const MAX_SEATS = 50

const SEMINARS = [
  {
    id: 'hussain-feb25-2026',
    speaker: 'Prof. Muhammad Mustafa Hussain',
    affiliation: 'Purdue University – Electrical & Computer Engineering',
    date: 'Wed, Feb 25, 2026',
    time: '12:00 PM ET / 7:00 PM AST',
    confirmed: true,
    color: '#c8a2ff',
    photo: '/hussain.jpg',
    meet: 'https://meet.google.com/pog-hkyy-kts',
    calStart: '20260225T190000',
    calEnd: '20260225T200000',
    calTz: 'Asia/Riyadh',
  },
  {
    id: 'alharthi-apr20-2026',
    speaker: 'Dr. Dalal Alharthi',
    affiliation: 'University of Arizona – Cybersecurity',
    date: 'Mon, Apr 20, 2026',
    time: '10:00 AM MT / 7:00 PM AST',
    confirmed: true,
    color: '#78dce8',
    photo: '/alharthi.jpg',
    meet: 'https://meet.google.com/vke-hqpe-mof',
    calStart: '20260420T190000',
    calEnd: '20260420T200000',
    calTz: 'Asia/Riyadh',
  },
  {
    id: 'ooi-jun08-2026',
    speaker: 'Prof. Boon S. Ooi',
    affiliation: 'Rensselaer Polytechnic Institute (RPI) / KAUST – Photonics',
    date: 'Mon, Jun 8, 2026',
    time: '12:00 PM ET / 7:00 PM AST',
    confirmed: true,
    color: '#a9dc76',
    photo: '/ooi.jpg',
    meet: 'https://meet.google.com/cwt-ukfk-tie',
    calStart: '20260608T190000',
    calEnd: '20260608T200000',
    calTz: 'Asia/Riyadh',
  },
  { id: 'elhadedy-tba', speaker: 'Dr. Mohamed El Hadedy', affiliation: 'Cal Poly Pomona – Electrical & Computer Engineering', date: 'TBA', confirmed: false, color: '#ffab70' },
  { id: 'abughazaleh-tba', speaker: 'Prof. Nael Abu-Ghazaleh', affiliation: 'UC Riverside – Computer Science & Engineering', date: 'TBA', confirmed: false, color: '#ff7eb6' },
  { id: 'khan-tba', speaker: 'Prof. Yasser Khan', affiliation: 'USC – Electrical & Computer Engineering / Biomedical Engineering', date: 'TBA', confirmed: false, color: '#c8a2ff' },
  { id: 'khasawneh-tba', speaker: 'Dr. Khaled N. Khasawneh', affiliation: 'George Mason University – Electrical & Computer Engineering', date: 'TBA', confirmed: false, color: '#78dce8' },
  { id: 'almogbel-tba', speaker: 'Dr. Abdullah Almogbel', affiliation: 'KACST – Microelectronics & Semiconductors', date: 'TBA', confirmed: false, color: '#a9dc76' },
  { id: 'mateos-tba', speaker: 'Dr. Luis Alfredo Mateos', affiliation: 'MIT – Robotics & AI', date: 'TBA', confirmed: false, color: '#ffab70' },
]

function buildGoogleCalUrl(sem) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `NEXUS Seminar: ${sem.speaker}`,
    dates: `${sem.calStart}/${sem.calEnd}`,
    ctz: sem.calTz,
    details: `Speaker: ${sem.speaker}\n${sem.affiliation}\n\nJoin via Google Meet: ${sem.meet}\n\nOrganized by NEXUS Applied Intelligence Institute`,
    location: sem.meet,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function RegistrationForm({ seminar, seatsTaken, onRegistered, user, t }) {
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const seatsLeft = MAX_SEATS - seatsTaken
  const isFull = seatsLeft <= 0

  async function handleLinkedInSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: { redirectTo: window.location.origin + '/seminars' },
    })
  }

  async function handleRegister() {
    if (!user || isFull) return
    setStatus('loading')
    setErrorMsg('')
    const name = user.user_metadata?.full_name || user.user_metadata?.name || ''
    const email = user.email || ''
    if (!name || !email) {
      setStatus('error')
      setErrorMsg('Could not retrieve your name or email from LinkedIn.')
      return
    }
    const { error } = await supabase
      .from('seminar_registrations')
      .insert({ seminar_id: seminar.id, name, email: email.toLowerCase() })
      .select()
    if (error) {
      if (error.code === '23505') setStatus('duplicate')
      else { setStatus('error'); setErrorMsg(`${error.message} (code: ${error.code})`) }
    } else { setStatus('success'); onRegistered() }
  }

  if (status === 'success') {
    return (
      <div style={{ marginTop: '1rem' }}>
        <div style={{ padding: '1rem 1.2rem', borderRadius: 10, background: 'rgba(169, 220, 118, 0.08)', border: '1px solid rgba(169, 220, 118, 0.2)', marginBottom: '0.8rem' }}>
          <div style={{ color: '#a9dc76', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{t('seminars.regConfirmed')}</div>
          <div style={{ color: '#86868b', fontSize: '0.82rem' }}>{t('seminars.regConfirmedDesc')}</div>
        </div>
        <a href={buildGoogleCalUrl(seminar)} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: 8, background: 'rgba(200, 162, 255, 0.12)', color: '#c8a2ff', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(200, 162, 255, 0.2)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {t('seminars.addCalendar')}
        </a>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f5f5f7' }}>{t('seminars.registerTitle')}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.03em', padding: '0.2rem 0.6rem', borderRadius: 6,
          color: isFull ? '#ff5f57' : seatsLeft <= 10 ? '#ffab70' : '#a9dc76',
          background: isFull ? 'rgba(255, 95, 87, 0.1)' : seatsLeft <= 10 ? 'rgba(255, 171, 112, 0.1)' : 'rgba(169, 220, 118, 0.1)' }}>
          {isFull ? t('seminars.soldOut') : `${seatsLeft} / ${MAX_SEATS} ${t('seminars.seatsLeft')}`}
        </span>
      </div>
      {isFull ? (
        <div style={{ color: '#6e6e73', fontSize: '0.85rem' }}>{t('seminars.fullyBooked')}</div>
      ) : !user ? (
        <button onClick={handleLinkedInSignIn}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.7rem 1.5rem', borderRadius: 8, background: '#0A66C2', color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
          <LinkedInIcon /> {t('seminars.signInLinkedIn')}
        </button>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: 8, background: 'rgba(10, 102, 194, 0.1)', border: '1px solid rgba(10, 102, 194, 0.2)' }}>
              <LinkedInIcon />
              <span style={{ fontSize: '0.82rem', color: '#86868b' }}>{user.user_metadata?.full_name || user.email}</span>
            </div>
            <button onClick={handleRegister} disabled={status === 'loading'}
              style={{ padding: '0.6rem 1.5rem', borderRadius: 8, background: '#c8a2ff', color: '#0a0a0a', border: 'none', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, cursor: status === 'loading' ? 'wait' : 'pointer', opacity: status === 'loading' ? 0.6 : 1 }}>
              {status === 'loading' ? t('seminars.registering') : t('seminars.confirmRegistration')}
            </button>
          </div>
          {status === 'duplicate' && <div style={{ color: '#ffab70', fontSize: '0.82rem', marginTop: '0.3rem' }}>{t('seminars.alreadyRegistered')}</div>}
          {status === 'error' && <div style={{ color: '#ff5f57', fontSize: '0.82rem', marginTop: '0.3rem' }}>{t('seminars.regFailed')} {errorMsg || t('seminars.regFailedDefault')}</div>}
        </div>
      )}
    </div>
  )
}

export default function Seminars() {
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
    const confirmedIds = SEMINARS.filter(s => s.confirmed).map(s => s.id)
    if (confirmedIds.length === 0) return
    const { data } = await supabase
      .from('seminar_registrations')
      .select('seminar_id')
      .in('seminar_id', confirmedIds)
    if (data) {
      const map = {}
      data.forEach(r => { map[r.seminar_id] = (map[r.seminar_id] || 0) + 1 })
      setCounts(map)
    }
  }, [])

  useEffect(() => { fetchCounts() }, [fetchCounts])

  const bios = t('seminars.bios')

  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">{t('seminars.number')}</div>
      <h2 className="section-title">{t('seminars.title')}</h2>
      <p className="section-subtitle">{t('seminars.subtitle')}</p>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1.2rem', marginTop: '1.5rem', background: 'rgba(10, 102, 194, 0.06)', border: '1px solid rgba(10, 102, 194, 0.15)', borderRadius: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LinkedInIcon />
            <span style={{ fontSize: '0.85rem', color: '#86868b' }}>
              {t('seminars.signedInAs')} <strong style={{ color: '#f5f5f7' }}>{user.user_metadata?.full_name || user.email}</strong>
            </span>
          </div>
          <button onClick={() => supabase.auth.signOut()}
            style={{ background: 'none', border: '1px solid #333', borderRadius: 6, color: '#6e6e73', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'inherit', padding: '0.3rem 0.8rem', cursor: 'pointer' }}>
            {t('seminars.signOut')}
          </button>
        </div>
      )}

      <div className="seminar-schedule-bar">
        <div className="seminar-schedule-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          {t('seminars.scheduleDates')}
        </div>
        <div className="seminar-schedule-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          {t('seminars.scheduleTime')}
        </div>
        <div className="seminar-schedule-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          {t('seminars.scheduleSpeakers')}
        </div>
        <div className="seminar-schedule-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
          {t('seminars.scheduleVia')}
        </div>
        <div className="seminar-schedule-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
          {t('seminars.scheduleSeats')}
        </div>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        {SEMINARS.filter(s => s.confirmed).map((sem) => (
          <div className="seminar-card" key={sem.id} style={{ marginBottom: '1.5rem' }}>
            <div className="seminar-accent" style={{ background: sem.color }} />
            <div className="seminar-body">
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  <img className="seminar-avatar" src={sem.photo} alt={sem.speaker} style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '2px solid #222' }} />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div className="seminar-top">
                    <span className="seminar-badge seminar-badge--free">{t('seminars.freeOpen')}</span>
                    <span className="seminar-badge seminar-badge--confirmed">{t('seminars.confirmed')}</span>
                  </div>
                  <h3 className="seminar-speaker-name">{sem.speaker}</h3>
                  <div className="seminar-affiliation">{sem.affiliation}</div>
                  <p style={{ fontSize: '0.85rem', color: '#86868b', lineHeight: 1.7, fontWeight: 300, marginBottom: '0.8rem' }}>
                    {bios[sem.id] || ''}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    <div className="seminar-date-row">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      {sem.date}
                    </div>
                    <div className="seminar-date-row">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {sem.time}
                    </div>
                    <a className="zoom-link seminar-zoom" href={sem.meet} target="_blank" rel="noopener noreferrer" title="Join on Google Meet">
                      <svg className="zoom-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
                      {t('seminars.joinMeet')}
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #1a1a1a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                  <div style={{ flex: 1, height: 6, background: '#222', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 3, width: `${Math.min(((counts[sem.id] || 0) / MAX_SEATS) * 100, 100)}%`, background: (counts[sem.id] || 0) >= MAX_SEATS ? '#ff5f57' : sem.color, transition: 'width 0.4s ease' }} />
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#6e6e73', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    <strong style={{ color: '#b0b0b0' }}>{counts[sem.id] || 0}</strong> / {MAX_SEATS} {t('seminars.registered')}
                  </span>
                </div>
                <RegistrationForm seminar={sem} seatsTaken={counts[sem.id] || 0} onRegistered={fetchCounts} user={user} t={t} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6e6e73', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        {t('seminars.upcomingSpeakers')}
      </div>
      <div className="seminars-grid">
        {SEMINARS.filter(s => !s.confirmed).map((sem) => (
          <div className="seminar-card" key={sem.id}>
            <div className="seminar-accent" style={{ background: sem.color }} />
            <div className="seminar-body">
              <div className="seminar-top">
                <span className="seminar-badge seminar-badge--free">{t('seminars.freeOpen')}</span>
                <span className="seminar-badge seminar-badge--pending">{t('seminars.dateTBA')}</span>
              </div>
              <img className="seminar-avatar" src={`https://api.dicebear.com/9.x/initials/svg?seed=${sem.speaker.split(' ').slice(-2).map(w => w[0]).join('')}&backgroundColor=${sem.color.slice(1)}`} alt={sem.speaker} />
              <h3 className="seminar-speaker-name">{sem.speaker}</h3>
              {sem.affiliation && <div className="seminar-affiliation">{sem.affiliation}</div>}
              <div className="seminar-date-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                {sem.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-callout" style={{ marginTop: '2.5rem' }}>{t('seminars.callout')}</div>
    </section>
  )
}
