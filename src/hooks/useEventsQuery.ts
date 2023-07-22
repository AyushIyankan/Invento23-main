import { useQuery } from 'react-query'

import { EventsResponse } from '../api/schema'
import { API_URI } from '../constants'

async function getEvents(): Promise<EventsResponse> {
    const res = await fetch(API_URI + '/events')
    return res.json()
}

export default function useEventsQuery() {
    return useQuery('events', () => getEvents())
}
