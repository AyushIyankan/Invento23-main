import { Outlet } from 'react-router-dom'

import Footer from '../../components/Footer'
import Nav from '../../components/Navigation'
import { BACKGROUNDS } from '../../constants'

export function Layout() {
    return (
        <div className="layout">
            <Nav
                background={BACKGROUNDS.clrDarkRed600}
                progressLineColor={BACKGROUNDS.clrDarkRed}
            />
            <Outlet />
            <Footer background={BACKGROUNDS.GradientDarkTeal} />
        </div>
    )
}
