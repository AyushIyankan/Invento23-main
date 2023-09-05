import { useQuery } from 'react-query'

import { EventResponse } from '../api/schema'
import { API_URI } from '../constants'

async function getEvent(id: string): Promise<EventResponse> {
    const res = await fetch(API_URI + 'events/' + id)
    return res.json()
}

async function getProshows(): Promise<EventResponse> {
    const res = await fetch(API_URI + 'events?category=proshow')

    if (!res.ok) throw new Error('Something went wrong')

    return res.json()
}

export default function useEventQuery(id: string) {
    return useQuery(['event', id], () => getEvent(id))
}

export const eventQuery = (id: string) => ({
    queryKey: ['event', id],
    queryFn: () => getEvent(id),
})

export const proShowQuery = () => ({
    queryKey: ['event', 'proshow'],
    queryFn: () => getProshows(),
})
