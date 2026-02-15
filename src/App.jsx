import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Philosophy from './pages/Philosophy'

import Courses from './pages/Courses'
import Seminars from './pages/Seminars'
import Training from './pages/Training'
import Research from './pages/Research'
import Community from './pages/Community'
import Connect from './pages/Connect'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/philosophy" element={<Philosophy />} />

            <Route path="/courses" element={<Courses />} />
            <Route path="/seminars" element={<Seminars />} />
            <Route path="/training" element={<Training />} />
            <Route path="/research" element={<Research />} />
            <Route path="/community" element={<Community />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  )
}
