import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

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
    bio: 'Professor Hussain leads the DREAM Lab at Purdue, designing futuristic electronics for healthcare, energy, robotics, space, and defense. His group develops multifunctional integrated systems using CMOS technology — rigid, flexible, stretchable, and reconfigurable. Expert in microelectronics and nanotechnology.',
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
    bio: 'Assistant Professor of Cybersecurity at the University of Arizona. Ph.D. in Computer Science from UC Irvine. AWS Solutions Architect and CompTIA Security+ certified. Research focuses on cloud security, container security, penetration testing, DFIR, and machine learning. Winner of the WiCyS 2024 National Award.',
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
    bio: 'Future Chips Constellation Chair Professor at RPI. Ph.D. from the University of Glasgow. Editor-in-Chief of IEEE Photonics Technology Letters. Holds 46 U.S. patents. Fellow of NAI, IEEE, APS, OSA, SPIE. Recipient of the 2024 OSA Sang Soo Lee Award and 2023 Khalifa International Award.',
    calStart: '20260608T190000',
    calEnd: '20260608T200000',
    calTz: 'Asia/Riyadh',
  },
  {
    id: 'elhadedy-tba',
    speaker: 'Dr. Mohamed El Hadedy',
    affiliation: 'Cal Poly Pomona – Electrical & Computer Engineering',
    date: 'TBA',
    confirmed: false,
    color: '#ffab70',
  },
  {
    id: 'abughazaleh-tba',
    speaker: 'Prof. Nael Abu-Ghazaleh',
    affiliation: 'UC Riverside – Computer Science & Engineering',
    date: 'TBA',
    confirmed: false,
    color: '#ff7eb6',
  },
  {
    id: 'khan-tba',
    speaker: 'Prof. Yasser Khan',
    affiliation: 'USC – Electrical & Computer Engineering / Biomedical Engineering',
    date: 'TBA',
    confirmed: false,
    color: '#c8a2ff',
  },
  {
    id: 'khasawneh-tba',
    speaker: 'Dr. Khaled N. Khasawneh',
    affiliation: 'George Mason University – Electrical & Computer Engineering',
    date: 'TBA',
    confirmed: false,
    color: '#78dce8',
  },
  {
    id: 'almogbel-tba',
    speaker: 'Dr. Abdullah Almogbel',
    affiliation: 'KACST – Microelectronics & Semiconductors',
    date: 'TBA',
    confirmed: false,
    color: '#a9dc76',
  },
  {
    id: 'mateos-tba',
    speaker: 'Dr. Luis Alfredo Mateos',
    affiliation: 'MIT – Robotics & AI',
    date: 'TBA',
    confirmed: false,
    color: '#ffab70',
  },
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

