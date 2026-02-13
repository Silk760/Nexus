const CURRICULUM = [
  {
    category: 'Foundations',
    color: '#c8a2ff',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    topics: [
      'Introduction to ML Systems',
      'Deep Learning Primer',
      'DNN Architectures',
      'AI Workflow & Pipelines',
    ],
  },
  {
    category: 'Hardware & Silicon',
    color: '#78dce8',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
      </svg>
    ),
    topics: [
      'AI Accelerator Design',
      'Advanced Chip Architectures',
      'Edge Computing Platforms',
      'TinyML & Microcontrollers',
    ],
  },
  {
    category: 'Optimization',
    color: '#a9dc76',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
    topics: [
      'Efficient Neural Networks',
      'Model Compression & Pruning',
      'Quantization Techniques',
      'Neural Architecture Search',
    ],
  },
  {
    category: 'Deployment',
    color: '#ffab70',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    topics: [
      'ML Operations (MLOps)',
      'On-Device Inference',
      'Scalable AI Infrastructure',
      'Benchmarking & Profiling',
    ],
  },
  {
    category: 'Responsible AI',
    color: '#ff7eb6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    topics: [
      'Security & Privacy in AI',
      'Robust AI Systems',
      'Sustainable AI',
      'AI Ethics & Governance',
    ],
  },
  {
    category: 'Frontiers',
    color: '#c8a2ff',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    topics: [
      'Industrial AI Applications',
      'Neuromorphic Computing',
      'HW/SW Co-Design Frontiers',
      'Next-Gen Intelligent Systems',
    ],
  },
]

export default function Curriculum() {
  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">02 &mdash; Curriculum</div>
      <h2 className="section-title">Learning Tracks</h2>
      <p className="section-subtitle">
        A systematic framework from foundations to frontiers &mdash; designed for researchers,
        engineers, and self-directed learners
      </p>

      <div className="curriculum-grid">
        {CURRICULUM.map((track) => (
          <div className="curriculum-card" key={track.category}>
            <div className="curriculum-header">
              <div className="curriculum-icon" style={{ color: track.color, background: track.color + '15' }}>
                {track.icon}
              </div>
              <h3 style={{ color: track.color }}>{track.category}</h3>
            </div>
            <ul className="curriculum-topics">
              {track.topics.map((topic) => (
                <li key={topic}>
                  <span className="topic-dot" style={{ background: track.color }} />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
