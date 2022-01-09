import firebase, { ServiceAccount } from 'firebase-admin'

import serviceAccount from '../../firebase-credential.json'

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount as ServiceAccount)
})

firebase.firestore().settings({ 
  ignoreUndefinedProperties: true
})