function RegistrationForm({ seminar, seatsTaken, onRegistered }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'duplicate' | 'full' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const seatsLeft = MAX_SEATS - seatsTaken
  const isFull = seatsLeft <= 0

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    if (isFull) { setStatus('full'); return }

    setStatus('loading')
    setErrorMsg('')

    const { error } = await supabase
      .from('seminar_registrations')
      .insert({ seminar_id: seminar.id, name: name.trim(), email: email.trim().toLowerCase() })

    if (error) {
      if (error.code === '23505') {
        setStatus('duplicate')
      } else {
        setStatus('error')
        setErrorMsg(error.message)
      }
    } else {
      setStatus('success')
      onRegistered()
    }
  }

  if (status === 'success') {
    return (
      <div style={{ marginTop: '1rem' }}>
        <div style={{
          padding: '1rem 1.2rem', borderRadius: 10,
          background: 'rgba(169, 220, 118, 0.08)', border: '1px solid rgba(169, 220, 118, 0.2)',
          marginBottom: '0.8rem',
        }}>
          <div style={{ color: '#a9dc76', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
            Registration confirmed!
          </div>
          <div style={{ color: '#86868b', fontSize: '0.82rem' }}>
            You&apos;re registered for this seminar. Add it to your calendar below.
          </div>
        </div>
        <a
          href={buildGoogleCalUrl(seminar)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.6rem 1.2rem', borderRadius: 8,
            background: 'rgba(200, 162, 255, 0.12)', color: '#c8a2ff',
            fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none',
            border: '1px solid rgba(200, 162, 255, 0.2)',
            transition: 'background 0.2s',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Add to Google Calendar
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem',
      }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f5f5f7' }}>
          Register for this seminar
        </span>
        <span style={{
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.03em',
          padding: '0.2rem 0.6rem', borderRadius: 6,
          color: isFull ? '#ff5f57' : seatsLeft <= 10 ? '#ffab70' : '#a9dc76',
          background: isFull
            ? 'rgba(255, 95, 87, 0.1)'
            : seatsLeft <= 10 ? 'rgba(255, 171, 112, 0.1)' : 'rgba(169, 220, 118, 0.1)',
        }}>
          {isFull ? 'SOLD OUT' : `${seatsLeft} / ${MAX_SEATS} seats left`}
        </span>
      </div>

      {isFull ? (
        <div style={{ color: '#6e6e73', fontSize: '0.85rem' }}>
          This seminar is fully booked. Check back later for possible openings.
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{
                flex: '1 1 180px', padding: '0.6rem 1rem', borderRadius: 8,
                background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#f5f5f7',
                fontFamily: 'inherit', fontSize: '0.85rem', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#c8a2ff'}
              onBlur={e => e.target.style.borderColor = '#2a2a2a'}
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                flex: '1 1 220px', padding: '0.6rem 1rem', borderRadius: 8,
                background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#f5f5f7',
                fontFamily: 'inherit', fontSize: '0.85rem', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#c8a2ff'}
              onBlur={e => e.target.style.borderColor = '#2a2a2a'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '0.6rem 1.5rem', borderRadius: 8,
                background: '#c8a2ff', color: '#0a0a0a', border: 'none',
                fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600,
                cursor: status === 'loading' ? 'wait' : 'pointer',
                opacity: status === 'loading' ? 0.6 : 1,
                transition: 'background 0.2s, transform 0.15s',
              }}
            >
              {status === 'loading' ? 'Registering...' : 'Register'}
            </button>
          </div>

          {status === 'duplicate' && (
            <div style={{ color: '#ffab70', fontSize: '0.82rem', marginTop: '0.3rem' }}>
              This email is already registered for this seminar.
            </div>
          )}
          {status === 'error' && (
            <div style={{ color: '#ff5f57', fontSize: '0.82rem', marginTop: '0.3rem' }}>
              Registration failed: {errorMsg || 'Please try again.'}
            </div>
          )}
        </>
      )}
    </form>
  )
}

export default function Seminars() {
  const [counts, setCounts] = useState({})

  const fetchCounts = useCallback(async () => {
    const confirmedIds = SEMINARS.filter(s => s.confirmed).map(s => s.id)
    if (confirmedIds.length === 0) return

    const { data } = await supabase
      .from('seminar_registrations')
      .select('seminar_id')
      .in('seminar_id', confirmedIds)

    if (data) {
      const map = {}
      data.forEach(r => {
        map[r.seminar_id] = (map[r.seminar_id] || 0) + 1
      })
      setCounts(map)
    }
  }, [])

  useEffect(() => { fetchCounts() }, [fetchCounts])

  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">04 &mdash; Seminars</div>
      <h2 className="section-title">Open Seminar Series</h2>
      <p className="section-subtitle">
        Always free, always open &mdash; leading researchers and practitioners from around the world
      </p>

      <div className="seminar-schedule-bar">
        <div className="seminar-schedule-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Feb &ndash; July 2026
        </div>
        <div className="seminar-schedule-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          Mon / Wed &middot; 7:00 &ndash; 8:00 PM (Saudi Time)
        </div>
        <div className="seminar-schedule-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          2 Seminars per Month
        </div>
        <div className="seminar-schedule-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          Via Google Meet
        </div>
        <div className="seminar-schedule-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          {MAX_SEATS} Seats per Session
        </div>
      </div>

      {/* Confirmed Speakers - Full Cards */}
      <div style={{ marginBottom: '2.5rem' }}>
        {SEMINARS.filter(s => s.confirmed).map((sem) => (
          <div className="seminar-card" key={sem.id} style={{ marginBottom: '1.5rem' }}>
            <div className="seminar-accent" style={{ background: sem.color }} />
            <div className="seminar-body">
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  <img
                    className="seminar-avatar"
                    src={sem.photo}
                    alt={sem.speaker}
                    style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '2px solid #222' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div className="seminar-top">
                    <span className="seminar-badge seminar-badge--free">Free &amp; Open</span>
                    <span className="seminar-badge seminar-badge--confirmed">Confirmed</span>
                  </div>
                  <h3 className="seminar-speaker-name">{sem.speaker}</h3>
                  <div className="seminar-affiliation">{sem.affiliation}</div>
                  <p style={{ fontSize: '0.85rem', color: '#86868b', lineHeight: 1.7, fontWeight: 300, marginBottom: '0.8rem' }}>
                    {sem.bio}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    <div className="seminar-date-row">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {sem.date}
                    </div>
                    <div className="seminar-date-row">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      {sem.time}
                    </div>
                    <a className="zoom-link seminar-zoom" href={sem.meet} target="_blank" rel="noopener noreferrer" title="Join on Google Meet">
                      <svg className="zoom-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" />
                      </svg>
                      Join Google Meet
                    </a>
                  </div>
                </div>
              </div>

              {/* Seat progress bar */}
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #1a1a1a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                  <div style={{ flex: 1, height: 6, background: '#222', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 3,
                      width: `${Math.min(((counts[sem.id] || 0) / MAX_SEATS) * 100, 100)}%`,
                      background: (counts[sem.id] || 0) >= MAX_SEATS ? '#ff5f57' : sem.color,
                      transition: 'width 0.4s ease',
                    }} />
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#6e6e73', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    <strong style={{ color: '#b0b0b0' }}>{counts[sem.id] || 0}</strong> / {MAX_SEATS} registered
                  </span>
                </div>

                <RegistrationForm
                  seminar={sem}
                  seatsTaken={counts[sem.id] || 0}
                  onRegistered={fetchCounts}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming / TBA Speakers */}
      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6e6e73', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Upcoming Speakers
      </div>
      <div className="seminars-grid">
        {SEMINARS.filter(s => !s.confirmed).map((sem) => (
          <div className="seminar-card" key={sem.id}>
            <div className="seminar-accent" style={{ background: sem.color }} />
            <div className="seminar-body">
              <div className="seminar-top">
                <span className="seminar-badge seminar-badge--free">Free &amp; Open</span>
                <span className="seminar-badge seminar-badge--pending">Date TBA</span>
              </div>
              <img
                className="seminar-avatar"
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${sem.speaker.split(' ').slice(-2).map(w => w[0]).join('')}&backgroundColor=${sem.color.slice(1)}`}
                alt={sem.speaker}
              />
              <h3 className="seminar-speaker-name">{sem.speaker}</h3>
              {sem.affiliation && (
                <div className="seminar-affiliation">{sem.affiliation}</div>
              )}
              <div className="seminar-date-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {sem.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-callout" style={{ marginTop: '2.5rem' }}>
        Every NEXUS seminar is completely free and open to the public. Sessions run Feb&ndash;July 2026
        with a mid-Ramadan pause. All sessions are recorded and shared with the community.
        Want to propose a talk? Reach out through our Connect page.
      </div>
    </section>
  )
}
