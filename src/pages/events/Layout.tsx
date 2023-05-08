import { Outlet } from 'react-router-dom'

import Footer from '../../components/Footer'
import Nav from '../../components/Navigation'
import { BACKGROUNDS } from '../../constants'

export function Layout() {
    return (
        <div className="layout">
            <Nav
                background={`${BACKGROUNDS.clrDarkTeal}`}
                progressLineColor={`${BACKGROUNDS.clrDarkBlue}`}
            />
            <Outlet />
            <Footer background={`${BACKGROUNDS.GradientDarkTeal}`} />
        </div>
    )
}
