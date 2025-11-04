import admin from 'firebase-admin';
import { FIREBASE_BASE64 } from './config.js';

/* 
Se convirtó el archivo de configuracion json de firebase a un string con el siguiente comando:
[Convert]::ToBase64String([IO.File]::ReadAllBytes("src\settings\firebase-adminsdk.json"))
para luego parsearlo y guardarlo en la variable serviceAccount
*/
if (!FIREBASE_BASE64) {
    throw new Error('Falta la variable de entorno FIREBASE_BASE64');
}
const serviceAccount = JSON.parse(
    Buffer.from(FIREBASE_BASE64, 'base64').toString('utf-8')
);

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Realtime DB URL: 'https://tu-proyecto-default-rtdb.firebaseio.com/'
    });
}

export const db = admin.firestore();
export const auth = admin.auth();
export const FieldValue = admin.firestore.FieldValue;