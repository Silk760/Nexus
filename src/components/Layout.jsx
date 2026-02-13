import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Philosophy', path: '/philosophy' },
  { label: 'Curriculum', path: '/curriculum' },
  { label: 'Courses', path: '/courses' },
  { label: 'Seminars', path: '/seminars' },
  { label: 'Training', path: '/training' },
  { label: 'Research', path: '/research' },
  { label: 'Community', path: '/community' },
  { label: 'Connect', path: '/connect' },
]

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <>
      <nav className="nav">
        <Link className="nav-logo" to="/">
          <img src={import.meta.env.BASE_URL + 'logo.png'} alt="NEXUS" className="nav-logo-img" />
          <div className="nav-logo-text">
            <span className="nav-logo-name">NEXUS</span>
            <span className="nav-logo-sub">Applied Intelligence Institute</span>
          </div>
        </Link>
        <div className="nav-links">
          {NAV_ITEMS.map(({ label, path }) => (
            <Link
              key={path}
              className={`nav-link${location.pathname === path ? ' active' : ''}`}
              to={path}
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
