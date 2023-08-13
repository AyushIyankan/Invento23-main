import { toast } from 'react-toastify'

import { eventCategories, EventType } from '../../api/schema'
import PanelSection from '../../components/PanelSection'
import useEventsQuery from '../../hooks/useEventsQuery'
import { About } from './About'
import { Hero } from './Hero'

const sections = ['Workshops', 'Competitions', 'Expo', 'Pre-Events', 'General Events']
const sectionMap = {
    [sections[0]]: eventCategories[0],
    [sections[1]]: eventCategories[1],
    [sections[2]]: eventCategories[2],
    [sections[3]]: eventCategories[3],
    [sections[4]]: eventCategories[4],
}

export default function Events() {
    const events = useEventsQuery()

    if (events.isLoading) toast('Loading Events...', { type: 'info', toastId: 'dwqsdq' })
    if (events.error) toast('Error Loading Events', { type: 'error', toastId: 'dwqsdv' })

    const eventsBySection = sections.map((section) => {
        const categoryEvent = events.data?.events.filter(
            (event) =>
                event.eventType !== 'saptha' && event.category === sectionMap[section],
        )

        if (categoryEvent && categoryEvent?.length > 0) {
            return (
                <PanelSection
                    title={section}
                    panelType="events"
                    key={section}
                    items={categoryEvent as EventType[]}
                />
            )
        }

        return null
    })
    // console.log(eventsBySection)
    return (
        <>
            <div className="bg--full--saptha"></div>
            <Hero />
            <About />
            {events.data?.success && eventsBySection}
        </>
    )
}
