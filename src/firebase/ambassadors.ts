import { collection, doc, getDocs, onSnapshot, query } from 'firebase/firestore'

import { db } from './firebase'

const collectionRef = query(collection(db, 'campusAmbassadors'))

export const getAllAmbassadors = onSnapshot(collectionRef, (querySnapshot) => {
    const campusAmbassadors = []
    querySnapshot.forEach((doc) => {
        campusAmbassadors.push({ ...doc.data(), id: doc.id })
    })
    return campusAmbassadors
})
