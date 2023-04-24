import { NavLink } from 'react-router-dom'

import { ReactComponent as SearchLogo } from '../../assets/svg/ic_round-search.svg'
import { ReactComponent as ExternalLinkIcon } from '../../assets/svg/icon_external-link.svg'
import { ReactComponent as Logo } from '../../assets/svg/invento-logo-red.svg'
import { ReactComponent as Menu } from '../../assets/svg/menu.svg'
import { useToggle } from '../../hooks'

export default function Nav({ background }: { background: string }) {
    const [navState, toggleNavState] = useToggle(false)

    return (
        <header
            className="header--main bg-dark-purple flex"
            style={{ '--navbar-bg': background } as React.CSSProperties}
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
                        <NavLink className={`navlink flex`} to={'/saptha'}>
                            tickets <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/saptha'}>
                            home <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/saptha'}>
                            events <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/saptha'}>
                            saptha <ExternalLinkIcon />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`navlink flex`} to={'/saptha'}>
                            link <ExternalLinkIcon />
                        </NavLink>
                    </li>
                </ul>
                <div className="nav--footer">
                    <p className="fw-400 fs-800">
                        invento
                        <span className="d-b fs-150">gec palakad</span>
                    </p>
                </div>
            </nav>
        </header>
    )
}
