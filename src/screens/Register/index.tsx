import { useEffect, useState } from 'react'
import { QueryClient } from 'react-query'
import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'

import { EventResponse, EventType } from '../../api/schema'
import { ReactComponent as InfoIcon } from '../../assets/svg/icon-info.svg'
import { useToggle } from '../../hooks'
import useCheckout from '../../hooks/useCheckout'
import { eventQuery } from '../../hooks/useEventQuery'
import { useDetailStore, useStore } from '../../store'
import CollectAndSubmit from './CollectAndSubmit'
import { EventForm } from './EventForm'
import { RegistrationForm } from './Form'
import { Summary } from './Summary'

interface Props {
    type?: 'all' | 'individual'
}

export const loader =
    (queryClient: QueryClient) =>
    async ({ params: { id } }: LoaderFunctionArgs) => {
        const query = eventQuery(id!)

        const data: EventResponse =
            queryClient.getQueryData(query.queryKey) ??
            (await queryClient.fetchQuery(query))

        if (!data.success || !data.event.isAvailable) {
            throw new Error("Couldn't fetch event data")
        }

        return data
    }

export default function Register({ type = 'all' }: Props) {
    const [event, setEvent] = useState<EventType | Record<string, never>>({})
    const [isGroup, setGroup] = useState(false)
    const [state, toggle] = useToggle(false)
    const { personalDetails } = useDetailStore((state) => state)
    const {
        items,
        removeItem,
        addItem,
        reset,
        setUpdatedPrice,
        setMembers: setMembersForEvent,
    } = useStore((state) => state)

    const handleFinalSubmit = useCheckout()

    const data = useLoaderData() as EventResponse

    let item: EventType | Record<string, never> = {}

    useEffect(() => {
        if (type === 'individual' && data?.success) {
            item = data.event
            const group: boolean =
                item.regFeeTeam && item.maxParticipants && item?.maxParticipants > 0
                    ? true
                    : false
            setEvent(item)
            setGroup(group)

            reset()
            addItem({
                _id: event?._id,
                name: event.name,
                participationType: isGroup ? 'group' : 'solo',
                date: event.date,
                regFee: event.regFee || event.regFeeTeam,
                image: event.photo?.secure_url || '/static/natya.jpg',
                imageId: event.photo?.id,
                members: [],
            })
        }
    }, [event, data, type])

    return (
        <div className="formParentWrap centeredContainer flow side-padding light-scheme pt-4-6">
            <div className="proshow_reg_Helper ff-serif">
                <InfoIcon className="info-icon" />
                <p className="text-black">
                    Proshow registerations are open now!{' '}
                    <span>
                        Register for proshows{' '}
                        <Link to="/proshow/register" className="text-black link--menu">
                            {' '}
                            here
                        </Link>
                    </span>
                </p>
            </div>
            <RegistrationForm />
            {type === 'all' && <EventForm />}
            {type === 'all' && (
                <Summary bucket={items} onRemove={(id) => removeItem(id)} />
            )}
            {type === 'individual' && (
                <CollectAndSubmit
                    item={event}
                    isGroup={isGroup}
                    toggled={state}
                    onToggle={toggle}
                    onGroupFormSubmit={(data) => {
                        const gmembers = Object.entries(data).map(([, value]) => value)

                        if (isGroup) {
                            setMembersForEvent(event._id, gmembers)
                            if (
                                event?.name?.toLowerCase() === 'natya' ||
                                event?.name?.toLowerCase() === 'taksati'
                            ) {
                                const calculatedPrice =
                                    (event.regFeeTeam ?? 0) *
                                    gmembers.filter((e) => e !== '').length
                                setUpdatedPrice(event._id, calculatedPrice)
                            }
                        }
                    }}
                    onRemove={() => {
                        if (items.some((e) => e._id === event._id)) removeItem(event._id)
                        setEvent({})
                    }}
                    onFinalSubmit={() => {
                        handleFinalSubmit(personalDetails, items)
                    }}
                    calcPrice={() =>
                        items.find((e) => e._id === event._id)?.updatedPrice ?? 0
                    }
                />
            )}
        </div>
    )
}

export * from './Layout'
