import { useLanguage } from '../i18n/LanguageContext'

export default function Philosophy() {
  const { t } = useLanguage()

  return (
    <section className="section page-section visible">
      <div className="section-number">{t('philosophy.number')}</div>
      <h2 className="section-title">{t('philosophy.title')}</h2>
      <p className="section-subtitle">{t('philosophy.subtitle')}</p>
      <p className="section-body">{t('philosophy.body1')}</p>
      <p className="section-body" style={{ marginTop: '1rem' }}>{t('philosophy.body2')}</p>
      <div className="section-callout">{t('philosophy.callout')}</div>

      <div className="pillars-row">
        <div className="pillar-card">
          <div className="pillar-icon" style={{ color: '#c8a2ff' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h4>{t('philosophy.pillarAlgorithms')}</h4>
          <p>{t('philosophy.pillarAlgorithmsDesc')}</p>
        </div>
        <div className="pillar-card">
          <div className="pillar-icon" style={{ color: '#78dce8' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
              <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
              <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
            </svg>
          </div>
          <h4>{t('philosophy.pillarSilicon')}</h4>
          <p>{t('philosophy.pillarSiliconDesc')}</p>
        </div>
        <div className="pillar-card">
          <div className="pillar-icon" style={{ color: '#a9dc76' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <h4>{t('philosophy.pillarDeployment')}</h4>
          <p>{t('philosophy.pillarDeploymentDesc')}</p>
        </div>
      </div>
    </section>
  )
}
