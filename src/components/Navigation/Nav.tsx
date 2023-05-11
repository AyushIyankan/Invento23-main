import { NavLink } from 'react-router-dom'

import { ReactComponent as SearchLogo } from '../../assets/svg/ic_round-search.svg'
import { ReactComponent as ExternalLinkIcon } from '../../assets/svg/icon_external-link.svg'
import { ReactComponent as Logo } from '../../assets/svg/invento-logo-red.svg'
import { ReactComponent as Menu } from '../../assets/svg/menu.svg'
import { useScrollPosition, useToggle } from '../../hooks'

interface INavBarProps {
    background: string
    progressLineColor: string
    theme?: 'light'
}

export default function Nav({ background, progressLineColor, theme }: INavBarProps) {
    const [navState, toggleNavState] = useToggle(false)
    const scrollPos = useScrollPosition()
    return (
        <header
            className="header--main bg-dark-purple flex"
            style={{ '--navbar-bg': background } as React.CSSProperties}
            data-theme={theme}
        >
            <div className="logo--container flex">
                <Logo className="logo--invento" />
                <SearchLogo className="logo--search" />
            </div>
            <button
                onClick={toggleNavState}
                className={`mobile-nav-toggle ${navState ? 'opened' : ''}`}
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
                        <NavLink className={`navlink flex`} to={'/about'}>
                            About us <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/'}>
                            home <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/events'}>
                            events <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/saptha'}>
                            saptha <ExternalLinkIcon />
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
            {/* #ba2548 */}
            <span
                className="scroll-progress"
                style={
                    {
                        background: `linear-gradient(to right, ${progressLineColor} ${scrollPos}%, #eee ${scrollPos}%)`,
                    } as React.CSSProperties
                }
            ></span>
        </header>
    )
}
