import { useLanguage } from '../i18n/LanguageContext'

const COURSES_META = [
  { slug: 'computer-architecture', link: '#', color: '#c8a2ff' },
  { slug: 'fpga-design', link: '#', color: '#78dce8' },
  { slug: 'math-ml', link: '#', color: '#a9dc76' },
  { slug: 'computer-vision', link: '#', color: '#ffab70' },
  { slug: 'deep-learning', link: '#', color: '#c8a2ff' },
  { slug: 'information-retrieval', link: '#', color: '#ff7eb6' },
  { slug: 'game-design', link: '#', color: '#ffab70' },
  { slug: 'game-dev-unity', link: '#', color: '#78dce8' },
  { slug: 'edge-ai-tinyml', link: '#', color: '#a9dc76' },
  { slug: 'ai-accelerator-design', link: '#', color: '#78dce8' },
  { slug: 'efficient-nas', link: '#', color: '#a9dc76' },
  { slug: 'neuromorphic-computing', link: '#', color: '#ff7eb6' },
  { slug: 'mlops-scalable-infra', link: '#', color: '#ffab70' },
  { slug: 'responsible-ai-ethics', link: '#', color: '#ff7eb6' },
]

export default function Courses() {
  const { t } = useLanguage()
  const courseNames = t('courses.items')

  return (
    <section className="section section-wide page-section visible">
      <div className="section-number">{t('courses.number')}</div>
      <h2 className="section-title">{t('courses.title')}</h2>
      <p className="section-subtitle">{t('courses.subtitle')}</p>

      <div className="courses-grid">
        {COURSES_META.map((course, i) => (
          <div className="course-card" key={i}>
            <div className="course-accent" style={{ background: course.color }} />
            <div className="course-body">
              <div className="course-top">
                <span className="course-instructor-badge">{t('courses.faculty')}</span>
                <span className="course-access course-access--open">{t('courses.freeOpen')}</span>
              </div>
              <h3 className="course-title">{courseNames[i]}</h3>
              <div className="course-actions">
                <a className="course-link" href={course.link} target="_blank" rel="noopener noreferrer">
                  {t('courses.viewCourse')}
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
        {t('courses.callout')}
      </div>
    </section>
  )
}
