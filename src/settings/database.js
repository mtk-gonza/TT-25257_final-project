import admin from 'firebase-admin';
import serviceAccount from './firebase-adminsdk.json' assert { type: 'json' };

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Realtime DB URL: 'https://tu-proyecto-default-rtdb.firebaseio.com/'
    });
}

export const db = admin.firestore();
export const auth = admin.auth();
export const FieldValue = admin.firestore.FieldValue;