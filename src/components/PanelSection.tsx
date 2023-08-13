import { EventType } from '../api/schema'
import CardGroup from './Card/CardGroup'

interface IPanelSectionProps {
    title: string
    items: EventType[]
    panelType: 'saptha' | 'events'
}

export default function PanelSection({ title, items, panelType }: IPanelSectionProps) {
    const cards =
        items.map((d) => {
            return <CardGroup event={d} key={d._id + d._v} />
        }) ?? []

    return (
        <section
            className={`saptha__groupevents bg__blur--${panelType} effect__wrap pb-sm`}
            style={
                {
                    '--panel-color':
                        panelType === 'saptha'
                            ? 'hsl(var(--clr-magenta) / 1)'
                            : 'hsl(var(--clr-blue) / 1)',
                } as React.CSSProperties
            }
        >
            <div className="panel--fixed">
                <h2 className="header__bg uppercase text-grey flex flex-center">
                    {title}
                </h2>
            </div>
            <div className="saptha__groupevents__cards grid panel grid-z pb-sm mh-full">
                {cards}
            </div>
        </section>
    )
}
