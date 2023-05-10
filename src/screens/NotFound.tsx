import NotFoundImg from '../assets/images/compressed/404.jpg'
import Footer from '../components/Footer'
import { ImgWithFallback } from '../components/ImgWithFallback'
import Nav from '../components/Navigation'
import { BACKGROUNDS } from '../constants'
import { webpLoader } from '../utils'

export function NotFound() {
    return (
        <div className="layout">
            <Nav
                background={BACKGROUNDS.clrDark}
                progressLineColor={BACKGROUNDS.clrDarkRed600}
            />
            <section className="NotFound mh-full grid grid-3-col">
                <div className="wrap-NotFoundContent">
                    <h2 className="text-white ff-serif fw-400 t-center">
                        <span className="inner d-b">Looks like you got lost</span>
                        Page Not Found!
                    </h2>
                    {/* <picture>
                        <source type="image/webp" srcSet={webpLoader(NotFoundImg)} />
                        <source type="image/jpeg" srcSet={NotFoundImg} />
                        <img src={webpLoader(NotFoundImg)} alt="page not found" />
                    </picture> */}
                    <ImgWithFallback
                        imgDescription="page not found"
                        src="/static/404.jpg"
                    />
                </div>
            </section>
            <Footer background={BACKGROUNDS.GradientDarkPurple} />
        </div>
    )
}
