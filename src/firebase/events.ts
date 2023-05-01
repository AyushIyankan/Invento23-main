import { collection, onSnapshot, query } from 'firebase/firestore'

import { db } from './firebase'

const collectionRef = query(collection(db, 'events'))

//Get all events
export const getAllEvents = onSnapshot(collectionRef, (querySnapshot) => {
    const allEvents = []
    querySnapshot.forEach((doc) => {
        allEvents.push({ ...doc.data(), id: doc.id })
    })
    return allEvents
})

//filter events by category
export const filteredEvents = async (events, category) => {
    const filteredArray = events.filter((event) => {
        return event.category == category
    })
    return filteredArray
}
