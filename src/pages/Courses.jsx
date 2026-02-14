const COURSES = [
  {
    title: 'Computer Architecture',
    slug: 'computer-architecture',
    link: '#',
    color: '#c8a2ff',
  },
  {
    title: 'FPGA Design & Programming',
    slug: 'fpga-design',
    link: '#',
    color: '#78dce8',
  },
  {
    title: 'Mathematics of Machine Learning',
    slug: 'math-ml',
    link: '#',
    color: '#a9dc76',
  },
  {
    title: 'Computer Vision',
    slug: 'computer-vision',
    link: '#',
    color: '#ffab70',
  },
  {
    title: 'Deep Learning',
    slug: 'deep-learning',
    link: '#',
    color: '#c8a2ff',
  },
  {
    title: 'Information Retrieval',
    slug: 'information-retrieval',
    link: '#',
    color: '#ff7eb6',
  },
  {
    title: 'Game Design',
    slug: 'game-design',
    link: '#',
    color: '#ffab70',
  },
  {
    title: 'Game Development with Unity',
    slug: 'game-dev-unity',
    link: '#',
    color: '#78dce8',
  },
  {
    title: 'Edge AI & TinyML',
    slug: 'edge-ai-tinyml',
    link: '#',
    color: '#a9dc76',
  },
  {
    title: 'AI Accelerator Design',
    slug: 'ai-accelerator-design',
    link: '#',
    color: '#78dce8',
  },
  {
    title: 'Efficient Neural Architecture Search',
    slug: 'efficient-nas',
    link: '#',
    color: '#a9dc76',
  },
  {
    title: 'Neuromorphic Computing Systems',
    slug: 'neuromorphic-computing',
    link: '#',
    color: '#ff7eb6',
  },
  {
    title: 'MLOps & Scalable Infrastructure',
    slug: 'mlops-scalable-infra',
    link: '#',
    color: '#ffab70',
  },
  {
    title: 'Responsible AI & Ethics',
    slug: 'responsible-ai-ethics',
    link: '#',
    color: '#ff7eb6',
  },
]

export default function Courses() {
  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">02 &mdash; Courses</div>
      <h2 className="section-title">Course Catalog</h2>
      <p className="section-subtitle">
        All courses are designed and taught by NEXUS faculty &mdash; freely available to the public
      </p>

      <div className="courses-grid">
        {COURSES.map((course, i) => (
          <div className="course-card" key={i}>
            <div className="course-accent" style={{ background: course.color }} />
            <div className="course-body">
              <div className="course-top">
                <span className="course-instructor-badge">NEXUS Faculty</span>
                <span className="course-access course-access--open">Free &amp; Open</span>
              </div>
              <h3 className="course-title">{course.title}</h3>
              <div className="course-actions">
                <a className="course-link" href={course.link} target="_blank" rel="noopener noreferrer">
                  View Course
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-callout" style={{ marginTop: '2.5rem' }}>
        All courses are freely available to anyone worldwide. Course materials are designed
        with real-world application in mind &mdash; from foundations to frontiers.
      </div>
    </section>
  )
}
