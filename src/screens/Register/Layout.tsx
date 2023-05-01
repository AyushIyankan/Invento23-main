import { Outlet } from 'react-router-dom'

import Footer from '../../components/Footer'
import Nav from '../../components/Navigation'
import { BACKGROUNDS } from '../../constants'

function Layout() {
    return (
        <>
            <Nav
                background={`${BACKGROUNDS.clrWhite}`}
                progress={`${BACKGROUNDS.clrDarkRed}`}
            />
            <Outlet />
            <Footer
                background={`linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 20.1%)`}
            />
        </>
    )
}

export { Layout as FormLayout }
