import { Link } from 'react-router-dom'

import { EventType } from '../../api/schema'
import Card from './Card'

function CardGroup({ event }: { event: EventType }) {
    return (
        <Link
            to={`/events/${event._id}`}
            key={`event-link-${event._id}`}
            className="text-decoration-none card-link"
        >
            <Card
                key={`event-${event._id}`}
                title={event.name}
                bgUrl={event?.photo?.secure_url ?? '/static/natya.jpg'}
                className="card--groupevent"
            />
        </Link>
    )
}

export default CardGroup
