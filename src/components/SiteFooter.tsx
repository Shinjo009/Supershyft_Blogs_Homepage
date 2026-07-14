import footerLine from '../assets/Line 5.svg'
import footerLogo from '../assets/Fitnastic_logo.svg'
import {
  FooterInstagramIcon,
  FooterLinkedinIcon,
  FooterSocialGradientDefs,
} from './FooterSocialIcons'
import { getSiteNav, getSocialLinks } from '../lib/siteNav'
import { SiteNavLinks } from './SiteNavLinks'

export function SiteFooter() {
  const nav = getSiteNav()
  const social = getSocialLinks()

  return (
    <footer className="hi-footer">
      <img
        className="hi-footer__photo"
        src="/assets/hero-bg.png"
        alt=""
        decoding="async"
        loading="lazy"
      />
      <div className="hi-footer__grain" aria-hidden />
      <div className="hi-footer__overlay" aria-hidden />
      <div className="hi-footer__shell">
        <div className="hi-footer__top">
          <a className="hi-footer__logo" href={nav.home} aria-label="Supershyft home">
            <img
              src={footerLogo}
              alt="Fitnastic — Personalising healthcare"
              width={176}
              height={62}
              decoding="async"
              loading="lazy"
            />
          </a>
          <SiteNavLinks ariaLabel="Footer" className="hi-nav hi-nav--footer" />
          <div className="hi-footer__social">
            <FooterSocialGradientDefs />
            <span className="hi-footer__follow">Follow us</span>
            <div className="hi-footer__icons">
              <a
                className="hi-footer__icon-link hi-footer__icon-link--instagram"
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FooterInstagramIcon />
              </a>
              <a
                className="hi-footer__icon-link hi-footer__icon-link--linkedin"
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FooterLinkedinIcon />
              </a>
            </div>
          </div>
        </div>
        <img className="hi-footer__rule" src={footerLine} alt="" width={1355} height={1} decoding="async" />
        <p className="hi-footer__copy">© 2026 Supershyft. All rights reserved.</p>
      </div>
    </footer>
  )
}
