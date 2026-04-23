import fitnasticLogo from '../assets/Fitnastic logo.svg'

const nav = {
  ourTech: import.meta.env.VITE_NAV_OUR_TECH?.trim() || '#',
  about: import.meta.env.VITE_NAV_ABOUT?.trim() || '#',
  contact: import.meta.env.VITE_NAV_CONTACT?.trim() || '#',
}

export function SiteHeader() {
  return (
    <header className="hi-hero">
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
        <div className="hi-navbar">
          <div className="hi-navbar__shell">
            <a className="hi-logo" href="/" aria-label="Health Insights home">
              <img src={fitnasticLogo} alt="" width={73} height={72} />
            </a>
            <nav className="hi-nav" aria-label="Primary">
              <a className="hi-nav__link hi-nav__link--active" href="/">
                Home
              </a>
              <a className="hi-nav__link" href={nav.ourTech}>
                Our Tech
              </a>
              <a className="hi-nav__link" href={nav.about}>
                About Us
              </a>
              <a className="hi-nav__link" href={nav.contact}>
                Contact Us
              </a>
            </nav>
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
