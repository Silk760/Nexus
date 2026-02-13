const COURSES = [
  {
    title: 'Introduction to ML Systems',
    time: 'Mon & Wed, 10:00 AM – 11:30 AM',
    access: 'Open',
    link: '#',
    color: '#c8a2ff',
  },
  {
    title: 'Deep Learning & DNN Architectures',
    time: 'Tue & Thu, 1:00 PM – 2:30 PM',
    access: 'Open',
    link: '#',
    color: '#c8a2ff',
  },
  {
    title: 'AI Accelerator Design',
    time: 'Wed & Fri, 9:00 AM – 10:30 AM',
    access: 'Paid',
    price: '$199',
    stripe: '#',   // Replace with your Stripe Payment Link
    salla: '#',    // Replace with your Salla product link
    color: '#78dce8',
  },
  {
    title: 'Edge Computing & TinyML',
    time: 'Mon & Wed, 2:00 PM – 3:30 PM',
    access: 'Paid',
    price: '$179',
    stripe: '#',
    salla: '#',
    color: '#78dce8',
  },
  {
    title: 'Model Compression & Quantization',
    time: 'Tue & Thu, 10:00 AM – 11:30 AM',
    access: 'Open',
    link: '#',
    color: '#a9dc76',
  },
  {
    title: 'Efficient Neural Architecture Search',
    time: 'Fri, 1:00 PM – 4:00 PM',
    access: 'Paid',
    price: '$149',
    stripe: '#',
    salla: '#',
    color: '#a9dc76',
  },
  {
    title: 'MLOps & Scalable Infrastructure',
    time: 'Mon & Wed, 4:00 PM – 5:30 PM',
    access: 'Open',
    link: '#',
    color: '#ffab70',
  },
  {
    title: 'Responsible AI & Ethics',
    time: 'Thu, 10:00 AM – 12:00 PM',
    access: 'Open',
    link: '#',
    color: '#ff7eb6',
  },
  {
    title: 'HW/SW Co-Design for AI',
    time: 'Tue & Thu, 3:00 PM – 4:30 PM',
    access: 'Paid',
    price: '$219',
    stripe: '#',
    salla: '#',
    color: '#c8a2ff',
  },
  {
    title: 'On-Device Inference & Deployment',
    time: 'Wed, 2:00 PM – 5:00 PM',
    access: 'Open',
    link: '#',
    color: '#ffab70',
  },
  {
    title: 'Neuromorphic Computing Systems',
    time: 'Mon & Fri, 11:00 AM – 12:30 PM',
    access: 'Paid',
    price: '$199',
    stripe: '#',
    salla: '#',
    color: '#78dce8',
  },
  {
    title: 'Industrial AI Applications',
    time: 'Tue & Thu, 9:00 AM – 10:30 AM',
    access: 'Open',
    link: '#',
    color: '#ff7eb6',
  },
]

export default function Courses() {
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
                    <a className="pay-btn pay-btn--stripe" href={course.stripe} target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                      </svg>
                      Stripe
                    </a>
                    <a className="pay-btn pay-btn--salla" href={course.salla} target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-8-3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
                      </svg>
                      Salla
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
        mentorship, project reviews, and certification. Pay securely via Stripe (international) or
        Salla (regional). All course materials are designed with real-world application in mind.
      </div>
    </section>
  )
}
