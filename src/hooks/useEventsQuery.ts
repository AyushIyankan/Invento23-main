import { useQuery } from 'react-query'

import { EventsResponse, EventType } from '../api/schema'
import { API_URI } from '../constants'

async function getEvents(): Promise<EventsResponse> {
    const res = await fetch(API_URI + 'events')
    return res.json()
}

export default function useEventsQuery() {
    return useQuery('events', () => getEvents())
}

export function useCompetitionQuery() {
    return useQuery({
        queryKey: ['events', 'competitions'],
        queryFn: getEvents,
        select: (data) => data.events.filter((d) => d.category === 'competitions'),
    })
}

export function useSelectedQuery<
    K extends EventType['category'] | EventType['eventType'],
>(key: K) {
    return useQuery({
        queryKey: ['events', key],
        queryFn: getEvents,
        select: (data) =>
            data.events.filter((item) => {
                return item.category === key
            }),
    })
}
