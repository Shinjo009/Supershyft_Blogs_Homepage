import { useCallback, useEffect, useId, useState } from 'react'
import fitnasticLogo from '../assets/Fitnastic logo.svg'
import { HERO_ILLUSTRATION_ASPECT, HERO_SLIDES, type HeroTitleLine } from '../data/heroSlides'
import { useHeroCarousel } from '../hooks/useHeroCarousel'
import { getSiteNav } from '../lib/siteNav'
import { SiteNavLinks } from './SiteNavLinks'

const nav = getSiteNav()

const MOBILE_NAV_QUERY = '(max-width: 720px)'

const HERO_TOPICS = [
  'Nutrition',
  'Blood Health',
  'Longevity',
  'Metabolic Health',
  'Sleep',
  'Preventive Care',
] as const

const HERO_SUBTITLE =
  'Explore evidence-based insights on nutrition, blood health, longevity, sleep, and everyday wellness.'

function HeroTitle({ lines }: { lines: HeroTitleLine[] }) {
  return (
    <h1 className="hi-hero__title">
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className={`hi-hero__title-line${
            line.parts.length === 1 && line.parts[0]?.bold ? ' hi-hero__title-line--bold' : ''
          }`}
        >
          {line.parts.map((part, partIndex) =>
            part.bold ? (
              <span key={partIndex} className="hi-hero__title-line--bold">
                {part.text}
              </span>
            ) : (
              <span key={partIndex}>{part.text}</span>
            ),
          )}
        </span>
      ))}
    </h1>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { activeSlide, setActiveSlide } = useHeroCarousel()
  const navId = useId()
  const slideCount = HERO_SLIDES.length
  const slideWidthPercent = 100 / slideCount
  const trackStyle = {
    width: `${slideCount * 100}%`,
    transform: `translate3d(-${activeSlide * slideWidthPercent}%, 0, 0)`,
  }
  const panelStyle = { width: `${slideWidthPercent}%` }

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
      <div className="hi-hero__scene" aria-hidden>
        <img
          className="hi-hero__photo"
          src={`${import.meta.env.BASE_URL}assets/blogs-hero-bg.png`}
          alt=""
          decoding="async"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      <div className="hi-hero__illustration-carousel">
        <div className="hi-hero__illustration-track" style={trackStyle}>
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="hi-hero__illustration-panel"
              style={panelStyle}
              aria-hidden={index !== activeSlide}
            >
              <div className="hi-hero__illustration-wrap">
                <img
                  className="hi-hero__illustration"
                  src={slide.illustrationSrc}
                  alt=""
                  decoding="async"
                  loading="eager"
                  style={{ aspectRatio: HERO_ILLUSTRATION_ASPECT }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hi-hero__overlay" aria-hidden />

      <div className="hi-hero__frame">
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
                onClick={() => setMenuOpen((open) => !open)}
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

          <div className="hi-hero__copy" aria-live="polite">
            <div className="hi-hero__copy-main">
              <p className="hi-hero__eyebrow">HEALTH INSIGHTS</p>

              <div className="hi-hero__title-carousel">
                <div
                  className="hi-hero__title-track"
                  style={trackStyle}
                >
                  {HERO_SLIDES.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="hi-hero__title-panel"
                      style={panelStyle}
                      aria-hidden={index !== activeSlide}
                    >
                      <HeroTitle lines={slide.titleLines} />
                    </div>
                  ))}
                </div>
              </div>

              <p className="hi-hero__subtitle">{HERO_SUBTITLE}</p>
            </div>

            <ul className="hi-hero__topics" aria-label="Topics">
              {HERO_TOPICS.map((topic) => (
                <li key={topic}>
                  <span className="hi-hero__topic">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hi-hero__dots" role="tablist" aria-label="Hero slides">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={`hi-hero__dot${index === activeSlide ? ' hi-hero__dot--active' : ''}`}
              aria-selected={index === activeSlide}
              aria-label={`Slide ${index + 1}: ${slide.id}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </header>
  )
}
