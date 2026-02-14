import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Philosophy', path: '/philosophy' },
  { label: 'Courses', path: '/courses' },
  { label: 'Seminars', path: '/seminars' },
  { label: 'Training', path: '/training' },
  { label: 'Research', path: '/research' },
  { label: 'Community', path: '/community' },
  { label: 'Connect', path: '/connect' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

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
            <span className="nav-logo-sub">Applied Intelligence Institute</span>
          </div>
        </Link>
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
          {NAV_ITEMS.map(({ label, path }) => (
            <Link
              key={path}
              className={`nav-link${location.pathname === path ? ' active' : ''}`}
              to={path}
              onClick={handleNavClick}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="page-content">
        {children}
      </main>

      <footer className="footer">
        <p>&copy; 2026 NEXUS Applied Intelligence Institute</p>
        <p>Algorithms &middot; Silicon &middot; Deployment &middot; Open Knowledge</p>
      </footer>
    </>
  )
}
