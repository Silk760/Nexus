import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

/* ─── Animated Nexus SVG ─── */
function NexusSVG() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const W = 360, H = 320
    canvas.width = W * 2
    canvas.height = H * 2
    ctx.scale(2, 2)

    const nodes = [
      { x: 180, y: 160, r: 18, color: '#c8a2ff', label: 'N' },
      { x: 80,  y: 80,  r: 12, color: '#ff7eb6', label: '' },
      { x: 280, y: 80,  r: 12, color: '#78dce8', label: '' },
      { x: 60,  y: 220, r: 10, color: '#a9dc76', label: '' },
      { x: 300, y: 220, r: 10, color: '#ffab70', label: '' },
      { x: 140, y: 40,  r: 8,  color: '#c8a2ff', label: '' },
      { x: 240, y: 40,  r: 8,  color: '#ff7eb6', label: '' },
      { x: 40,  y: 150, r: 7,  color: '#78dce8', label: '' },
      { x: 320, y: 150, r: 7,  color: '#a9dc76', label: '' },
      { x: 130, y: 260, r: 8,  color: '#ffab70', label: '' },
      { x: 250, y: 270, r: 8,  color: '#c8a2ff', label: '' },
      { x: 180, y: 290, r: 6,  color: '#78dce8', label: '' },
    ]

    const edges = [
      [0,1],[0,2],[0,3],[0,4],
      [1,5],[1,7],[2,6],[2,8],
      [3,9],[4,10],[0,5],[0,6],
      [0,9],[0,10],[9,11],[10,11],
      [1,2],[3,4],[7,3],[8,4],
    ]

    let t = 0

    function draw() {
      ctx.clearRect(0, 0, W, H)
      t += 0.008

      // floating offsets
      const offsets = nodes.map((_, i) => ({
        dx: Math.sin(t * 1.2 + i * 1.1) * 6,
        dy: Math.cos(t * 0.9 + i * 0.8) * 6,
      }))

      // draw edges
      edges.forEach(([a, b]) => {
        const ax = nodes[a].x + offsets[a].dx
        const ay = nodes[a].y + offsets[a].dy
        const bx = nodes[b].x + offsets[b].dx
        const by = nodes[b].y + offsets[b].dy

        const pulse = (Math.sin(t * 3 + a + b) + 1) / 2
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.strokeStyle = `rgba(200, 162, 255, ${0.08 + pulse * 0.12})`
        ctx.lineWidth = 1
        ctx.stroke()

        // traveling particle
        const pt = (t * 0.5 + a * 0.15 + b * 0.1) % 1
        const px = ax + (bx - ax) * pt
        const py = ay + (by - ay) * pt
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 162, 255, ${0.3 + pulse * 0.4})`
        ctx.fill()
      })

      // draw nodes
      nodes.forEach((node, i) => {
        const nx = node.x + offsets[i].dx
        const ny = node.y + offsets[i].dy
        const pulse = (Math.sin(t * 2 + i) + 1) / 2

        // glow
        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.r * 3)
        grd.addColorStop(0, node.color + '20')
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(nx, ny, node.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // circle
        ctx.beginPath()
        ctx.arc(nx, ny, node.r + pulse * 2, 0, Math.PI * 2)
        ctx.fillStyle = '#141414'
        ctx.fill()
        ctx.strokeStyle = node.color + 'aa'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // label
        if (node.label) {
          ctx.fillStyle = '#fff'
          ctx.font = '700 14px Figtree, sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(node.label, nx, ny)
        }
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 360, height: 320 }}
    />
  )
}

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return ref
}

/* ─── Navigation ─── */
const NAV_ITEMS = ['About', 'Features', 'How It Works', 'Metrics', 'Get Started']

function Navigation({ activeSection }) {
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <nav className="nav">
      <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <svg viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" stroke="#c8a2ff" strokeWidth="1.5" fill="none" />
          <circle cx="14" cy="14" r="4" fill="#c8a2ff" />
          <line x1="14" y1="2" x2="14" y2="10" stroke="#c8a2ff" strokeWidth="1.2" />
          <line x1="14" y1="18" x2="14" y2="26" stroke="#c8a2ff" strokeWidth="1.2" />
          <line x1="2" y1="14" x2="10" y2="14" stroke="#c8a2ff" strokeWidth="1.2" />
          <line x1="18" y1="14" x2="26" y2="14" stroke="#c8a2ff" strokeWidth="1.2" />
        </svg>
        Nexus
      </a>
      <div className="nav-links">
        {NAV_ITEMS.map((item) => {
          const id = item.toLowerCase().replace(/\s+/g, '-')
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

  // track which section is in view
  useEffect(() => {
    const ids = NAV_ITEMS.map((s) => s.toLowerCase().replace(/\s+/g, '-'))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
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
  const featuresRef = useScrollReveal()
  const howRef = useScrollReveal()
  const metricsRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <>
      <Navigation activeSection={activeSection} />

      {/* ─── Hero ─── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-label">Open Platform</span>
            <h1 className="hero-title">Welcome to Nexus</h1>
            <p className="hero-subtitle">
              A connected hub for building, sharing, and scaling ideas.
              From concept to production — everything flows through Nexus.
            </p>
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-value">10x</div>
                <div className="stat-label">Faster Builds</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">Open</div>
                <div className="stat-label">Source</div>
              </div>
            </div>
          </div>
          <div className="hero-svg-wrap">
            <NexusSVG />
          </div>
        </div>
      </section>

      {/* ─── 01 About ─── */}
      <section id="about" className="section" ref={aboutRef}>
        <div className="section-number">01 &mdash; About</div>
        <h2 className="section-title">What is Nexus?</h2>
        <p className="section-subtitle">The infrastructure layer for modern teams</p>
        <p className="section-body">
          Nexus is a modular platform designed to connect workflows, services, and people
          into a single cohesive system. Whether you&apos;re orchestrating microservices,
          managing data pipelines, or collaborating across distributed teams &mdash;
          Nexus provides the backbone that ties it all together.
        </p>
        <div className="section-callout">
          Built from the ground up for speed, flexibility, and developer experience.
          Zero lock-in. Full control. Your rules.
        </div>

        {/* Code block */}
        <div className="code-block">
          <div className="code-header">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
            <span className="code-filename">nexus.config.js</span>
          </div>
          <div className="code-body">
            <pre>
              <span className="kw">export default</span>{` {\n`}
              {'  '}<span className="hl">name</span>{`: `}<span className="st">'my-project'</span>{`,\n`}
              {'  '}<span className="hl">modules</span>{`: [`}<span className="st">'auth'</span>{`, `}<span className="st">'data'</span>{`, `}<span className="st">'api'</span>{`],\n`}
              {'  '}<span className="hl">deploy</span>{`: {\n`}
              {'    '}<span className="fn">target</span>{`: `}<span className="st">'edge'</span>{`,\n`}
              {'    '}<span className="fn">regions</span>{`: [`}<span className="st">'us-east'</span>{`, `}<span className="st">'eu-west'</span>{`],\n`}
              {'  }'}{`,\n`}
              {'  '}<span className="cm">{'// Zero-config. Just works.'}</span>{`\n`}
              {'}'}
            </pre>
          </div>
        </div>
      </section>

      {/* ─── 02 Features ─── */}
      <section id="features" className="section" ref={featuresRef}>
        <div className="section-number">02 &mdash; Features</div>
        <h2 className="section-title">Core Capabilities</h2>
        <p className="section-subtitle">Everything you need, nothing you don&apos;t</p>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(200, 162, 255, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8a2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h3>Lightning Fast</h3>
            <p>Sub-millisecond routing with an optimized runtime. Built for speed at any scale.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(120, 220, 232, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#78dce8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </div>
            <h3>Edge-Native</h3>
            <p>Deploy globally with automatic edge routing. Data stays close to your users.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(169, 220, 118, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a9dc76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Secure by Default</h3>
            <p>End-to-end encryption, zero-trust networking, and automatic secret rotation.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(255, 126, 182, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff7eb6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h3>Developer First</h3>
            <p>Intuitive APIs, rich CLI tooling, and documentation that actually helps.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(255, 171, 112, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffab70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <h3>Fully Configurable</h3>
            <p>Plugin architecture with hot-reloading. Customize every layer of the stack.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(200, 162, 255, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8a2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>Team Ready</h3>
            <p>Role-based access, audit logs, and real-time collaboration built in.</p>
          </div>
        </div>
      </section>

      {/* ─── 03 How It Works ─── */}
      <section id="how-it-works" className="section" ref={howRef}>
        <div className="section-number">03 &mdash; How It Works</div>
        <h2 className="section-title">Simple by Design</h2>
        <p className="section-subtitle">Three steps from zero to deployed</p>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div>
              <h3>Initialize</h3>
              <p>
                Run a single command to scaffold your project. Nexus detects your stack
                and configures everything automatically &mdash; frameworks, databases, and services.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div>
              <h3>Connect</h3>
              <p>
                Link your modules, APIs, and data sources. The Nexus graph engine
                resolves dependencies and optimizes the data flow between services.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div>
              <h3>Deploy</h3>
              <p>
                Ship to the edge with one push. Automatic scaling, rollbacks, and
                observability come standard. Monitor everything from the Nexus dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="code-block">
          <div className="code-header">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
            <span className="code-filename">terminal</span>
          </div>
          <div className="code-body">
            <pre>
{`$ npx nexus init my-app
  → Detected: React + Node.js + PostgreSQL
  → Generated nexus.config.js
  → Modules: auth, api, data

$ npx nexus deploy
  → Building...  done (1.2s)
  → Deploying to 3 regions...
  → Live at nexus.app/my-app ✓`}
            </pre>
          </div>
        </div>
      </section>

      {/* ─── 04 Metrics ─── */}
      <section id="metrics" className="section" ref={metricsRef}>
        <div className="section-number">04 &mdash; By The Numbers</div>
        <h2 className="section-title">Built to Scale</h2>
        <p className="section-subtitle">Trusted by teams shipping to millions of users</p>

        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#c8a2ff' }}>50K+</div>
            <div className="metric-label">Projects Deployed</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#78dce8' }}>200ms</div>
            <div className="metric-label">Avg. Response Time</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#a9dc76' }}>99.99%</div>
            <div className="metric-label">Availability</div>
          </div>
          <div className="metric-card">
            <div className="metric-value" style={{ color: '#ff7eb6' }}>40+</div>
            <div className="metric-label">Edge Regions</div>
          </div>
        </div>

        <div className="section-callout" style={{ marginTop: '3rem' }}>
          Nexus handles the infrastructure so you can focus on what matters &mdash;
          building great products. No ops team required.
        </div>
      </section>

      {/* ─── 05 CTA ─── */}
      <section id="get-started" className="cta-section" ref={ctaRef}>
        <h2>Ready to Build?</h2>
        <p>
          Get started in minutes. No credit card, no setup wizards, no friction.
        </p>
        <div className="cta-buttons">
          <a className="cta-btn" href="#">
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a className="cta-btn-outline" href="#">
            View Documentation
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <p>&copy; 2026 Nexus &middot; Built with purpose</p>
        <p>
          <a href="#">GitHub</a> &nbsp;&middot;&nbsp; <a href="#">Docs</a> &nbsp;&middot;&nbsp; <a href="#">Twitter</a>
        </p>
      </footer>
    </>
  )
}
