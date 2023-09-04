import { useEffect, useState } from 'react'

import { EventType } from '../../api/schema'
import useEventsQuery from '../../hooks/useEventsQuery'
import { RegistrationForm } from '../../screens/Register/Form'
import { EventsUI } from './components'

function ProshowRegister() {
    const events = useEventsQuery()
    const [proshowEvents, setProshowEvents] = useState<EventType[]>([])
    useEffect(() => {
        if (events.data && events.data.success) {
            const proshow = events.data.events.filter(
                (event) => event.eventType === 'proshow',
            )
            setProshowEvents(proshow)
        }
    }, [events.data])
    return (
        <main id="proshow-reg">
            <RegistrationForm />
            <section id="proshow-events">
                <EventsUI events={proshowEvents} />
            </section>
        </main>
    )
}

export default ProshowRegister
