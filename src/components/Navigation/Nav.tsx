import { m, useScroll, useSpring, Variants } from 'framer-motion'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ReactComponent as RegisterArrow } from '../../assets/svg/Arrow.svg'
import { ReactComponent as SearchLogo } from '../../assets/svg/ic_round-search.svg'
import { ReactComponent as ExternalLinkIcon } from '../../assets/svg/icon_external-link.svg'
import { ReactComponent as Logo } from '../../assets/svg/invento-logo-red.svg'
import { ReactComponent as Menu } from '../../assets/svg/menu.svg'
import { useToggle } from '../../hooks'
import Button from '../Button'

interface INavBarProps extends React.HTMLAttributes<HTMLElement> {
    background: string
    progressLineColor: string
    theme?: 'light'
    type?: 'landing'
}

const navLinks = [
    {
        name: 'Home',
        to: '/',
    },
    {
        name: 'About',
        to: '/about',
    },
    {
        name: 'Events',
        to: '/events',
    },
    {
        name: 'Saptha',
        to: '/saptha',
    },
    {
        name: 'Register',
        to: '/register',
    },
]

const variants: Variants = {
    open: {
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
            staggerChildren: 0.07,
            delayChildren: 0.5,
        },
    },
    closed: {
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
}

export default function Nav({
    background,
    progressLineColor,
    theme,
    type,
    ...delegated
}: INavBarProps) {
    const [navState, toggleNavState] = useToggle(false)
    const { scrollYProgress } = useScroll()
    const location = useLocation()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })
    const { className, ...rest } = delegated
    return (
        <header
            className={`${className} header--main bg-dark-purple flex ${
                location.pathname === '/' ? 'dim' : ''
            }`}
            style={{ '--navbar-bg': background } as React.CSSProperties}
            data-theme={theme}
            {...rest}
        >
            <div className="logo--container flex">
                {type !== 'landing' && (
                    <div className="wrap-invento-logo">
                        {/* <div className="shadow"></div> */}
                        <Button type="internalUrl" to="/">
                            <Logo className="logo--invento" />
                        </Button>
                    </div>
                )}
                {type === 'landing' ? (
                    <Button
                        type="internalUrl"
                        to="/register"
                        classNames="link--register grid"
                    >
                        <span className="sr-only">Register</span>
                        <RegisterArrow className="register--logo" />
                    </Button>
                ) : (
                    <SearchLogo className="logo--search" />
                )}
            </div>
            {type === 'landing' && (
                <div className="wrap-invento-logo">
                    <div className="shadow"></div>
                    <Button type="internalUrl" to="/">
                        <span className="sr-only">Home</span>
                        <Logo className="logo--invento" />
                    </Button>
                </div>
            )}
            <button
                onClick={toggleNavState}
                className={`mobile-nav-toggle link--menu ${navState ? 'opened' : ''}`}
                aria-expanded={navState}
                aria-controls="primary-navigation"
            >
                <span className="sr-only">Menu</span>
                <Menu className="menu" />
            </button>
            <m.nav
                className="main-nav grid bg-black ff-serif fw-300 text-white"
                data-expanded={navState}
                // initial={false}
                initial="closed"
                animate={navState ? 'open' : 'closed'}
                // animate={'closed'}
            >
                <m.ul
                    variants={variants}
                    // initial="closed"
                    className="primary-navigation flow"
                    id="primary-navigation"
                >
                    {navLinks.map(({ name, to }, index) => (
                        <NavItem key={index} text={name} to={to} i={index} />
                    ))}
                </m.ul>
                <div className="nav--footer">
                    <p className="fw-400">
                        invento
                        <span className="d-b fs-150 fw-300">gec palakkad</span>
                    </p>
                </div>
            </m.nav>
            {type !== 'landing' && (
                <m.span
                    className="scroll-progress"
                    style={
                        {
                            // background: `linear-gradient(to right, ${progressLineColor} ${scrollPos}%, #eee ${scrollPos}%)`,
                            scaleX,
                            '--progress-line-color': progressLineColor,
                        } as React.CSSProperties
                    }
                ></m.span>
            )}
        </header>
    )
}

const linksVariant: Variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: ' 100%',
        opacity: 0,
        transition: {
            y: {
                stiffness: 1000,
            },
        },
    },
}

function NavItem({ to, text }: { to: string; text: string; i: number }) {
    return (
        <m.li
            variants={linksVariant}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            // initial="open"
            // animate="closed"
            style={{
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
            }}
        >
            <NavLink className={`navlink flex`} to={`${to}`}>
                {text} <ExternalLinkIcon />
            </NavLink>
        </m.li>
    )
}
