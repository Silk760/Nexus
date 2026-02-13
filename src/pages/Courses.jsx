import { useState } from 'react'
import { checkout } from '../lib/checkout'

const COURSES = [
  {
    title: 'Introduction to ML Systems',
    slug: 'intro-ml-systems',
    time: 'Mon & Wed, 10:00 AM – 11:30 AM',
    access: 'Open',
    link: '#',
    color: '#c8a2ff',
  },
  {
    title: 'Deep Learning & DNN Architectures',
    slug: 'deep-learning-dnn',
    time: 'Tue & Thu, 1:00 PM – 2:30 PM',
    access: 'Open',
    link: '#',
    color: '#c8a2ff',
  },
  {
    title: 'AI Accelerator Design',
    slug: 'ai-accelerator-design',
    time: 'Wed & Fri, 9:00 AM – 10:30 AM',
    access: 'Paid',
    price: '$199',
    stripePriceId: '',   // Set from Stripe dashboard

    color: '#78dce8',
  },
  {
    title: 'Edge Computing & TinyML',
    slug: 'edge-computing-tinyml',
    time: 'Mon & Wed, 2:00 PM – 3:30 PM',
    access: 'Paid',
    price: '$179',
    stripePriceId: '',

    color: '#78dce8',
  },
  {
    title: 'Model Compression & Quantization',
    slug: 'model-compression-quantization',
    time: 'Tue & Thu, 10:00 AM – 11:30 AM',
    access: 'Open',
    link: '#',
    color: '#a9dc76',
  },
  {
    title: 'Efficient Neural Architecture Search',
    slug: 'efficient-nas',
    time: 'Fri, 1:00 PM – 4:00 PM',
    access: 'Paid',
    price: '$149',
    stripePriceId: '',

    color: '#a9dc76',
  },
  {
    title: 'MLOps & Scalable Infrastructure',
    slug: 'mlops-scalable-infra',
    time: 'Mon & Wed, 4:00 PM – 5:30 PM',
    access: 'Open',
    link: '#',
    color: '#ffab70',
  },
  {
    title: 'Responsible AI & Ethics',
    slug: 'responsible-ai-ethics',
    time: 'Thu, 10:00 AM – 12:00 PM',
    access: 'Open',
    link: '#',
    color: '#ff7eb6',
  },
  {
    title: 'HW/SW Co-Design for AI',
    slug: 'hwsw-codesign',
    time: 'Tue & Thu, 3:00 PM – 4:30 PM',
    access: 'Paid',
    price: '$219',
    stripePriceId: '',

    color: '#c8a2ff',
  },
  {
    title: 'On-Device Inference & Deployment',
    slug: 'on-device-inference',
    time: 'Wed, 2:00 PM – 5:00 PM',
    access: 'Open',
    link: '#',
    color: '#ffab70',
  },
  {
    title: 'Neuromorphic Computing Systems',
    slug: 'neuromorphic-computing',
    time: 'Mon & Fri, 11:00 AM – 12:30 PM',
    access: 'Paid',
    price: '$199',
    stripePriceId: '',

    color: '#78dce8',
  },
  {
    title: 'Industrial AI Applications',
    slug: 'industrial-ai-apps',
    time: 'Tue & Thu, 9:00 AM – 10:30 AM',
    access: 'Open',
    link: '#',
    color: '#ff7eb6',
  },
]

export default function Courses() {
  const [checkingOut, setCheckingOut] = useState(null)

  async function handleStripeCheckout(course) {
    if (!course.stripePriceId) {
      alert('Stripe payment is not yet configured for this course.')
      return
    }
    setCheckingOut(course.slug)
    try {
      await checkout('course', course.slug, course.stripePriceId)
    } catch (err) {
      console.error(err)
      alert('Could not start checkout. Please try again.')
    } finally {
      setCheckingOut(null)
    }
  }

  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">03 &mdash; Courses</div>
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
              <div className="course-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {course.time}
              </div>

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
                      className="pay-btn pay-btn--stripe"
                      disabled={checkingOut === course.slug}
                      onClick={() => handleStripeCheckout(course)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                      </svg>
                      {checkingOut === course.slug ? 'Redirecting…' : 'Stripe'}
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
        mentorship, project reviews, and certification. Pay securely via Stripe, Tabby, or
        Tamara. All course materials are designed with real-world application in mind.
      </div>
    </section>
  )
}
