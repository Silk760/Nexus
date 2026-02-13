const RESEARCH_DOMAINS = [
  { title: 'AI Accelerators', desc: 'Next-generation chip architectures optimized for deep learning inference and training workloads.', color: '#c8a2ff' },
  { title: 'Edge Intelligence', desc: 'Efficient AI models on resource-constrained devices for real-time decision making.', color: '#78dce8' },
  { title: 'TinyML', desc: 'Machine learning on microcontrollers and ultra-low-power embedded systems.', color: '#a9dc76' },
  { title: 'HW/SW Co-Design', desc: 'Joint optimization of hardware and software for maximum efficiency.', color: '#ff7eb6' },
  { title: 'Scalable Infrastructure', desc: 'Distributed systems that bring AI from the lab to production at scale.', color: '#ffab70' },
  { title: 'Industrial Applications', desc: 'Translating research into solutions for manufacturing, healthcare, and energy.', color: '#c8a2ff' },
]

export default function Research() {
  return (
    <section className="section page-section visible">
      <div className="section-number">04 &mdash; Research</div>
      <h2 className="section-title">Domains of Impact</h2>
      <p className="section-subtitle">Where NEXUS researchers are pushing boundaries</p>

      <div className="feature-grid">
        {RESEARCH_DOMAINS.map((item) => (
          <div className="feature-card" key={item.title}>
            <div className="feature-dot" style={{ background: item.color }} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
