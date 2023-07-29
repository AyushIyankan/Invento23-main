import { Link } from 'react-router-dom'

import { EventType } from '../../api/schema'
import Card from './Card'

function CardGroup({ event }: { event: EventType }) {
    return (
        <Link to={`/events/${event._id}`} key={`event-link-${event._id}`}>
            <Card
                key={`event-${event._id}`}
                title={event.name}
                bgUrl={event.photo.secure_url}
                className="card--groupevent"
            />
        </Link>
    )
}

export default CardGroup
