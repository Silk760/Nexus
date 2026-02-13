import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { checkout } from '../lib/checkout'

const WORKSHOPS = [
  {
    title: 'AI for Workplace Productivity',
    description: 'Leverage AI tools to automate repetitive tasks, streamline workflows, and boost team output across departments.',
    topics: ['Prompt Engineering', 'AI-Powered Automation', 'Document & Email AI', 'Data Analysis with AI'],
    color: '#c8a2ff',
  },
  {
    title: 'Building AI Agents',
    description: 'Design and deploy autonomous AI agents that can reason, plan, and execute multi-step tasks for your business.',
    topics: ['Agent Architectures', 'Tool Use & Function Calling', 'RAG Pipelines', 'Deployment & Monitoring'],
    color: '#78dce8',
  },
  {
    title: 'AI for Decision Making',
    description: 'Use AI-driven analytics and forecasting to make smarter, data-informed decisions at every level of your organization.',
    topics: ['Predictive Analytics', 'Dashboard Automation', 'Risk Assessment with AI', 'KPI Forecasting'],
    color: '#a9dc76',
  },
  {
    title: 'Generative AI for Content & Marketing',
    description: 'Create high-quality content, visuals, and marketing campaigns using the latest generative AI models and tools.',
    topics: ['Text Generation & Copywriting', 'Image & Video AI', 'Social Media Automation', 'Brand Voice with AI'],
    color: '#ffab70',
  },
  {
    title: 'AI Integration & APIs',
    description: 'Connect AI services into your existing software stack — from CRM to ERP — with practical, hands-on integration projects.',
    topics: ['API Design for AI', 'LLM Integration', 'Chatbot Development', 'Workflow Orchestration'],
    color: '#ff7eb6',
  },
  {
    title: 'AI Strategy for Leaders',
    description: 'A non-technical workshop for executives and managers to understand AI capabilities, risks, and how to lead AI adoption.',
    topics: ['AI Landscape Overview', 'ROI of AI Projects', 'Risk & Governance', 'Building an AI Roadmap'],
    color: '#c8a2ff',
  },
]

