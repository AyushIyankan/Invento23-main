import { ImgWithFallback } from '../components/ImgWithFallback'
import Nav from '../components/Navigation'
import { BACKGROUNDS } from '../constants'

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
                    <ImgWithFallback
                        imgDescription="page not found"
                        src="/static/404.jpg"
                    />
                </div>
            </section>
        </div>
    )
}
