import { m } from 'framer-motion'
import { CSSProperties, forwardRef, Ref } from 'react'

import { ReactComponent as IconArrow } from '../../assets/svg/Arrow.svg'
import useElementDimension from '../../hooks/useElementDimensions'
import Button from '../Button'
import { ImgWithFallback } from '../ImgWithFallback'
interface ECardProps {
    imgSrc: string
    title: string
    date: string
    borderColor?: string
    kind?: 'comingSoon'
    textColor?: string
}

export const EventCard = forwardRef<HTMLDivElement, ECardProps>(function Ecard(
    { date, imgSrc, title, borderColor, kind, textColor = '#fff' }: ECardProps,
    ref: Ref<HTMLDivElement>,
) {
    const [setRef, dimensions] = useElementDimension()

    const cardStyle = {
        '--card-color': borderColor ?? '#126fd5',
        '--stroke-color': borderColor ?? '#126fd5',
        '--btnTextColor': textColor ?? '#126fd5',
        '--stroke-width': '1.5px',
        '--transformYby': dimensions.height ? `${dimensions.height / 2}px` : '0px',
    } as CSSProperties

    return (
        <div className="e-card" style={cardStyle} ref={ref}>
            <div
                className={`main-content ${kind === 'comingSoon' ? 'comingSoon' : ''}`}
                ref={setRef}
            >
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
                        data-content={kind === 'comingSoon' ? 'Coming soon' : title}
                    >
                        {/* {title === 'six eight' ? (
                            <>
                                six <br /> eight
                            </>
                        ) : (
                            title
                        )} */}
                        {kind === 'comingSoon' ? 'Coming soon' : title}
                    </h4>
                </div>
                <div className="wrap-date bg-white">
                    <div className="marquee">
                        <p className="marquee__content ff-gothic fw-400 uppercase text-black">
                            · {date} ·
                        </p>
                        <p
                            aria-hidden
                            className="marquee__content ff-gothic fw-400 uppercase text-black"
                        >
                            · {date} ·
                        </p>
                        <p
                            aria-hidden
                            className="marquee__content ff-gothic fw-400 uppercase text-black "
                        >
                            · {date} ·
                        </p>
                    </div>
                </div>
            </div>

            <Button
                type="internalUrl"
                to={kind === 'comingSoon' ? '/#' : '/register'}
                classNames={`btn btn--ecard text-white ff-montserrat flex ${
                    kind === 'comingSoon' ? 'btn--ecard-soon' : ''
                }`}
            >
                {kind === 'comingSoon' ? 'stay tuned' : 'Register'}
                <span aria-hidden>
                    <IconArrow />
                </span>
            </Button>
        </div>
    )
})

export const MEventCard = m(EventCard)
