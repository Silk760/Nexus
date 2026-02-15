import { useLanguage } from '../i18n/LanguageContext'

export default function Connect() {
  const { t } = useLanguage()

  return (
    <section className="cta-section page-section visible">
      <img
        src={import.meta.env.BASE_URL + 'logo.png'}
        alt="NEXUS"
        className="cta-logo"
      />
      <h2>{t('connect.title')}</h2>
      <p>{t('connect.body')}</p>
      <div className="cta-buttons">
        <a className="cta-btn" href="mailto:nexus@example.com">
          {t('connect.getInTouch')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        <a className="cta-btn-outline" href="#">
          {t('connect.viewGithub')}
        </a>
      </div>
    </section>
  )
}
