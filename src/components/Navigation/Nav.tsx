import { ReactComponent as SearchLogo } from '../../assets/svg/ic_round-search.svg'
import { ReactComponent as Logo } from '../../assets/svg/invento-logo-red.svg'
import { ReactComponent as Menu } from '../../assets/svg/menu.svg'
import { useToggle } from '../../hooks'

export default function Nav() {
    const [navState, toggleNavState] = useToggle(false)

    return (
        <header className="header--main bg-dark-purple flex">
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
        </header>
    )
}
