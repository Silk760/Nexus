import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

/* ─── Animated Circuit Network Canvas ─── */
function CircuitCanvas() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const W = 400, H = 360
    canvas.width = W * 2
    canvas.height = H * 2
    ctx.scale(2, 2)

    const nodes = [
      { x: 200, y: 180, r: 22, color: '#c8a2ff', type: 'core' },
      { x: 80,  y: 70,  r: 10, color: '#78dce8', type: 'node' },
      { x: 320, y: 70,  r: 10, color: '#78dce8', type: 'node' },
      { x: 50,  y: 180, r: 8,  color: '#a9dc76', type: 'node' },
      { x: 350, y: 180, r: 8,  color: '#a9dc76', type: 'node' },
      { x: 80,  y: 290, r: 10, color: '#ffab70', type: 'node' },
      { x: 320, y: 290, r: 10, color: '#ffab70', type: 'node' },
      { x: 140, y: 100, r: 7,  color: '#ff7eb6', type: 'node' },
      { x: 260, y: 100, r: 7,  color: '#ff7eb6', type: 'node' },
      { x: 140, y: 260, r: 7,  color: '#c8a2ff', type: 'node' },
      { x: 260, y: 260, r: 7,  color: '#c8a2ff', type: 'node' },
      { x: 200, y: 50,  r: 6,  color: '#78dce8', type: 'node' },
      { x: 200, y: 310, r: 6,  color: '#ffab70', type: 'node' },
      { x: 130, y: 180, r: 6,  color: '#a9dc76', type: 'node' },
      { x: 270, y: 180, r: 6,  color: '#a9dc76', type: 'node' },
    ]

    const edges = [
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
      [0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],
      [1,7],[7,11],[11,8],[8,2],
      [3,13],[13,14],[14,4],
      [5,9],[9,12],[12,10],[10,6],
      [1,3],[2,4],[5,3],[6,4],
    ]

    let t = 0

    function draw() {
      ctx.clearRect(0, 0, W, H)
      t += 0.006

      const offsets = nodes.map((_, i) => ({
        dx: Math.sin(t * 1.1 + i * 0.9) * 4,
        dy: Math.cos(t * 0.8 + i * 0.7) * 4,
      }))

      edges.forEach(([a, b]) => {
        const ax = nodes[a].x + offsets[a].dx
        const ay = nodes[a].y + offsets[a].dy
        const bx = nodes[b].x + offsets[b].dx
        const by = nodes[b].y + offsets[b].dy
        const pulse = (Math.sin(t * 2.5 + a + b) + 1) / 2

        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.strokeStyle = `rgba(200, 162, 255, ${0.06 + pulse * 0.1})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        const pt = (t * 0.4 + a * 0.12 + b * 0.08) % 1
        const px = ax + (bx - ax) * pt
        const py = ay + (by - ay) * pt
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 162, 255, ${0.2 + pulse * 0.5})`
        ctx.fill()
      })

      nodes.forEach((node, i) => {
        const nx = node.x + offsets[i].dx
        const ny = node.y + offsets[i].dy
        const pulse = (Math.sin(t * 1.8 + i) + 1) / 2

        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.r * 3)
        grd.addColorStop(0, node.color + '15')
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(nx, ny, node.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(nx, ny, node.r + pulse * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = '#0f0f0f'
        ctx.fill()
        ctx.strokeStyle = node.color + '88'
        ctx.lineWidth = 1.2
        ctx.stroke()

        if (node.type === 'core') {
          ctx.fillStyle = '#c8a2ff'
          ctx.font = '700 16px Figtree, sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('N', nx, ny)
        }
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return <canvas ref={canvasRef} style={{ width: 400, height: 360 }} />
}

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── Navigation ─── */
const NAV_ITEMS = ['Philosophy', 'Curriculum', 'Lectures', 'Research', 'Community', 'Connect']

function Navigation({ activeSection }) {
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <nav className="nav">
      <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <img src={import.meta.env.BASE_URL + 'logo.png'} alt="NEXUS" className="nav-logo-img" />
        <div className="nav-logo-text">
          <span className="nav-logo-name">NEXUS</span>
          <span className="nav-logo-sub">Applied Intelligence Institute</span>
        </div>
      </a>
      <div className="nav-links">
        {NAV_ITEMS.map((item) => {
          const id = item.toLowerCase()
          return (
            <button
              key={id}
              className={`nav-link${activeSection === id ? ' active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {item}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

/* ─── Curriculum Data ─── */
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

/* ─── Lectures Data ─── */
const LECTURES = [
  {
    type: 'Seminar Series',
    title: 'Efficient Inference on Edge Devices',
    speaker: 'Upcoming Speaker',
    date: 'Spring 2026',
    tag: 'Edge AI',
    tagColor: '#78dce8',
  },
  {
    type: 'Guest Lecture',
    title: 'Hardware-Aware Neural Architecture Search',
    speaker: 'Upcoming Speaker',
    date: 'Spring 2026',
    tag: 'NAS',
    tagColor: '#a9dc76',
  },
  {
    type: 'Workshop',
    title: 'Hands-On TinyML: From Model to Microcontroller',
    speaker: 'NEXUS Lab',
    date: 'Spring 2026',
    tag: 'TinyML',
    tagColor: '#ffab70',
  },
  {
    type: 'Course Module',
    title: 'Quantization & Pruning for Deployment',
    speaker: 'NEXUS Faculty',
    date: 'Spring 2026',
    tag: 'Optimization',
    tagColor: '#ff7eb6',
  },
  {
    type: 'Seminar Series',
    title: 'Designing Custom AI Accelerators',
    speaker: 'Upcoming Speaker',
    date: 'Fall 2026',
    tag: 'Silicon',
    tagColor: '#c8a2ff',
  },
  {
    type: 'Reading Group',
    title: 'Papers in Responsible & Sustainable AI',
    speaker: 'Open to All',
    date: 'Ongoing',
    tag: 'Ethics',
    tagColor: '#ff7eb6',
  },
]

/* ─── App ─── */
export default function App() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const ids = NAV_ITEMS.map((s) => s.toLowerCase())
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.2 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const philRef = useScrollReveal()
  const currRef = useScrollReveal()
  const lectRef = useScrollReveal()
  const resRef = useScrollReveal()
  const commRef = useScrollReveal()
  const connRef = useScrollReveal()

  return (
    <>
      <Navigation activeSection={activeSection} />

      {/* ═══════════ Hero ═══════════ */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-label">Research &amp; Education</span>
            <h1 className="hero-title">
              NEXUS<br />
              <span className="hero-title-light">Applied Intelligence Institute</span>
            </h1>
            <p className="hero-subtitle">
              Bridging the gap between algorithms and silicon &mdash; from theory
              to real-world deployment. Open, collaborative, and built for learners
              and researchers at every level.
            </p>
            <div className="hero-quote">
              <em>&ldquo;If you want to go fast, go alone. If you want to go far, go together.&rdquo;</em>
            </div>
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-value">6</div>
                <div className="stat-label">Course Tracks</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">24+</div>
                <div className="stat-label">Topics</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">Open</div>
                <div className="stat-label">Access</div>
              </div>
            </div>
          </div>
          <div className="hero-svg-wrap">
            <CircuitCanvas />
          </div>
        </div>
      </section>

      {/* ═══════════ 01 Philosophy ═══════════ */}
      <section id="philosophy" className="section" ref={philRef}>
        <div className="section-number">01 &mdash; Philosophy</div>
        <h2 className="section-title">Why NEXUS Exists</h2>
        <p className="section-subtitle">Deep technical thinking meets meaningful collaboration</p>
        <p className="section-body">
          Students and researchers learn to train AI models, but few understand how to build the systems
          that make them work in production. NEXUS exists to close that gap. We are a research-driven
          initiative dedicated to advancing artificial intelligence through the integration of algorithms,
          silicon systems, and real-world deployment.
        </p>
        <p className="section-body" style={{ marginTop: '1rem' }}>
          The institute serves as a convergence point for researchers, engineers, and innovators working
          at the intersection of AI accelerators, edge intelligence, efficient neural networks, and
          hardware&ndash;software co-design. Our approach is systematic: we develop the ability to reason about
          ML architecture holistically, not component by component.
        </p>
        <div className="section-callout">
          Our mission is to foster a respected environment where scientific rigor and meaningful
          collaboration can thrive. NEXUS bridges theory and practice by supporting research that
          moves beyond simulation into applied systems capable of operating in real-world conditions.
        </div>

        {/* Pillars */}
        <div className="pillars-row">
          <div className="pillar-card">
            <div className="pillar-icon" style={{ color: '#c8a2ff' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h4>Algorithms</h4>
            <p>Efficient architectures, compression, quantization, and neural architecture search</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon" style={{ color: '#78dce8' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
              </svg>
            </div>
            <h4>Silicon</h4>
            <p>Custom accelerators, FPGAs, neuromorphic chips, and purpose-built hardware</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon" style={{ color: '#a9dc76' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h4>Deployment</h4>
            <p>End-to-end pipelines from training to on-device inference in production</p>
          </div>
        </div>
      </section>

      {/* ═══════════ 02 Curriculum ═══════════ */}
      <section id="curriculum" className="section section-wide" ref={currRef}>
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

      {/* ═══════════ 03 Lectures & Seminars ═══════════ */}
      <section id="lectures" className="section section-wide" ref={lectRef}>
        <div className="section-number">03 &mdash; Lectures &amp; Seminars</div>
        <h2 className="section-title">Knowledge Exchange</h2>
        <p className="section-subtitle">
          Seminars, guest lectures, workshops, reading groups, and hands-on labs &mdash;
          multiple modalities for deep learning
        </p>

        <div className="lectures-grid">
          {LECTURES.map((lec, i) => (
            <div className="lecture-card" key={i}>
              <div className="lecture-top">
                <span className="lecture-type">{lec.type}</span>
                <span className="lecture-tag" style={{ color: lec.tagColor, borderColor: lec.tagColor + '44' }}>
                  {lec.tag}
                </span>
              </div>
              <h3 className="lecture-title">{lec.title}</h3>
              <div className="lecture-meta">
                <span>{lec.speaker}</span>
                <span className="lecture-date">{lec.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="section-callout" style={{ marginTop: '2.5rem' }}>
          All lectures and seminars are designed to be accessible to a global audience. Materials are shared
          openly, and recordings are made available to the community when possible. We believe that
          democratizing knowledge accelerates progress for everyone.
        </div>
      </section>

      {/* ═══════════ 04 Research ═══════════ */}
      <section id="research" className="section" ref={resRef}>
        <div className="section-number">04 &mdash; Research</div>
        <h2 className="section-title">Domains of Impact</h2>
        <p className="section-subtitle">Where NEXUS researchers are pushing boundaries</p>

        <div className="feature-grid">
          {[
            { title: 'AI Accelerators', desc: 'Next-generation chip architectures optimized for deep learning inference and training workloads.', color: '#c8a2ff' },
            { title: 'Edge Intelligence', desc: 'Efficient AI models on resource-constrained devices for real-time decision making.', color: '#78dce8' },
            { title: 'TinyML', desc: 'Machine learning on microcontrollers and ultra-low-power embedded systems.', color: '#a9dc76' },
            { title: 'HW/SW Co-Design', desc: 'Joint optimization of hardware and software for maximum efficiency.', color: '#ff7eb6' },
            { title: 'Scalable Infrastructure', desc: 'Distributed systems that bring AI from the lab to production at scale.', color: '#ffab70' },
            { title: 'Industrial Applications', desc: 'Translating research into solutions for manufacturing, healthcare, and energy.', color: '#c8a2ff' },
          ].map((item) => (
            <div className="feature-card" key={item.title}>
              <div className="feature-dot" style={{ background: item.color }} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 05 Community ═══════════ */}
      <section id="community" className="section" ref={commRef}>
        <div className="section-number">05 &mdash; Community</div>
        <h2 className="section-title">A Growing Global Network</h2>
        <p className="section-subtitle">Academic researchers, industry experts, and emerging talent &mdash; together</p>
        <p className="section-body">
          NEXUS is committed to building connections among academic researchers, industry experts, and
          emerging talent worldwide. Through seminars, collaborative initiatives, shared research platforms,
          and open-access materials, the institute fosters an environment where interdisciplinary dialogue
          drives innovation.
        </p>

        <div className="community-grid">
          <div className="community-card">
            <div className="community-icon" style={{ color: '#c8a2ff' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h4>Collaborative Research</h4>
            <p>Joint projects across institutions, disciplines, and industry</p>
          </div>
          <div className="community-card">
            <div className="community-icon" style={{ color: '#78dce8' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h4>Open Materials</h4>
            <p>Lecture notes, slides, code, and datasets shared freely with the community</p>
          </div>
          <div className="community-card">
            <div className="community-icon" style={{ color: '#a9dc76' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h4>Global Reach</h4>
            <p>Building a worldwide network of researchers and practitioners</p>
          </div>
          <div className="community-card">
            <div className="community-icon" style={{ color: '#ff7eb6' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h4>Emerging Talent</h4>
            <p>Mentorship, internships, and pathways for the next generation of AI researchers</p>
          </div>
        </div>

        <div className="section-callout" style={{ marginTop: '2.5rem' }}>
          By encouraging interdisciplinary dialogue and joint research efforts, NEXUS seeks to contribute
          to the development of next-generation intelligent technologies that are efficient, reliable,
          and impactful.
        </div>
      </section>

      {/* ═══════════ 06 Connect ═══════════ */}
      <section id="connect" className="cta-section" ref={connRef}>
        <img
          src={import.meta.env.BASE_URL + 'logo.png'}
          alt="NEXUS"
          className="cta-logo"
        />
        <h2>Join the NEXUS Community</h2>
        <p>
          Whether you&apos;re a researcher, engineer, student, or innovator &mdash; there&apos;s a place for you.
          Let&apos;s build the future of applied intelligence, together.
        </p>
        <div className="cta-buttons">
          <a className="cta-btn" href="mailto:nexus@example.com">
            Get in Touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a className="cta-btn-outline" href="#">
            View on GitHub
          </a>
        </div>
      </section>

      {/* ═══════════ Footer ═══════════ */}
      <footer className="footer">
        <p>&copy; 2026 NEXUS Applied Intelligence Institute</p>
        <p>Algorithms &middot; Silicon &middot; Deployment &middot; Open Knowledge</p>
      </footer>
    </>
  )
}
