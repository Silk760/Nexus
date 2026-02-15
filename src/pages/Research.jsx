import { useLanguage } from '../i18n/LanguageContext'

const DOMAIN_COLORS = ['#c8a2ff', '#78dce8', '#a9dc76', '#ff7eb6', '#ffab70', '#c8a2ff']

export default function Research() {
  const { t } = useLanguage()
  const domains = t('research.domains')

  return (
    <section className="section page-section visible">
      <div className="section-number">{t('research.number')}</div>
      <h2 className="section-title">{t('research.title')}</h2>
      <p className="section-subtitle">{t('research.subtitle')}</p>

      <div className="feature-grid">
        {domains.map((item, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-dot" style={{ background: DOMAIN_COLORS[i] }} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
