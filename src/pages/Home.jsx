import { Link } from 'react-router-dom'
import CircuitCanvas from '../components/CircuitCanvas'

export default function Home() {
  return (
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
  )
}
