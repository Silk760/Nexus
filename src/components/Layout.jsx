import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

const NAV_KEYS = [
  { key: 'philosophy', path: '/philosophy' },
  { key: 'courses', path: '/courses' },
  { key: 'seminars', path: '/seminars' },
  { key: 'training', path: '/training' },
  { key: 'research', path: '/research' },
  { key: 'community', path: '/community' },
  { key: 'connect', path: '/connect' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggleLang, t } = useLanguage()

  function handleNavClick() {
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="nav">
        <Link className="nav-logo" to="/" onClick={handleNavClick}>
          <img src="/logo.png" alt="NEXUS" className="nav-logo-img" />
          <div className="nav-logo-text">
            <span className="nav-logo-name">NEXUS</span>
            <span className="nav-logo-sub">{t('nav.logoSub')}</span>
          </div>
        </Link>
        <button
          className="lang-toggle"
          onClick={toggleLang}
          aria-label="Toggle language"
        >
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_KEYS.map(({ key, path }) => (
            <Link
              key={path}
              className={`nav-link${location.pathname === path ? ' active' : ''}`}
              to={path}
              onClick={handleNavClick}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </div>
      </nav>

      <main className="page-content">
        {children}
      </main>

      <footer className="footer">
        <p>{t('footer.copyright')}</p>
        <p>{t('footer.tagline')}</p>
        <p className="footer-policy-links">
          <Link to="/privacy">{t('footer.privacy')}</Link>
          <span>&middot;</span>
          <Link to="/refund">{t('footer.refund')}</Link>
        </p>
      </footer>
    </>
  )
}
