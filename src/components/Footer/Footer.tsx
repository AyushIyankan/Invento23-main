import { ReactComponent as LinkedInLogo } from '../../assets/svg/carbon_logo-linkedin.svg'
import { ReactComponent as YoutubeLogo } from '../../assets/svg/carbon_logo-youtube.svg'
import { ReactComponent as FacebookLogo } from '../../assets/svg/ic_sharp-facebook.svg'
import { ReactComponent as InstagramLogo } from '../../assets/svg/ion_logo-instagram.svg'

export default function Footer() {
    return (
        <footer className="footer ff-serif text-grey">
            <div className="footer__main flow">
                <h3 className="text-magenta fw-400">invento</h3>

                <form action="#" method="post" className="footer__form">
                    <label htmlFor="email_newsletter" className="text-white fw-300">
                        Stay in the loop
                    </label>
                    <input
                        id="email_newsletter"
                        className="footer__form--input"
                        type="email"
                        name="nf_email"
                        placeholder="Enter Your Email"
                        maxLength={50}
                    />
                    <button
                        type="submit"
                        className="btn btn--subscribe footer__form--button"
                    >
                        <span>Subscribe</span>
                    </button>
                </form>

                <div className="footer--contact flow">
                    <div className="flow">
                        <h4 className="text-white fw-300">Get in touch</h4>
                        <a
                            href="mailto:inventogec@gmail.com"
                            className="footer__link fw-300 mt-sm d-ib"
                        >
                            <span>inventogec@gmail.com</span>
                        </a>
                    </div>

                    <div>
                        <h4
                            className="text-white fw-400"
                            style={{ marginBottom: '3.75rem' }}
                        >
                            About Us
                        </h4>
                    </div>
                </div>

                <nav className="footer__nav flow">
                    <h4 className="text-white fw-400">Useful links</h4>
                    <ul className="footer__navlist flex flex-col">
                        <li className="footer__nav--item">
                            <a href="#natya" className="footer__link">
                                Natya
                            </a>
                        </li>
                        <li className="footer__nav--item">
                            <a href="#natya" className="footer__link">
                                Natya
                            </a>
                        </li>
                        <li className="footer__nav--item">
                            <a href="#natya" className="footer__link">
                                Natya
                            </a>
                        </li>
                        <li className="footer__nav--item">
                            <a href="#natya" className="footer__link">
                                Natya
                            </a>
                        </li>
                    </ul>
                </nav>
                <address className="footer__address text-white">
                    Government Engineering College, <br />
                    Sreekrishnapuram, <br />
                    Palakkad, Kerala -678633
                </address>

                <div className="footer__logoContainer flex">
                    <a
                        href="https://instagram.com/invento_gecpalakkad"
                        target="_blank"
                        className="footer__logo--link"
                        rel="noreferrer noopener"
                    >
                        <span>
                            <FacebookLogo className="footer__logo" />
                        </span>
                    </a>
                    <a
                        href="https://instagram.com/invento_gecpalakkad"
                        target="_blank"
                        className="footer__logo--link"
                        rel="noreferrer noopener "
                    >
                        <span>
                            <LinkedInLogo className="footer__logo" />
                        </span>
                    </a>
                    <a
                        href="https://instagram.com/invento_gecpalakkad"
                        target="_blank"
                        className="footer__logo--link"
                        rel="noreferrer noopener"
                    >
                        <span>
                            <YoutubeLogo className="footer__logo" />
                        </span>
                    </a>
                    <a
                        href="https://instagram.com/invento_gecpalakkad"
                        target="_blank"
                        className="footer__logo--link"
                        rel="noreferrer noopener "
                    >
                        <span>
                            <InstagramLogo className="footer__logo" />
                        </span>
                    </a>
                </div>
            </div>
            <div className="footer__sub flex flex-center">
                <a href="#terms" className="footer__link">
                    <span className="underline">Terms of Service</span>
                </a>
                <a href="#privacy" className="footer__link">
                    <span className="underline">Privacy Policy</span>
                </a>
            </div>
        </footer>
    )
}
