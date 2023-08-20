import { m } from 'framer-motion'
import { CSSProperties, forwardRef } from 'react'

import { ReactComponent as IconArrow } from '../../assets/svg/Arrow.svg'
import Button from '../Button'
import { ImgWithFallback } from '../ImgWithFallback'
interface ECardProps {
    imgSrc: string
    title: string
    date: string
    color?: string
}

export const EventCard = forwardRef<HTMLElement, ECardProps>(function Ecard(
    { date, imgSrc, title, color }: ECardProps,
    ref,
) {
    const cardStyle = {
        '--card-color': color ?? '#126fd5',
        '--stroke-color': color ?? '#126fd5',
        '--stroke-width': '1.5px',
    } as CSSProperties

    return (
        <div className="e-card" style={cardStyle}>
            <div className="main-content">
                <div className="image">
                    <ImgWithFallback
                        imgDescription={title}
                        src={imgSrc}
                        imgClass="img-greyscale"
                    />
                </div>
                <div className="wrap-header">
                    <h4
                        className="ff-gothic fw-400 uppercase stroked-text"
                        data-content={title}
                    >
                        {title}
                    </h4>
                </div>
                <div className="wrap-date bg-white">
                    <div className="marquee">
                        <p className="marquee__content ff-gothic fw-400 uppercase text-black">
                            {date}
                        </p>
                        <p
                            aria-hidden
                            className="marquee__content ff-gothic fw-400 uppercase text-black"
                        >
                            {date}
                        </p>
                        <p
                            aria-hidden
                            className="marquee__content ff-gothic fw-400 uppercase text-black "
                        >
                            {date}
                        </p>
                    </div>
                </div>
            </div>
            <Button
                type="internalUrl"
                to="/register"
                classNames="btn btn--ecard text-white ff-gothic flex"
            >
                Register
                <span aria-hidden>
                    <IconArrow />
                </span>
            </Button>
        </div>
    )
})

export const MEventCard = m(EventCard)
