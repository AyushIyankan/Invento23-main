import { useState } from 'react'
import { toast } from 'react-toastify'

import { EventType, eventTypes } from '../../api/schema'
import { Accordion } from '../../components/Accordion'
import { ItemCard } from '../../components/Card/Card'
import { ItemGroup } from '../../components/ItemGroup'
import { titleMap } from '../../constants'
import useEventsQuery from '../../hooks/useEventsQuery'
import { useGroupStore, useStore } from '../../store'

const eventSubCategories: Record<
    EventType['eventType'] | string,
    EventType['category'][] | string[]
> = {
    // proshow: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
    techfest: ['workshops', 'competitions', 'exhibitions', 'preevents', 'generalevents'],
    saptha: ['group', 'solo', 'generalevents'],
    taksthi: [],
}

export function EventForm() {
    const { addItem, removeItem, items: bucket } = useStore((state) => state)
    const { groups } = useGroupStore((state) => state)
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

        return eventsOfTypeAndSubType?.map((event) => {
            const group: boolean =
                event.regFeeTeam && event.maxParticipants && event?.maxParticipants > 0
                    ? true
                    : false
            return (
                <ItemCard
                    selected={bucket.some((e) => e._id === event._id)}
                    itemId={event._id}
                    onClick={() => setSelectedKey((state) => [...state, event._id])}
                    title={event.name}
                    date={event.date}
                    fee={event.regFee || event.regFeeTeam || 0}
                    image={event.photo?.secure_url || '/static/natya.jpg'}
                    key={event._id}
                    group={group}
                    maxParticipants={event.maxParticipants || 0}
                    actionType="togglable"
                    actions={[
                        () =>
                            addItem({
                                _id: event._id,
                                name: event.name,
                                regFee: event.regFee || event.regFeeTeam,
                                date: event.date,
                                // photo: event.photo?.secure_url || '/static/natya.jpg',
                                image: event.photo?.secure_url || '/static/natya.jpg',
                                participationType: group ? 'group' : 'solo',
                                members: group ? groups?.[event._id] || [] : [],
                            }),
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
                {/* <div className="proShowWrap">
                    <ItemGroup title="Pro show">
                        <Accordion title="Pro Show"></Accordion>
                    </ItemGroup>
                </div> */}
                {eventTypes.map(
                    (eventType) =>
                        eventType !== 'proshow' && (
                            <div key={eventType} className="proShowWrap">
                                <ItemGroup title={titleMap[eventType]}>
                                    {eventSubCategories[eventType].map((subType) => (
                                        <Accordion
                                            title={
                                                titleMap[
                                                    subType as keyof typeof titleMap
                                                ] || subType
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
                        ),
                )}
                {/* <button className="btn btn--save text-white ff-serif">
                    Save Changes
                </button> */}
            </div>
        </>
    )
}
