import { toast } from 'react-toastify'

import { eventCategories, EventType } from '../../api/schema'
import PanelSection from '../../components/PanelSection'
import useEventsQuery from '../../hooks/useEventsQuery'
import { About } from './About'
import { Hero } from './Hero'
import { Spotlight } from './spotlight'

const sapthaSections = ['GroupEvents', 'SoloEvents', 'GeneralEvents']
const sapthaSectionMap = {
    [sapthaSections[0]]: eventCategories[6],
    [sapthaSections[1]]: eventCategories[7],
    [sapthaSections[2]]: eventCategories[4],
}
export default function Saptha() {
    const events = useEventsQuery()

    if (events.isLoading) toast('Loading Events...', { type: 'info', toastId: 'dwqsdq' })
    if (events.error) toast('Error Loading Events', { type: 'error', toastId: 'dwqsdv' })

    const eventsBySection = sapthaSections.map((section) => {
        const categoryEvent = events.data?.events.filter(
            (event) =>
                event.eventType === 'saptha' &&
                event.category === sapthaSectionMap[section],
        )
        if (categoryEvent && categoryEvent.length > 0) {
            return (
                <PanelSection
                    title={section}
                    panelType="saptha"
                    key={section}
                    items={categoryEvent as EventType[]}
                />
            )
        }
        return null
    })

    return (
        <>
            <div className="bg--full--saptha"></div>
            <Hero />
            <About />
            <Spotlight />
            {events.data?.success && eventsBySection}
            {/* <GroupEvents />
            <SoloEvents />
            <GeneralEvents />
            <Gallery /> */}
        </>
    )
}
