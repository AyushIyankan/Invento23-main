import { m, MotionStyle, useScroll } from 'framer-motion'
import { CSSProperties, useRef } from 'react'
import { Link } from 'react-router-dom'

import { EventType } from '../../api/schema'
import Card from './Card'

function CardGroup({ event }: { event: EventType }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['0 1', '1.33 1'],
    })

    return (
        <m.div
            ref={ref}
            className="card-link-wrap"
            style={
                {
                    '--card-scale': scrollYProgress,
                    '--card-opacity': scrollYProgress,
                    // scale: scrollYProgress,
                } as MotionStyle
            }
        >
            <Link
                to={`/events/${event._id}`}
                key={`event-link-${event._id}`}
                className="text-decoration-none card-link"
            >
                <Card
                    key={`event-${event._id}`}
                    title={event.name}
                    bgUrl={event?.photo?.secure_url ?? '/static/natya.jpg'}
                    imgId={event?.photo?.id ?? ''}
                    className="card--groupevent"
                />
            </Link>
        </m.div>
    )
}

export default CardGroup
