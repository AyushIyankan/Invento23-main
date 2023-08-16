import { ImgWithFallback } from '../components/ImgWithFallback'
import Nav from '../components/Navigation'
import { BACKGROUNDS } from '../constants'

export function Soon() {
    return (
        <div className="layout">
            <Nav
                background={BACKGROUNDS.clrDark}
                progressLineColor={BACKGROUNDS.clrDarkRed600}
            />
            <section className="NotFound mh-full grid grid-3-col">
                <div className="wrap-NotFoundContent">
                    <h2 className="text-white ff-serif fw-400 t-center">
                        Registerations will open soon. Stay tuned!
                    </h2>
                </div>
            </section>
        </div>
    )
}
