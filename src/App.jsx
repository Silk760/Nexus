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

    // chip-inspired nodes
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

      // edges with data pulses
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

        // traveling data particle
        const pt = (t * 0.4 + a * 0.12 + b * 0.08) % 1
        const px = ax + (bx - ax) * pt
        const py = ay + (by - ay) * pt
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 162, 255, ${0.2 + pulse * 0.5})`
        ctx.fill()
      })

      // nodes
      nodes.forEach((node, i) => {
        const nx = node.x + offsets[i].dx
        const ny = node.y + offsets[i].dy
        const pulse = (Math.sin(t * 1.8 + i) + 1) / 2

        // glow
        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.r * 3)
        grd.addColorStop(0, node.color + '15')
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(nx, ny, node.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // body
        ctx.beginPath()
        ctx.arc(nx, ny, node.r + pulse * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = '#0f0f0f'
        ctx.fill()
        ctx.strokeStyle = node.color + '88'
        ctx.lineWidth = 1.2
        ctx.stroke()

        // core label
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
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── Navigation ─── */
const NAV_ITEMS = ['About', 'Research', 'Pillars', 'Community', 'Connect']

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
      { threshold: 0.3 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const aboutRef = useScrollReveal()
  const researchRef = useScrollReveal()
  const pillarsRef = useScrollReveal()
  const communityRef = useScrollReveal()
  const connectRef = useScrollReveal()

  return (
    <>
      <Navigation activeSection={activeSection} />

      {/* ─── Hero ─── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-label">Research Institute</span>
            <h1 className="hero-title">
              NEXUS<br />
              <span className="hero-title-light">Applied Intelligence Institute</span>
            </h1>
            <p className="hero-subtitle">
              Advancing the frontiers of artificial intelligence through the integration
              of algorithms, silicon systems, and real-world deployment.
            </p>
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-value">AI</div>
                <div className="stat-label">Accelerators</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">Edge</div>
                <div className="stat-label">Intelligence</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">HW/SW</div>
                <div className="stat-label">Co-Design</div>
              </div>
            </div>
          </div>
          <div className="hero-svg-wrap">
            <CircuitCanvas />
          </div>
        </div>
      </section>

      {/* ─── 01 About ─── */}
      <section id="about" className="section" ref={aboutRef}>
        <div className="section-number">01 &mdash; About</div>
        <h2 className="section-title">Our Mission</h2>
        <p className="section-subtitle">Where deep technical thinking meets real-world impact</p>
        <p className="section-body">
          NEXUS Applied Intelligence Institute is a research-driven initiative dedicated to advancing the
          frontiers of artificial intelligence through the integration of algorithms, silicon systems, and
          real-world deployment. The institute serves as a convergence point for researchers, engineers, and
          innovators working at the intersection of AI accelerators, edge intelligence, efficient neural
          networks, and hardware&ndash;software co-design.
        </p>
        <div className="section-callout">
          Our mission is to foster a respected environment where deep technical thinking, scientific rigor,
          and meaningful collaboration can thrive. NEXUS aims to bridge the gap between theory and practice
          by supporting research that moves beyond simulation into applied systems capable of operating in
          real-world conditions.
        </div>
      </section>

      {/* ─── 02 Research Focus ─── */}
      <section id="research" className="section" ref={researchRef}>
        <div className="section-number">02 &mdash; Research Focus</div>
        <h2 className="section-title">Domains of Impact</h2>
        <p className="section-subtitle">Spanning the full stack from algorithms to silicon</p>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(200, 162, 255, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8a2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
                <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
              </svg>
            </div>
            <h3>AI Accelerators</h3>
            <p>Designing next-generation chip architectures optimized for deep learning inference and training workloads.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(120, 220, 232, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#78dce8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Edge Intelligence</h3>
            <p>Deploying efficient AI models on resource-constrained devices for real-time decision making at the edge.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(169, 220, 118, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a9dc76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
              </svg>
            </div>
            <h3>TinyML</h3>
            <p>Pushing the boundaries of machine learning on microcontrollers and ultra-low-power embedded systems.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(255, 126, 182, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff7eb6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h3>HW/SW Co-Design</h3>
            <p>Joint optimization of hardware architectures and software stacks for maximum efficiency and performance.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(255, 171, 112, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffab70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <h3>Scalable AI Infrastructure</h3>
            <p>Building robust, distributed systems that bring AI from the lab to production at scale.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(200, 162, 255, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8a2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h3>Industrial AI Applications</h3>
            <p>Translating research into deployable solutions for manufacturing, healthcare, energy, and beyond.</p>
          </div>
        </div>
      </section>

      {/* ─── 03 Pillars ─── */}
      <section id="pillars" className="section" ref={pillarsRef}>
        <div className="section-number">03 &mdash; Core Pillars</div>
        <h2 className="section-title">Three Pillars of NEXUS</h2>
        <p className="section-subtitle">The convergence of algorithms, silicon, and deployment</p>

        <div className="steps">
          <div className="step">
            <div className="step-number" style={{ background: 'rgba(200, 162, 255, 0.12)', color: '#c8a2ff' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h3>Algorithms</h3>
              <p>
                Efficient neural network architectures, model compression, quantization, pruning,
                and neural architecture search. Developing algorithms that maintain accuracy while
                dramatically reducing computational requirements.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number" style={{ background: 'rgba(120, 220, 232, 0.12)', color: '#78dce8' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
              </svg>
            </div>
            <div>
              <h3>Silicon Systems</h3>
              <p>
                Custom AI accelerators, FPGA implementations, neuromorphic computing, and
                advanced chip architectures. Designing hardware that is purpose-built for
                the demands of modern AI workloads.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number" style={{ background: 'rgba(169, 220, 118, 0.12)', color: '#a9dc76' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div>
              <h3>Real-World Deployment</h3>
              <p>
                Moving beyond simulation into applied systems that operate under real-world constraints.
                End-to-end pipelines from training to on-device inference in industrial, medical,
                and autonomous systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04 Community ─── */}
      <section id="community" className="section" ref={communityRef}>
        <div className="section-number">04 &mdash; Community</div>
        <h2 className="section-title">A Growing Global Network</h2>
        <p className="section-subtitle">Building connections that drive innovation</p>
        <p className="section-body">
          As a growing global community, NEXUS is committed to building connections among academic
          researchers, industry experts, and emerging talent. Through seminars, collaborative initiatives,
          and shared research platforms, the institute aims to become a trusted hub for applied intelligence
          research and innovation.
        </p>

        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#c8a2ff' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="metric-label">Researchers &amp; Engineers</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#78dce8' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div className="metric-label">Seminars &amp; Workshops</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#a9dc76' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div className="metric-label">Collaborative Initiatives</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#ff7eb6' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="metric-label">Shared Research Platforms</div>
          </div>
        </div>

        <div className="section-callout" style={{ marginTop: '3rem' }}>
          By encouraging interdisciplinary dialogue and joint research efforts, NEXUS seeks to contribute
          to the development of next-generation intelligent technologies that are efficient, reliable,
          and impactful.
        </div>
      </section>

      {/* ─── 05 Connect ─── */}
      <section id="connect" className="cta-section" ref={connectRef}>
        <img
          src={import.meta.env.BASE_URL + 'logo.png'}
          alt="NEXUS"
          className="cta-logo"
        />
        <h2>Join the NEXUS Community</h2>
        <p>
          Whether you&apos;re a researcher, engineer, or innovator &mdash; there&apos;s a place for you at NEXUS.
          Let&apos;s build the future of applied intelligence together.
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
            View Research
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <p>&copy; 2026 NEXUS Applied Intelligence Institute</p>
        <p>Algorithms &middot; Silicon &middot; Deployment</p>
      </footer>
    </>
  )
}