export default function Training() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(null)

  useEffect(() => {
    // Fetch active batches
    supabase
      .from('batches')
      .select('*')
      .eq('active', true)
      .then(({ data, error }) => {
        if (error) console.error('Failed to load batches:', error)
        else {
          // Sort by parsed date since start_date is text
          const sorted = (data || []).sort(
            (a, b) => new Date(a.start_date) - new Date(b.start_date)
          )
          setBatches(sorted)
        }
        setLoading(false)
      })

    // Subscribe to real-time updates on the batches table
    const channel = supabase
      .channel('batches-realtime')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'batches' },
        (payload) => {
          setBatches((prev) =>
            prev.map((b) => (b.id === payload.new.id ? { ...b, ...payload.new } : b))
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function handlePayCheckout(batch) {
    if (batch.registered >= batch.total_seats) return
    setCheckingOut(batch.id)
    try {
      await checkout('batch', batch.id, batch.price_sar)
    } catch (err) {
      console.error(err)
      alert('Could not start checkout. Please try again.')
    } finally {
      setCheckingOut(null)
    }
  }

  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">05 &mdash; Training</div>
      <h2 className="section-title">Hands-On Training Workshops</h2>
      <p className="section-subtitle">
        Intensive one-week workshops &mdash; only 20 seats per batch, new batch every two weeks
      </p>

      {/* Key Info Banner */}
      <div className="training-info-row">
        <div className="training-info-card">
          <div className="training-info-value">20</div>
          <div className="training-info-label">Seats Only</div>
        </div>
        <div className="training-info-card">
          <div className="training-info-value">1,000</div>
          <div className="training-info-label">SAR / Seat</div>
        </div>
        <div className="training-info-card">
          <div className="training-info-value">20–25h</div>
          <div className="training-info-label">One Week</div>
        </div>
        <div className="training-info-card">
          <div className="training-info-value">Bi-Weekly</div>
          <div className="training-info-label">New Batches</div>
        </div>
      </div>

      {/* Upcoming Batches */}
      <h3 className="training-sub-heading">Upcoming Batches &mdash; Reserve Your Seat</h3>
      <div className="batches-list">
        {loading && <p style={{ color: '#999', textAlign: 'center' }}>Loading batches…</p>}
        {!loading && batches.length === 0 && (
          <p style={{ color: '#999', textAlign: 'center' }}>No upcoming batches at the moment.</p>
        )}
        {batches.map((batch) => {
          const remaining = batch.total_seats - batch.registered
          const isFull = remaining <= 0
          const pct = Math.min((batch.registered / batch.total_seats) * 100, 100)

          return (
            <div className={`batch-row ${isFull ? 'batch-row--full' : ''}`} key={batch.id}>
              <div className="batch-left">
                <div className="batch-dates">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {batch.start_date} &ndash; {batch.end_date}
                </div>
                <div className="batch-seats-info">
                  <div className="batch-seats-bar">
                    <div
                      className={`batch-seats-fill ${isFull ? 'batch-seats-fill--full' : ''}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="batch-seats-text">
                    <strong>{batch.registered}</strong>/{batch.total_seats} registered
                    {!isFull && <> &mdash; <span className="batch-remaining">{remaining} seats left</span></>}
                    {isFull && <> &mdash; <span className="batch-full-label">Batch Full</span></>}
                  </span>
                </div>
              </div>
              <div className="batch-right">
                {isFull ? (
                  <span className="batch-sold-out">Sold Out</span>
                ) : (
                  <div className="batch-pay-buttons">
                    <button
                      className="pay-btn pay-btn--tap"
                      disabled={checkingOut === batch.id}
                      onClick={() => handlePayCheckout(batch)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      {checkingOut === batch.id ? 'Redirecting…' : 'Pay Now'}
                    </button>
                    <a className="pay-btn pay-btn--tabby" href="#" target="_blank" rel="noopener noreferrer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h18v4H3V3zm0 7h18v4H3v-4zm0 7h18v4H3v-4z" />
                      </svg>
                      Tabby
                    </a>
                    <a className="pay-btn pay-btn--tamara" href="#" target="_blank" rel="noopener noreferrer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" />
                      </svg>
                      Tamara
                    </a>
                    <span className="batch-price-tag">{batch.price_sar?.toLocaleString()} SAR</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Workshop Topics */}
      <h3 className="training-sub-heading">What You&apos;ll Learn</h3>
      <div className="workshops-grid">
        {WORKSHOPS.map((ws, i) => (
          <div className="workshop-card" key={i}>
            <div className="workshop-accent" style={{ background: ws.color }} />
            <div className="workshop-body">
              <h3 className="workshop-title" style={{ color: ws.color }}>{ws.title}</h3>
              <p className="workshop-desc">{ws.description}</p>
              <ul className="workshop-topics">
                {ws.topics.map((t) => (
                  <li key={t}>
                    <span className="workshop-topic-dot" style={{ background: ws.color }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate Section */}
      <div className="corporate-block">
        <div className="corporate-content">
          <div className="corporate-badge">For Companies</div>
          <h3 className="corporate-title">Book the Entire Batch for Your Team</h3>
          <p className="corporate-desc">
            Reserve all 20 seats for your organization. Get a dedicated instructor,
            customized focus areas, and a private cohort experience &mdash; all in one intensive week.
          </p>
          <div className="corporate-price">
            <span className="corporate-price-amount">50,000 SAR</span>
            <span className="corporate-price-detail">full batch &middot; 20 seats &middot; 20–25 hours &middot; 1 week</span>
          </div>
          <div className="corporate-actions">
            <a className="pay-btn pay-btn--tap corporate-pay" href="#" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Pay Now
            </a>
            <a className="pay-btn pay-btn--tabby corporate-pay" href="#" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v4H3V3zm0 7h18v4H3v-4zm0 7h18v4H3v-4z" />
              </svg>
              Pay via Tabby
            </a>
            <a className="pay-btn pay-btn--tamara corporate-pay" href="#" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" />
              </svg>
              Pay via Tamara
            </a>
            <a className="corporate-contact" href="mailto:nexus@example.com">
              Or contact us directly
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="section-callout" style={{ marginTop: '2.5rem' }}>
        All training workshops are hands-on and practical. Participants leave with real projects, working
        prototypes, and actionable skills they can apply immediately. Seats are strictly limited to 20
        per batch to ensure quality interaction. New batches open every two weeks.
      </div>
    </section>
  )
}
