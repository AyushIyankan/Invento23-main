/* eslint-disable jsx-a11y/media-has-caption */
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import mute from '../../assets/svg/mute.svg'
import topRightArrow from '../../assets/svg/right-top-arrow.svg'
import unmute from '../../assets/svg/unmute.svg'
import { isMedScreen } from '../../hooks'

export function Hero() {
    const [muted, setMuted] = useState(true)
    const isNotLargeEnough = isMedScreen()
    const vidRef = useRef<HTMLVideoElement>(null)

    const isInView = useInView(vidRef)

    useEffect(() => {
        if (vidRef.current && isInView) {
            vidRef.current.play()
        }

        if (vidRef.current && !isInView) {
            vidRef.current.pause()
            vidRef.current.currentTime = 0
        }
    }, [isInView])

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                vidRef.current?.pause()
            } else if (document.visibilityState === 'visible' && vidRef.current) {
                vidRef.current?.play()
                setMuted(true)
                vidRef.current.currentTime = 0
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    // useEffect(() => {
    //     if (isSmallScreen) {
    //         vidRef.current?.load()
    //     }
    // }, [isSmallScreen])

    return (
        <section className="hero panel mh-full">
            <div className="video">
                <div className="layer"></div>
                <video
                    key={isNotLargeEnough ? 'mobile' : 'desktop'}
                    ref={vidRef}
                    className={isNotLargeEnough ? 'vid-mobile' : 'vid-desktop'}
                    autoPlay
                    loop
                    muted={muted}
                    poster={
                        isNotLargeEnough
                            ? '/static/video/vid_poster_sm.jpg'
                            : '/static/video/vid_poster.jpg'
                    }
                    disablePictureInPicture
                    playsInline
                    preload="none"
                >
                    {isNotLargeEnough ? (
                        <>
                            <source
                                src="/static/video/invento_23_promo_mobile.webm"
                                type="video/webm"
                            />
                            <source
                                src="static/video/invento_23_promo_mobile.mp4"
                                type="video/mp4"
                            />
                        </>
                    ) : (
                        <>
                            <source
                                src="/static/video/invento_23_promo.webm"
                                type="video/webm"
                            />
                            <source
                                src="/static/video/invento_23_promo.mp4"
                                type="video/mp4"
                            />
                        </>
                    )}
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
                    <Link className="register flex uppercase ff-gothic" to="/register">
                        register now{' '}
                        <span>
                            <img src={topRightArrow} alt="top-right-arrow" />
                        </span>
                    </Link>
                </div>

                <div className="wrap-large-links ff-gothic fw-400 dim">
                    <Link to={'/events'} className="uppercase d-b text-decoration-none">
                        events
                    </Link>
                    <Link to={'/events'} className="uppercase d-b text-decoration-none">
                        Natya
                    </Link>
                    <Link to={'/saptha'} className="uppercase d-b text-decoration-none">
                        saptha
                    </Link>
                    <Link to={'/events'} className="uppercase d-b text-decoration-none">
                        taksathi
                    </Link>
                    <Link to={'/events'} className="uppercase d-b text-decoration-none">
                        proshow
                    </Link>
                </div>
            </div>
        </section>
    )
}
