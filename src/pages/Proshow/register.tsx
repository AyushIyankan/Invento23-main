import { useEffect, useState } from 'react'
import { QueryClient } from 'react-query'
import { useLoaderData } from 'react-router'

import { EventsResponse, EventType } from '../../api/schema'
import { proShowQuery } from '../../hooks/useEventQuery'
import useEventsQuery from '../../hooks/useEventsQuery'
import { RegistrationForm } from '../../screens/Register/Form'
import { EventsUI } from './components'

export const loader = (queryClient: QueryClient) => async () => {
    const query = proShowQuery()
    const data: EventsResponse =
        queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

    if (!data.success) {
        throw new Error("Couldn't fetch event data")
    }

    return data
}

function ProshowRegister() {
    const data = useLoaderData() as EventsResponse

    const [proshowEvents, setProshowEvents] = useState<EventType[]>([])
    useEffect(() => {
        if (data.success && data.count > 0) {
            const proshows = data.events
            setProshowEvents(proshows)
        }
    }, [data.success])

    return (
        <main id="proshow-reg" className="light-scheme">
            <RegistrationForm />
            <section id="proshow-events">
                <EventsUI events={proshowEvents} />
            </section>
        </main>
    )
}

export default ProshowRegister
