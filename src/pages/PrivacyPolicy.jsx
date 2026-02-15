import { useLanguage } from '../i18n/LanguageContext'

export default function PrivacyPolicy() {
  const { t } = useLanguage()

  return (
    <section className="section page-section visible">
      <div className="section-number">{t('privacy.number')}</div>
      <h2 className="section-title">{t('privacy.title')}</h2>
      <p className="section-subtitle">{t('privacy.lastUpdated')}</p>

      <p className="section-body">{t('privacy.intro')}</p>

      <h3 className="policy-heading">{t('privacy.infoCollectTitle')}</h3>
      <p className="section-body">
        <strong>{t('privacy.seminarReg')}</strong> {t('privacy.seminarRegText')}
      </p>
      <p className="section-body" style={{ marginTop: '0.5rem' }}>
        <strong>{t('privacy.trainingReg')}</strong> {t('privacy.trainingRegText')}
      </p>
      <p className="section-body" style={{ marginTop: '0.5rem' }}>
        <strong>{t('privacy.paymentData')}</strong> {t('privacy.paymentDataText')}
      </p>
      <p className="section-body" style={{ marginTop: '0.5rem' }}>
        <strong>{t('privacy.usageData')}</strong> {t('privacy.usageDataText')}
      </p>

      <h3 className="policy-heading">{t('privacy.howWeUseTitle')}</h3>
      <ul className="policy-list">
        {t('privacy.howWeUseItems').map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3 className="policy-heading">{t('privacy.cookiesTitle')}</h3>
      <p className="section-body">{t('privacy.cookiesText')}</p>

      <h3 className="policy-heading">{t('privacy.thirdPartyTitle')}</h3>
      <p className="section-body">{t('privacy.thirdPartyIntro')}</p>
      <ul className="policy-list">
        {t('privacy.thirdPartyItems').map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p className="section-body" style={{ marginTop: '0.5rem' }}>
        {t('privacy.thirdPartyOutro')}
      </p>

      <h3 className="policy-heading">{t('privacy.dataRetentionTitle')}</h3>
      <p className="section-body">{t('privacy.dataRetentionText')}</p>

      <h3 className="policy-heading">{t('privacy.yourRightsTitle')}</h3>
      <p className="section-body">{t('privacy.yourRightsIntro')}</p>
      <ul className="policy-list">
        {t('privacy.yourRightsItems').map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3 className="policy-heading">{t('privacy.contactTitle')}</h3>
      <p className="section-body">{t('privacy.contactText')}</p>
      <div className="section-callout">
        <strong>{t('privacy.contactName')}</strong><br />
        Email: <a href={`mailto:${t('privacy.contactEmail')}`} style={{ color: '#c8a2ff' }}>{t('privacy.contactEmail')}</a>
      </div>
    </section>
  )
}
