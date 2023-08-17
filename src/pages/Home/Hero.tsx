import inventoPromoWebm from '../../assets/video/invento_23_promo.webm'
import inventoPromoDesktopMp4 from '../../assets/video/invento_23_promo.mp4'
import inventoPromoMobileMp4 from '../../assets/video/invento_23_promo_mobile.mp4'
import topRightArrow from '../../assets/svg/right-top-arrow.svg'
import mute from '../../assets/svg/mute.svg'
import unmute from '../../assets/svg/unmute.svg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Hero() {
    const [muted, setMuted] = useState(true)

    return (
        <section className="hero panel">
            <div className="video">
                <video loop autoPlay muted={muted} style={{ objectFit: 'cover' }}>
                    <source src={inventoPromoWebm} type="video/webm" />
                    <source src={inventoPromoDesktopMp4} type="video/mp4" />
                </video>
            </div>
            <div className="btn-div">
                <button
                    className="mute-btn dim"
                    onClick={() => setMuted((prev) => !prev)}
                >
                    <img src={muted ? mute : unmute} alt={muted ? 'unmute' : 'mute'} />
                </button>
            </div>
            <div className="landing-hero text-white grid flow main-wrapper">
                <div className="heading t-right pt-5 line-1 dim">
                    <h1 className="ff-gothic fw-400 uppercase fs-750">Invento ‘23</h1>
                    <h2 className="uppercase ff-gothic fs-700">is here</h2>
                    <Link className="register flex uppercase ff-gothic" to="/">
                        register now{' '}
                        <span>
                            <img src={topRightArrow} alt="top-right-arrow" />
                        </span>
                    </Link>
                </div>

                <div className="wrap-large-links ff-gothic fw-400 dim">
                    <a className="uppercase d-b text-decoration-none">events</a>
                    <a className="uppercase d-b text-decoration-none">Natya</a>
                    <a className="uppercase d-b text-decoration-none">saptha</a>
                    <a className="uppercase d-b text-decoration-none">taksathi</a>
                    <a className="uppercase d-b text-decoration-none">proshow</a>
                </div>
            </div>
        </section>
    )
}
