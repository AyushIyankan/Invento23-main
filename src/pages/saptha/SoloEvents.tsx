import { Link } from 'react-router-dom'

import Card from '../../components/Card'
import { GROUPEVENTS } from './data'

export function SoloEvents() {
    const cards = GROUPEVENTS.map((d) => {
        return (
            <Link to={'/events/2'} key={`event-link-${d.id}`}>
                <Card
                    key={`event-${d.id}`}
                    title={d.title}
                    bgUrl={d.bgUri}
                    className="card--groupevent"
                />
            </Link>
        )
    })

    return (
        <section className="saptha__groupevents bg__blur--saptha effect__wrap">
            <div className="panel--fixed">
                <h2 className="header__bg uppercase text-grey flex flex-center">
                    solo events
                </h2>
            </div>
            <div className="saptha__groupevents__cards grid panel grid-z pb-sm">
                {cards}
            </div>
        </section>
    )
}
