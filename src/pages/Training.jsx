const WORKSHOPS = [
  {
    title: 'AI for Workplace Productivity',
    description: 'Leverage AI tools to automate repetitive tasks, streamline workflows, and boost team output across departments.',
    topics: ['Prompt Engineering', 'AI-Powered Automation', 'Document & Email AI', 'Data Analysis with AI'],
    color: '#c8a2ff',
    individualStripe: '#',
    individualSalla: '#',
  },
  {
    title: 'Building AI Agents',
    description: 'Design and deploy autonomous AI agents that can reason, plan, and execute multi-step tasks for your business.',
    topics: ['Agent Architectures', 'Tool Use & Function Calling', 'RAG Pipelines', 'Deployment & Monitoring'],
    color: '#78dce8',
    individualStripe: '#',
    individualSalla: '#',
  },
  {
    title: 'AI for Decision Making',
    description: 'Use AI-driven analytics and forecasting to make smarter, data-informed decisions at every level of your organization.',
    topics: ['Predictive Analytics', 'Dashboard Automation', 'Risk Assessment with AI', 'KPI Forecasting'],
    color: '#a9dc76',
    individualStripe: '#',
    individualSalla: '#',
  },
  {
    title: 'Generative AI for Content & Marketing',
    description: 'Create high-quality content, visuals, and marketing campaigns using the latest generative AI models and tools.',
    topics: ['Text Generation & Copywriting', 'Image & Video AI', 'Social Media Automation', 'Brand Voice with AI'],
    color: '#ffab70',
    individualStripe: '#',
    individualSalla: '#',
  },
  {
    title: 'AI Integration & APIs',
    description: 'Connect AI services into your existing software stack — from CRM to ERP — with practical, hands-on integration projects.',
    topics: ['API Design for AI', 'LLM Integration', 'Chatbot Development', 'Workflow Orchestration'],
    color: '#ff7eb6',
    individualStripe: '#',
    individualSalla: '#',
  },
  {
    title: 'AI Strategy for Leaders',
    description: 'A non-technical workshop for executives and managers to understand AI capabilities, risks, and how to lead AI adoption.',
    topics: ['AI Landscape Overview', 'ROI of AI Projects', 'Risk & Governance', 'Building an AI Roadmap'],
    color: '#c8a2ff',
    individualStripe: '#',
    individualSalla: '#',
  },
]

const UPCOMING_BATCHES = [
  { start: 'Mar 16, 2026', end: 'Mar 20, 2026', status: 'Open' },
  { start: 'Mar 30, 2026', end: 'Apr 3, 2026', status: 'Open' },
  { start: 'Apr 13, 2026', end: 'Apr 17, 2026', status: 'Open' },
  { start: 'Apr 27, 2026', end: 'May 1, 2026', status: 'Coming Soon' },
  { start: 'May 11, 2026', end: 'May 15, 2026', status: 'Coming Soon' },
  { start: 'May 25, 2026', end: 'May 29, 2026', status: 'Coming Soon' },
]

export default function Training() {
  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">05 &mdash; Training</div>
      <h2 className="section-title">Hands-On Training Workshops</h2>
      <p className="section-subtitle">
        Intensive one-week workshops in batches of 20 &mdash; new batch opens every two weeks
      </p>

      {/* Key Info Banner */}
      <div className="training-info-row">
        <div className="training-info-card">
          <div className="training-info-value">20</div>
          <div className="training-info-label">Per Batch</div>
        </div>
        <div className="training-info-card">
          <div className="training-info-value">20–25h</div>
          <div className="training-info-label">Duration</div>
        </div>
        <div className="training-info-card">
          <div className="training-info-value">1 Week</div>
          <div className="training-info-label">Intensive</div>
        </div>
        <div className="training-info-card">
          <div className="training-info-value">Bi-Weekly</div>
          <div className="training-info-label">New Batches</div>
        </div>
      </div>

      {/* Upcoming Batches */}
      <h3 className="training-sub-heading">Upcoming Batches</h3>
      <div className="batches-grid">
        {UPCOMING_BATCHES.map((batch, i) => (
          <div className="batch-card" key={i}>
            <div className="batch-dates">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {batch.start} &ndash; {batch.end}
            </div>
            <span className={`batch-status ${batch.status === 'Open' ? 'batch-status--open' : 'batch-status--soon'}`}>
              {batch.status}
            </span>
          </div>
        ))}
      </div>

      {/* Workshop Topics */}
      <h3 className="training-sub-heading">Workshop Topics</h3>
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
              <div className="workshop-enroll">
                <span className="workshop-enroll-label">Individual Enrollment</span>
                <div className="course-pay-buttons">
                  <a className="pay-btn pay-btn--stripe" href={ws.individualStripe} target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                    </svg>
                    Stripe
                  </a>
                  <a className="pay-btn pay-btn--salla" href={ws.individualSalla} target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-8-3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
                    </svg>
                    Salla
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate Section */}
      <div className="corporate-block">
        <div className="corporate-content">
          <div className="corporate-badge">For Companies</div>
          <h3 className="corporate-title">Book a Full Batch for Your Team</h3>
          <p className="corporate-desc">
            Reserve an entire training batch of 20 seats for your organization. Get a dedicated instructor,
            customized focus areas, and a private cohort experience &mdash; all in one intensive week.
          </p>
          <div className="corporate-price">
            <span className="corporate-price-amount">50,000 SAR</span>
            <span className="corporate-price-detail">per batch &middot; 20 seats &middot; 20–25 hours &middot; 1 week</span>
          </div>
          <div className="corporate-actions">
            <a className="pay-btn pay-btn--stripe corporate-pay" href="#" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
              </svg>
              Pay via Stripe
            </a>
            <a className="pay-btn pay-btn--salla corporate-pay" href="#" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-8-3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
              </svg>
              Pay via Salla
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
        prototypes, and actionable skills they can apply immediately. New batches open every two weeks &mdash;
        seats are limited to 20 per batch to ensure quality interaction.
      </div>
    </section>
  )
}
