import NotFoundImg from '../assets/images/compressed/404.jpg'
import Footer from '../components/Footer'
import Nav from '../components/Navigation'
import { BACKGROUNDS } from '../constants'
import { webpLoader } from '../utils'

export function NotFound() {
    return (
        <div className="layout">
            <Nav
                background={BACKGROUNDS.clrDarkBlue}
                progressLineColor={BACKGROUNDS.clrDarkRed600}
            />
            <section className="NotFound mh-full grid grid-3-col">
                <div className="wrap-NotFoundContent">
                    <h2 className="text-white ff-serif fw-400 t-center">
                        <span className="inner d-b">Looks like you got lost</span>
                        Page Not Found!
                    </h2>
                    <picture>
                        <source srcSet={webpLoader(NotFoundImg)} />
                        <source srcSet={NotFoundImg} />
                        <img src={NotFoundImg} alt="page not found" />
                    </picture>
                </div>
            </section>
            <Footer background={BACKGROUNDS.GradientDarkPurple} />
        </div>
    )
}
