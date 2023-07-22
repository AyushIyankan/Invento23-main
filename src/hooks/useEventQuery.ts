import { useQuery } from 'react-query'

import { EventResponse } from '../api/schema'
import { API_URI } from '../constants'

async function getEvent(id: string): Promise<EventResponse> {
    const res = await fetch(API_URI + '/events/' + id)
    return res.json()
}

export default function useEventQuery(id: string) {
    return useQuery(['event', id], () => getEvent(id))
}
