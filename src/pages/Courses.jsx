import { useState } from 'react'
import { checkout } from '../lib/checkout'

const COURSES = [
  {
    title: 'Computer Architecture',
    slug: 'computer-architecture',
    access: 'Open',
    link: '#',
    color: '#c8a2ff',
  },
  {
    title: 'FPGA Design & Programming',
    slug: 'fpga-design',
    access: 'Open',
    link: '#',
    color: '#78dce8',
  },
  {
    title: 'Mathematics of Machine Learning',
    slug: 'math-ml',
    access: 'Open',
    link: '#',
    color: '#a9dc76',
  },
  {
    title: 'Computer Vision',
    slug: 'computer-vision',
    access: 'Open',
    link: '#',
    color: '#ffab70',
  },
  {
    title: 'Deep Learning',
    slug: 'deep-learning',
    access: 'Open',
    link: '#',
    color: '#c8a2ff',
  },
  {
    title: 'Information Retrieval',
    slug: 'information-retrieval',
    access: 'Open',
    link: '#',
    color: '#ff7eb6',
  },
  {
    title: 'Game Design',
    slug: 'game-design',
    access: 'Open',
    link: '#',
    color: '#ffab70',
  },
  {
    title: 'Game Development with Unity',
    slug: 'game-dev-unity',
    access: 'Open',
    link: '#',
    color: '#78dce8',
  },
  {
    title: 'Edge AI & TinyML',
    slug: 'edge-ai-tinyml',
    access: 'Open',
    link: '#',
    color: '#a9dc76',
  },
  {
    title: 'AI Accelerator Design',
    slug: 'ai-accelerator-design',
    access: 'Paid',
    price: '750 SAR',
    priceSar: 750,
    color: '#78dce8',
  },
  {
    title: 'Efficient Neural Architecture Search',
    slug: 'efficient-nas',
    access: 'Paid',
    price: '560 SAR',
    priceSar: 560,
    color: '#a9dc76',
  },
  {
    title: 'Neuromorphic Computing Systems',
    slug: 'neuromorphic-computing',
    access: 'Paid',
    price: '750 SAR',
    priceSar: 750,
    color: '#ff7eb6',
  },
  {
    title: 'MLOps & Scalable Infrastructure',
    slug: 'mlops-scalable-infra',
    access: 'Open',
    link: '#',
    color: '#ffab70',
  },
  {
    title: 'Responsible AI & Ethics',
    slug: 'responsible-ai-ethics',
    access: 'Open',
    link: '#',
    color: '#ff7eb6',
  },
]

export default function Courses() {
  const [checkingOut, setCheckingOut] = useState(null)

  async function handlePayCheckout(course) {
    if (!course.priceSar) {
      alert('Payment is not yet configured for this course.')
      return
    }
    setCheckingOut(course.slug)
    try {
      await checkout('course', course.slug, course.priceSar)
    } catch (err) {
      console.error(err)
      alert('Could not start checkout. Please try again.')
    } finally {
      setCheckingOut(null)
    }
  }

  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">02 &mdash; Courses</div>
      <h2 className="section-title">Course Catalog</h2>
      <p className="section-subtitle">
        All courses are designed and taught by NEXUS faculty &mdash; some open to the public,
        others available through enrollment
      </p>

      <div className="courses-grid">
        {COURSES.map((course, i) => (
          <div className="course-card" key={i}>
            <div className="course-accent" style={{ background: course.color }} />
            <div className="course-body">
              <div className="course-top">
                <span className="course-instructor-badge">NEXUS Faculty</span>
                <span className={`course-access ${course.access === 'Open' ? 'course-access--open' : 'course-access--paid'}`}>
                  {course.access === 'Open' ? 'Free & Open' : course.price}
                </span>
              </div>
              <h3 className="course-title">{course.title}</h3>

              {course.access === 'Open' ? (
                <div className="course-actions">
                  <a className="course-link" href={course.link} target="_blank" rel="noopener noreferrer">
                    View Course
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              ) : (
                <div className="course-actions">
                  <span className="course-pay-label">Enroll via</span>
                  <div className="course-pay-buttons">
                    <button
                      className="pay-btn pay-btn--tap"
                      disabled={checkingOut === course.slug}
                      onClick={() => handlePayCheckout(course)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      {checkingOut === course.slug ? 'Redirecting…' : 'Pay Now'}
                    </button>
                    <a className="pay-btn pay-btn--tabby" href="#" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h18v4H3V3zm0 7h18v4H3v-4zm0 7h18v4H3v-4z" />
                      </svg>
                      Tabby
                    </a>
                    <a className="pay-btn pay-btn--tamara" href="#" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" />
                      </svg>
                      Tamara
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="section-callout" style={{ marginTop: '2.5rem' }}>
        Open courses are freely available to anyone worldwide. Paid courses include live instruction,
        mentorship, project reviews, and certification. Pay securely via Tap Payments (Mada, Apple Pay, cards),
        Tabby, or Tamara. All course materials are designed with real-world application in mind.
      </div>
    </section>
  )
}
