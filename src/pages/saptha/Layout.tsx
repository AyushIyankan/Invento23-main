import { Outlet } from 'react-router-dom'

import Footer from '../../components/Footer'
import Nav from '../../components/Navigation'
import { BACKGROUNDS } from '../../constants'

export function Layout() {
    return (
        <div className="layout">
            <Nav
                background={`${BACKGROUNDS.clrDarkPurple}`}
                progressLineColor={`${BACKGROUNDS.clrDarkRed}`}
            />
            <Outlet />
            <Footer background={`${BACKGROUNDS.GradientDarkPurple}`} />
        </div>
    )
}
