import { Outlet } from 'react-router-dom'

import Nav from '../../components/Navigation'

export function Layout() {
    return (
        <div className="layout">
            <Nav />
            <Outlet />
        </div>
    )
}
