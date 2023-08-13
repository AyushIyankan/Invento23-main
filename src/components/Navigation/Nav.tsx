import { motion, useScroll, useSpring } from 'framer-motion'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ReactComponent as RegisterArrow } from '../../assets/svg/Arrow.svg'
import { ReactComponent as SearchLogo } from '../../assets/svg/ic_round-search.svg'
import { ReactComponent as ExternalLinkIcon } from '../../assets/svg/icon_external-link.svg'
import { ReactComponent as Logo } from '../../assets/svg/invento-logo-red.svg'
import { ReactComponent as Menu } from '../../assets/svg/menu.svg'
import { useScrollPosition, useToggle } from '../../hooks'
import Button from '../Button'

interface INavBarProps extends React.HTMLAttributes<HTMLElement> {
    background: string
    progressLineColor: string
    theme?: 'light'
    type?: 'landing'
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
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })
    const { className, ...rest } = delegated
    return (
        <header
            className={`${className} header--main bg-dark-purple flex`}
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
            <nav
                className="main-nav grid bg-black ff-serif fw-300 text-white"
                data-expanded={navState}
            >
                <ul className="primary-navigation flow" id="primary-navigation">
                    <li>
                        <NavLink className={`navlink flex`} to={'/'}>
                            Home <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/about'}>
                            About us <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/events'}>
                            Events <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/saptha'}>
                            Saptha <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/register'}>
                            Register <ExternalLinkIcon />
                        </NavLink>
                    </li>
                </ul>
                <div className="nav--footer">
                    <p className="fw-400">
                        invento
                        <span className="d-b fs-150 fw-300">gec palakad</span>
                    </p>
                </div>
            </nav>
            {type !== 'landing' && (
                <motion.span
                    className="scroll-progress"
                    style={
                        {
                            // background: `linear-gradient(to right, ${progressLineColor} ${scrollPos}%, #eee ${scrollPos}%)`,
                            scaleX,
                            '--progress-line-color': progressLineColor,
                        } as React.CSSProperties
                    }
                ></motion.span>
            )}
        </header>
    )
}
