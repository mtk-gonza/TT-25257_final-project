import { Timestamp } from 'firebase-admin/firestore';

export const convertTimestamps = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;

    if (obj instanceof Timestamp) {
        return obj.toDate().toISOString();
    }

    if (Array.isArray(obj)) {
        return obj.map(convertTimestamps);
    }

    const result = {};
    for (const key in obj) {
        if (Object.hasOwn(obj, key)) {
            result[key] = convertTimestamps(obj[key]);
        }
    }
    return result;
};