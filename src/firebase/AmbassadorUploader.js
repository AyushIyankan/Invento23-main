// eslint-disable-next-line @typescript-eslint/no-var-requires
var admin = require('firebase-admin')
const collectionKey = 'campusAmbassador'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('./JSONfiles/campusAmbassadors.json')

// eslint-disable-next-line @typescript-eslint/no-var-requires
var serviceAccount = require('./service_key.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const firestore = admin.firestore()
const settings = { timestampsInSnapshots: true }

firestore.settings(settings)

let count = 0

if (data && typeof data === 'object') {
    Object.keys(data).forEach((docKey) => {
        const docData = data[docKey]
        const nameField = docData['NAME '] // Access field with a space in its name using bracket notation
        const sanitizedDocId = nameField.replace(/[^\w\s]/gi, '').trim() // Sanitize and trim document ID

        if (sanitizedDocId.length === 0) {
            console.warn('Skipping document with empty ID:', docData)
            return
        }
        console.log(docData)
        firestore
            .collection(collectionKey)
            .doc(sanitizedDocId)
            .set(docData)
            .then(() => {
                console.log('Document ' + sanitizedDocId + ' successfully written!')
                count++
            })
            .catch((error) => console.error('Error writing document: ', error))
    })
}

console.log(count)
