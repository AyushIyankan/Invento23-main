import Card from '../../components/Card'
import { GROUPEVENTS } from '../saptha/data'

export function Expo() {
    const cards = GROUPEVENTS.map((d) => {
        return (
            <Card
                key={`event-${d.id}`}
                title={d.title}
                bgUrl={d.bgUri}
                className="card--groupevent"
            />
        )
    })

    return (
        <section className="saptha__groupevents bg__blur--events effect__wrap">
            <div className="panel--fixed">
                <h2 className="header__bg uppercase text-grey flex flex-center">Expo</h2>
            </div>
            <div className="saptha__groupevents__cards grid panel grid-z pb-sm">
                {cards}
            </div>
        </section>
    )
}
