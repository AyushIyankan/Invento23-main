import { ImgWithFallback } from '../../components/ImgWithFallback'

export function Hero() {
    return (
        <div className="landing-hero mh-full text-white grid">
            <div className="heading__container t3d-container">
                <h1 className="sr-only">Invento&apos;23</h1>
                <ImgWithFallback
                    imgDescription="invento'23"
                    src="/static/landing/hero__title.jpg"
                />
                <h2 className="uppercase ff-gothic text-turquoise t-center">
                    #inventounleashed
                </h2>
            </div>
            <div className="hero-bg"></div>

            <div className="wrap-large-links ff-gothic fw-400">
                <p className="uppercase">Natya</p>
                <p className="uppercase">saptha</p>
                <p className="uppercase">taksthi</p>
                <p className="uppercase">proshow</p>
            </div>

            <div className="wrap-small-links ff-montserrat fw-500 uppercase flex">
                <div>
                    <p>workshops</p>
                    <p>expos</p>
                    <p>competitions</p>
                </div>
            </div>
        </div>
    )
}
