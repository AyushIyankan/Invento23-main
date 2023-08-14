import { useState } from 'react'
import { toast } from 'react-toastify'

import { eventCategories, EventType, eventTypes } from '../../api/schema'
import { Accordion } from '../../components/Accordion'
import { ItemCard } from '../../components/Card/Card'
import { ItemGroup } from '../../components/ItemGroup'
import { titleMap } from '../../constants'
import useEventsQuery from '../../hooks/useEventsQuery'
import { useStore } from '../../store'

const eventSubCategories: Record<
    EventType['eventType'] | string,
    EventType['category'][] | string[]
> = {
    proshow: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
    techfest: ['workshops', 'competitions', 'exhibitions', 'preevents', 'generalevents'],
    saptha: ['spotlight', 'group', 'solo', 'expo'],
    taksthi: ['spotlight', 'group', 'solo', 'expo'],
}

export function EventForm() {
    const { addItem, removeItem, items: bucket } = useStore((state) => state)
    const [, setSelectedKey] = useState<string[]>([])

    const events = useEventsQuery()

    if (events.isLoading) toast('Loading events...', { type: 'info', toastId: 'fefe' })

    const renderSubTypeEvents = (
        eventType: EventType['eventType'] | string,
        subType: EventType['category'] | string,
    ) => {
        const eventsOfTypeAndSubType = events.data?.events.filter((event) => {
            return event.eventType === eventType && event.category === subType
        })

        return eventsOfTypeAndSubType?.map((event) => (
            <ItemCard
                selected={bucket.some((e) => e._id === event._id)}
                onClick={() => setSelectedKey((state) => [...state, event._id])}
                title={event.name}
                date={event.date}
                fee={event.regFee}
                image={event.photo?.secure_url || '/static/natya.jpg'}
                key={event._id}
                actionType="togglable"
                actions={[
                    () => addItem({ ...event }),
                    () => {
                        removeItem(event._id)
                        setSelectedKey((state) =>
                            state.filter((key) => key !== event._id),
                        )
                    },
                ]}
            />
        ))
    }

    const groupedEvents = events.data?.events.reduce<
        Record<string, typeof events.data.events>
    >((acc, event) => {
        const day = event.date
        if (!acc[day as keyof typeof acc]) acc[day as keyof typeof acc] = []
        acc[day].push(event)
        return acc
    }, {})

    const renderEventsForDay = (day: string) => {
        const dayEvents = groupedEvents?.[day] || []
        return dayEvents.map((event) => {
            return (
                <ItemCard
                    selected={bucket.some((e) => e._id === event._id)}
                    onClick={() => setSelectedKey((state) => [...state, event._id])}
                    title={event.name}
                    date={event.date}
                    fee={event.regFee}
                    image={event.photo?.secure_url || '/static/natya.jpg'}
                    key={event._id}
                    actionType="togglable"
                    actions={[
                        () => addItem({ ...event }),
                        () => {
                            removeItem(event._id)
                            setSelectedKey((state) =>
                                state.filter((key) => key !== event._id),
                            )
                        },
                    ]}
                />
            )
        })
    }

    return (
        <>
            <div className="">
                <h3 className="text-black ff-serif fw-400">Select your events</h3>
            </div>
            <div className="form__eventsWrap bg-white flow grid">
                {eventTypes.map((eventType) => (
                    <div key={eventType} className="proShowWrap">
                        <ItemGroup title={titleMap[eventType]}>
                            {eventSubCategories[eventType].map((subType) => (
                                <Accordion
                                    title={
                                        titleMap[subType as keyof typeof titleMap] ||
                                        subType
                                    }
                                    key={subType}
                                >
                                    <div className="itemCardWrap">
                                        {renderSubTypeEvents(eventType, subType)}
                                    </div>
                                </Accordion>
                            ))}
                        </ItemGroup>
                    </div>
                ))}
            </div>
        </>
    )

    // return (
    //     <>
    //         <div className="">
    //             <h3 className="text-black ff-serif fw-400">Select your events</h3>
    //         </div>
    //         <div className="form__eventsWrap bg-white flow grid">
    //             <div className="proShowWrap">
    //                 <ItemGroup title="Pro show">
    //                     <Accordion title="Day 1">
    //                         <div className="itemCardWrap">
    //                             {renderEventsForDay('2023-09-15T00:00:00.000Z')}
    //                         </div>
    //                     </Accordion>
    //                     <Accordion title="Day 2">
    //                         <div className="itemCardWrap">
    //                             {renderEventsForDay('Day 2')}
    //                         </div>
    //                     </Accordion>
    //                     <Accordion title="Day 3">
    //                         <div className="itemCardWrap">
    //                             {renderEventsForDay('Day 3')}
    //                         </div>
    //                     </Accordion>
    //                     <Accordion title="Day 4">
    //                         <div className="itemCardWrap">
    //                             {renderEventsForDay('Day 4')}
    //                         </div>
    //                     </Accordion>
    //                 </ItemGroup>
    //             </div>
    //             <button className="btn btn--save text-white ff-serif">
    //                 Save Changes
    //             </button>
    //         </div>
    //     </>
    // )
}
