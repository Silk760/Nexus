import { useLanguage } from '../i18n/LanguageContext'

export default function Community() {
  const { t } = useLanguage()

  return (
    <section className="section page-section visible">
      <div className="section-number">{t('community.number')}</div>
      <h2 className="section-title">{t('community.title')}</h2>
      <p className="section-subtitle">{t('community.subtitle')}</p>
      <p className="section-body">{t('community.body')}</p>

      <div className="community-grid">
        <div className="community-card">
          <div className="community-icon" style={{ color: '#c8a2ff' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h4>{t('community.collabResearch')}</h4>
          <p>{t('community.collabResearchDesc')}</p>
        </div>
        <div className="community-card">
          <div className="community-icon" style={{ color: '#78dce8' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <h4>{t('community.openMaterials')}</h4>
          <p>{t('community.openMaterialsDesc')}</p>
        </div>
        <div className="community-card">
          <div className="community-icon" style={{ color: '#a9dc76' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <h4>{t('community.globalReach')}</h4>
          <p>{t('community.globalReachDesc')}</p>
        </div>
        <div className="community-card">
          <div className="community-icon" style={{ color: '#ff7eb6' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h4>{t('community.emergingTalent')}</h4>
          <p>{t('community.emergingTalentDesc')}</p>
        </div>
      </div>

      <div className="section-callout" style={{ marginTop: '2.5rem' }}>
        {t('community.callout')}
      </div>
    </section>
  )
}
