import { useEffect, useState } from 'react'
import { QueryClient } from 'react-query'
import {
    LoaderFunctionArgs,
    useLoaderData,
    useNavigate,
    useParams,
} from 'react-router-dom'

import { EventResponse, EventType } from '../../api/schema'
import { useToggle } from '../../hooks'
import { eventQuery } from '../../hooks/useEventQuery'
import { useGroupStore, useStore } from '../../store'
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

        if (!data.success) {
            throw new Error("Couldn't fetch event data")
        }

        return data
    }

export default function Register({ type = 'all' }: Props) {
    const [event, setEvent] = useState<EventType | Record<string, never>>({})
    const [isGroup, setGroup] = useState(false)
    const [state, toggle] = useToggle(false)
    const navigate = useNavigate()

    const data = useLoaderData() as EventResponse

    let item: EventType | Record<string, never> = {}

    useEffect(() => {
        if (data?.success) {
            item = data.event
            const group: boolean =
                item.regFeeTeam && item.maxParticipants && item?.maxParticipants > 0
                    ? true
                    : false
            setEvent(item)
            setGroup(group)
        }
    }, [])
    const { groups } = useGroupStore((state) => state)

    const { items, removeItem, addItem, reset } = useStore((state) => state)

    return (
        <div className="formParentWrap centeredContainer flow side-padding light-scheme pt-4-6">
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
                    // removeItem={removeItem}
                    onRemove={() => {
                        if (items.some((e) => e._id === event._id)) removeItem(event._id)
                        setEvent({})
                    }}
                    onFinalSubmit={() => {
                        reset()
                        addItem({
                            _id: event?._id,
                            name: event.name,
                            participationType: isGroup ? 'group' : 'solo',
                            date: event.date,
                            regFee: event.regFee || event.regFeeTeam,
                            image: event.photo?.secure_url || '/static/natya.jpg',
                            members: isGroup ? groups?.[event._id] || [] : [],
                        })

                        navigate('/final')
                    }}
                />
            )}
        </div>
    )
}

export * from './Layout'
