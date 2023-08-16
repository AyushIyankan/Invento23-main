import { Link } from 'react-router-dom'

import { ImgWithFallback } from '../../components/ImgWithFallback'

export function Hero() {
    return (
        <div className="landing-hero text-white grid">
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
                <Link to={`/saptha`} className="uppercase d-b text-decoration-none">
                    Natya
                </Link>
                <Link to={`/saptha`} className="uppercase d-b text-decoration-none">
                    saptha
                </Link>
                <a className="uppercase d-b text-decoration-none">taksati</a>
                <a className="uppercase d-b text-decoration-none">proshow</a>
            </div>

            <div className="wrap-small-links ff-montserrat fw-500 uppercase flex">
                <div>
                    <Link
                        to={`/events`}
                        className="d-b text-decoration-none hero-link-sm"
                    >
                        workshops
                    </Link>
                    <Link
                        to={`/events`}
                        className="d-b text-decoration-none hero-link-sm"
                    >
                        expos
                    </Link>
                    <Link
                        to={`/events`}
                        className="d-b text-decoration-none hero-link-sm"
                    >
                        competitions
                    </Link>
                </div>
            </div>
        </div>
    )
}
