import { useCallback, useEffect, useId, useState } from 'react'
import fitnasticLogo from '../assets/Fitnastic logo.svg'
import { getSiteNav } from '../lib/siteNav'
import { SiteNavLinks } from './SiteNavLinks'

const nav = getSiteNav()

const MOBILE_NAV_QUERY = '(max-width: 720px)'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navId = useId()

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      return
    }
    const mq = window.matchMedia(MOBILE_NAV_QUERY)
    const onResize = () => {
      if (!mq.matches) {
        setMenuOpen(false)
      }
    }
    mq.addEventListener('change', onResize)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      mq.removeEventListener('change', onResize)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  return (
    <header className={`hi-hero${menuOpen ? ' hi-hero--nav-open' : ''}`}>
      <img
        className="hi-hero__photo"
        src="/assets/hero-bg.png"
        alt=""
        decoding="async"
        fetchPriority="high"
        loading="eager"
      />
      <div className="hi-hero__grain" aria-hidden />
      <div className="hi-hero__overlay" aria-hidden />
      <div className="hi-hero__inner">
        <div className={`hi-navbar${menuOpen ? ' hi-navbar--menu-open' : ''}`}>
          <div className="hi-navbar__shell">
            <a className="hi-logo" href={nav.home} aria-label="Supershyft home">
              <img src={fitnasticLogo} alt="" width={73} height={72} />
            </a>
            <button
              type="button"
              className="hi-nav-toggle"
              aria-expanded={menuOpen}
              aria-controls={navId}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="hi-nav-toggle__icon" aria-hidden>
                <span className="hi-nav-toggle__bar" />
                <span className="hi-nav-toggle__bar" />
                <span className="hi-nav-toggle__bar" />
              </span>
              <span className="hi-nav-toggle__label">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            </button>
            <SiteNavLinks id={navId} ariaLabel="Primary" onLinkClick={closeMenu} />
          </div>
        </div>
        <div className="hi-hero__copy">
          <h1 className="hi-hero__title">Health Insights</h1>
          <p className="hi-hero__subtitle">
            Insights backed by blood data &amp; bio-AI. Evidence-based guidance for metabolic health,
            longevity, and personalized wellness.
          </p>
        </div>
      </div>
    </header>
  )
}
