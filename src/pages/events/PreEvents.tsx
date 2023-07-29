import CardGroup from '../../components/Card/CardGroup'
import { useSelectedQuery } from '../../hooks/useEventsQuery'

export function PreEvents() {
    const { data } = useSelectedQuery('preevents')
    const cards = data?.map((d) => {
        return <CardGroup event={d} key={d._id + d._v} />
    })

    return (
        <section className="saptha__groupevents bg__blur--events effect__wrap">
            <div className="panel--fixed">
                <h2 className="header__bg uppercase text-grey flex flex-center">
                    pre events
                </h2>
            </div>
            <div className="saptha__groupevents__cards grid panel grid-z pb-sm">
                {cards}
            </div>
        </section>
    )
}
