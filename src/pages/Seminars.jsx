const SEMINAR_THEMES = [
  {
    theme: 'Edge Intelligence',
    color: '#78dce8',
    seminars: [
      {
        title: 'Efficient Inference on Edge Devices',
        speaker: 'Dr. Sarah Chen',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=SC&backgroundColor=78dce8',
        date: 'Mar 15, 2026',
        zoom: '#',
      },
      {
        title: 'Real-Time Object Detection at the Edge',
        speaker: 'Prof. Marco Rossi',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=MR&backgroundColor=78dce8',
        date: 'Mar 22, 2026',
        zoom: '#',
      },
    ],
  },
  {
    theme: 'Silicon & Architecture',
    color: '#c8a2ff',
    seminars: [
      {
        title: 'Designing Custom AI Accelerators',
        speaker: 'Prof. Lina Moretti',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=LM&backgroundColor=c8a2ff',
        date: 'Apr 5, 2026',
        zoom: '#',
      },
      {
        title: 'FPGA-Based Deep Learning Pipelines',
        speaker: 'Dr. Kevin Wright',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=KW&backgroundColor=c8a2ff',
        date: 'Apr 12, 2026',
        zoom: '#',
      },
    ],
  },
  {
    theme: 'Responsible AI',
    color: '#ff7eb6',
    seminars: [
      {
        title: 'Fairness & Bias in Machine Learning',
        speaker: 'Prof. Elena Vasquez',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=EV&backgroundColor=ff7eb6',
        date: 'Apr 19, 2026',
        zoom: '#',
      },
      {
        title: 'Sustainable Computing for AI Workloads',
        speaker: 'Dr. Amara Osei',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=AO&backgroundColor=ff7eb6',
        date: 'Apr 26, 2026',
        zoom: '#',
      },
    ],
  },
  {
    theme: 'Systems at Scale',
    color: '#ffab70',
    seminars: [
      {
        title: 'Distributed Training Across Data Centers',
        speaker: 'Dr. Priya Sharma',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=PS&backgroundColor=ffab70',
        date: 'May 3, 2026',
        zoom: '#',
      },
      {
        title: 'Model Serving at Production Scale',
        speaker: 'Dr. Daniel Nakamura',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=DN&backgroundColor=ffab70',
        date: 'May 10, 2026',
        zoom: '#',
      },
    ],
  },
  {
    theme: 'Beyond Von Neumann',
    color: '#a9dc76',
    seminars: [
      {
        title: 'Spiking Neural Networks for Low-Power AI',
        speaker: 'Prof. Henrik Lindqvist',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=HL&backgroundColor=a9dc76',
        date: 'May 17, 2026',
        zoom: '#',
      },
      {
        title: 'Event-Driven Processing Architectures',
        speaker: 'Dr. Mei-Ling Zhao',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=MZ&backgroundColor=a9dc76',
        date: 'May 24, 2026',
        zoom: '#',
      },
    ],
  },
  {
    theme: 'Optimization & Compression',
    color: '#ff7eb6',
    seminars: [
      {
        title: 'Quantization: From Theory to Silicon',
        speaker: 'Dr. Yuki Tanaka',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=YT&backgroundColor=ff7eb6',
        date: 'May 31, 2026',
        zoom: '#',
      },
      {
        title: 'Knowledge Distillation for Edge Models',
        speaker: 'Dr. Omar Hassan',
        photo: 'https://api.dicebear.com/9.x/initials/svg?seed=OH&backgroundColor=ff7eb6',
        date: 'Jun 7, 2026',
        zoom: '#',
      },
    ],
  },
]

export default function Seminars() {
  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">04 &mdash; Seminars</div>
      <h2 className="section-title">Open Seminar Series</h2>
      <p className="section-subtitle">
        Always free, always open &mdash; themed sessions with leading researchers and practitioners worldwide
      </p>

      <div className="seminar-themes">
        {SEMINAR_THEMES.map((group, gi) => (
          <div className="seminar-theme-block" key={gi}>
            <div className="seminar-theme-header">
              <span className="seminar-theme-dot" style={{ background: group.color }} />
              <h3 className="seminar-theme-name" style={{ color: group.color }}>{group.theme}</h3>
              <span className="seminar-theme-badge">Free &amp; Open</span>
            </div>

            <div className="seminar-speakers-grid">
              {group.seminars.map((sem, si) => (
                <div className="speaker-card" key={si}>
                  <img className="speaker-photo" src={sem.photo} alt={sem.speaker} />
                  <div className="speaker-info">
                    <div className="speaker-name">{sem.speaker}</div>
                    <div className="speaker-talk">{sem.title}</div>
                    <div className="speaker-date">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      {sem.date}
                    </div>
                  </div>
                  <a className="zoom-link" href={sem.zoom} target="_blank" rel="noopener noreferrer" title="Join on Zoom">
                    <svg className="zoom-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15.6 11.6L22 7v10l-6.4-4.6v-1z" />
                      <rect x="1" y="5" width="15" height="14" rx="2" />
                    </svg>
                    Join Zoom
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section-callout" style={{ marginTop: '2.5rem' }}>
        Every NEXUS seminar is completely free and open to the public. Each session follows a focused theme
        to encourage deep exploration of a single domain. Sessions are recorded and shared with the community.
        Have a topic to propose? Reach out through our Connect page.
      </div>
    </section>
  )
}
