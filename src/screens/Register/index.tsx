import { useEffect, useState } from 'react'
import { QueryClient } from 'react-query'
import {
    Link,
    LoaderFunctionArgs,
    ScrollRestoration,
    useLoaderData,
} from 'react-router-dom'

import { EventResponse, EventType } from '../../api/schema'
import { ReactComponent as InfoIcon } from '../../assets/svg/icon-info.svg'
import { useMediaQuery, useToggle } from '../../hooks'
import useCheckout from '../../hooks/useCheckout'
import { eventQuery } from '../../hooks/useEventQuery'
import { useDetailStore, useFormValidationStateStore, useStore } from '../../store'
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
    const mobile = useMediaQuery('(max-width: 500px)')
    const { personalDetails } = useDetailStore((state) => state)
    const {
        items,
        removeItem,
        addItem,
        reset,
        setUpdatedPrice,
        setMembers: setMembersForEvent,
    } = useStore((state) => state)

    const formValidStateStore = useFormValidationStateStore((state) => state)

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
            if (group) {
                formValidStateStore.setIsValid(false)
            } else {
                formValidStateStore.setIsValid(true)
            }
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
                type: event.eventType,
            })
        }
    }, [event, data, type])

    return (
        <>
            <ScrollRestoration />
            <div className="formParentWrap centeredContainer flow side-padding light-scheme pt-4-6">
                <div className="proshow_reg_Helper ff-serif">
                    <InfoIcon className="info-icon" />
                    <p className="text-black">
                        Day passes are open now! {mobile && <br />} Grab your tickets
                        &nbsp;
                        <span>
                            <Link to="/proshow/register">Here</Link>
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
                            const gmembers = Object.entries(data).map(
                                ([, value]) => value,
                            )

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
                            formValidStateStore.setIsValid(true)
                        }}
                        onRemove={() => {
                            if (items.some((e) => e._id === event._id))
                                removeItem(event._id)
                            setEvent({})
                        }}
                        onFinalSubmit={() => {
                            formValidStateStore.setIsValid(false)
                            handleFinalSubmit(personalDetails, items)
                        }}
                        calcPrice={() =>
                            items.find((e) => e._id === event._id)?.updatedPrice ?? 0
                        }
                        disabled={!formValidStateStore.isValid}
                    />
                )}
            </div>
        </>
    )
}

export * from './Layout'
