import CircuitCanvas from '../components/CircuitCanvas'
import { useLanguage } from '../i18n/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-label">{t('home.heroLabel')}</span>
          <h1 className="hero-title">
            {t('home.heroTitle')}<br />
            <span className="hero-title-light">{t('home.heroTitleLight')}</span>
          </h1>
          <p className="hero-subtitle">{t('home.heroSubtitle')}</p>
          <div className="hero-quote">
            <em>{t('home.heroQuote')}</em>
          </div>
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-value">{t('home.statCoursesValue')}</div>
              <div className="stat-label">{t('home.statCoursesLabel')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{t('home.statTopicsValue')}</div>
              <div className="stat-label">{t('home.statTopicsLabel')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{t('home.statOpenValue')}</div>
              <div className="stat-label">{t('home.statOpenLabel')}</div>
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
