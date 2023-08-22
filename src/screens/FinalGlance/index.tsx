import Footer from '../../components/Footer/Footer'
import Nav from '../../components/Navigation'
import FinalGlance from './FinalGlance'

export function FinalGlanceLayout() {
    return (
        <div>
            <Nav background="hsl(266, 12%, 12%)" progressLineColor="" />
            <FinalGlance />
            <Footer background={''} />
        </div>
    )
}
