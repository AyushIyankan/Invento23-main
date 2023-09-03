import { CSSProperties, useState } from 'react'
import { toast } from 'react-toastify'
import isEmail from 'validator/lib/isEmail'

import { ReactComponent as LinkedInLogo } from '../../assets/svg/carbon_logo-linkedin.svg'
import { ReactComponent as YoutubeLogo } from '../../assets/svg/carbon_logo-youtube.svg'
import { ReactComponent as FacebookLogo } from '../../assets/svg/ic_sharp-facebook.svg'
import { ReactComponent as InstagramLogo } from '../../assets/svg/ion_logo-instagram.svg'
import { useMediaQuery } from '../../hooks'
import { classUtil } from '../../utils'
import Button from '../Button'

interface IFooterProps extends React.HTMLAttributes<HTMLElement> {
    background: string
    theme?: 'light'
}

export default function Footer({ background, theme, ...delegated }: IFooterProps) {
    const { className, ...rest } = delegated

    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const validatedEmail = isEmail(e.target.value)

        if (!validatedEmail) {
            setIsEmailValid(false)
        } else {
            setEmail(e.target.value)
            setIsEmailValid(true)
        }
    }

    const handleSubscribe = () => {
        if (isEmailValid) {
            toast.success('Subscribed successfully!')
            setEmail('')
        } else {
            toast.error('Please enter a valid email')
        }
    }

    const isFooterFormAbove = useMediaQuery('(min-width: 75em)')

    return (
        <footer
            className={`footer ff-serif text-grey ${className ? className : ''}`}
            style={{ '--footer-gradient': background } as React.CSSProperties}
            data-theme={theme}
            {...rest}
        >
            <div className="footer__main flow">
                <h3 className="text-magenta fw-400">invento</h3>

                <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="email_newsletter" className="text-white fw-300 d-b">
                        Stay in the loop
                    </label>
                    <div className="input__container flex flex-col">
                        <input
                            id="email_newsletter"
                            className="footer__form--input"
                            type="email"
                            name="nf_email"
                            placeholder="Enter Your Email"
                            maxLength={50}
                            onChange={(e) => {
                                handleEmailChange(e)
                                setEmail(e.target.value)
                            }}
                            value={email}
                        />
                        <Button
                            type="submit"
                            className="btn btn--subscribe footer__form--button d-ib"
                            onClick={handleSubscribe}
                        >
                            <span>Subscribe</span>
                        </Button>
                    </div>
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
                </div>

                <nav
                    className="footer__aboutUs flow"
                    style={
                        {
                            // marginBottom: '3.75rem',
                            '--flow-space': '0.8rem',
                        } as CSSProperties
                    }
                >
                    <h4 className="text-white fw-400">About Us</h4>
                    <ul className="footer__navlist flex flex-col">
                        <li className="footer__nav--item">
                            <Button type="internalUrl" to="/about">
                                the team
                            </Button>
                        </li>
                    </ul>
                </nav>

                <nav className="footer__nav flow">
                    <h4 className="text-white fw-400">Useful links</h4>
                    <ul className="footer__navlist flex flex-col">
                        <li className="footer__nav--item">
                            <Button
                                type="internalUrl"
                                to="/events/64e9a31f0c402a82cdccd565"
                                classNames="footer__link"
                            >
                                Natya
                            </Button>
                        </li>
                        <li className="footer__nav--item">
                            <Button
                                type="internalUrl"
                                to="/saptha"
                                classNames="footer__link"
                            >
                                Saptha
                            </Button>
                        </li>
                        <li className="footer__nav--item">
                            <Button
                                type="internalUrl"
                                to="/proshow"
                                classNames="footer__link"
                            >
                                Pro-show
                            </Button>
                        </li>
                        <li className="footer__nav--item">
                            <Button
                                type="internalUrl"
                                to="/events/64e35d0bb921e9985ffb07f7"
                                classNames="footer__link"
                            >
                                Taksati
                            </Button>
                        </li>
                    </ul>
                </nav>

                <div>
                    <address className="footer__address text-white">
                        Government Engineering College, <br />
                        Sreekrishnapuram, <br />
                        Palakkad, Kerala -678633
                    </address>
                    <div className="footer__logoContainer flex mt-sm">
                        <a
                            href="https://youtube.com/@inventogecpalakkad2600"
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
            </div>
            {/* <div className="footer__sub flex flex-center"> */}
            <div
                className={classUtil(
                    { 'flex-center': !isFooterFormAbove },
                    'footer__sub',
                    'flex',
                )}
            >
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
