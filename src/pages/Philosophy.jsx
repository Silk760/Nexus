export default function Philosophy() {
  return (
    <section className="section page-section visible">
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
  )
}
