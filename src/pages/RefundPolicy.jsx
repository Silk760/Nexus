import { useLanguage } from '../i18n/LanguageContext'

export default function RefundPolicy() {
  const { t } = useLanguage()

  return (
    <section className="section page-section visible">
      <div className="section-number">{t('refund.number')}</div>
      <h2 className="section-title">{t('refund.title')}</h2>
      <p className="section-subtitle">{t('refund.lastUpdated')}</p>

      <p className="section-body">{t('refund.intro')}</p>

      <h3 className="policy-heading">{t('refund.seminarsTitle')}</h3>
      <p className="section-body">{t('refund.seminarsText')}</p>

      <h3 className="policy-heading">{t('refund.workshopsTitle')}</h3>
      <p className="section-body">{t('refund.workshopsText')}</p>

      <div className="section-callout" style={{ marginBottom: '1.5rem' }}>
        <strong>{t('refund.fullRefund')}</strong><br /><br />
        <strong>{t('refund.noRefund')}</strong>
      </div>

      <h3 className="policy-heading">{t('refund.howToTitle')}</h3>
      <p className="section-body">{t('refund.howToText')}</p>

      <h3 className="policy-heading">{t('refund.cancellationsTitle')}</h3>
      <p className="section-body">{t('refund.cancellationsText')}</p>

      <h3 className="policy-heading">{t('refund.contactTitle')}</h3>
      <p className="section-body">{t('refund.contactText')}</p>
      <div className="section-callout">
        <strong>{t('refund.contactName')}</strong><br />
        Email: <a href={`mailto:${t('refund.contactEmail')}`} style={{ color: '#c8a2ff' }}>{t('refund.contactEmail')}</a>
      </div>
    </section>
  )
}
