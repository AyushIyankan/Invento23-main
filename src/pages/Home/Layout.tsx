import { Outlet } from 'react-router-dom'

import Footer from '../../components/Footer'
import Nav from '../../components/Navigation'

export function Layout() {
    return (
        <div className="layout layout__landing">
            <Nav
                background="#000"
                progressLineColor=""
                className="landing-nav"
                type="landing"
            />
            <Outlet />
            <div className="main-wrapper grid">
                <Footer background="#101010" className="footer-landing" />
            </div>
        </div>
    )
}
