import { Outlet } from 'react-router-dom'

import Footer from '../../components/Footer'
import Nav from '../../components/Navigation'

export function Layout() {
    return (
        <div className="layout">
            <Nav />
            <Outlet />
            <Footer />
        </div>
    )
}
