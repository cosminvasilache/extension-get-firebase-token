import { getAll } from './indexeddb';

export const FIREBASE_DB_NAME = 'firebaseLocalStorageDb';
export const FIREBASE_OBJECT_STORE_NAME = 'firebaseLocalStorage';

export type IFirebaseStoreValue = {
	value: {
		apiKey: string,
		appName: string,
		createdAt: string,
		displayName: string,
		email: string,
		emailverified: boolean,
		isAnonymous: boolean,
		lastLoginAt: string,
		multiFactor: {
			enrolledFactors: unknown[]
		},
		phoneNumber: string | null,
		providerData: {
			displayName: string,
			email: string,
			phoneNumber: string,
			photoURL: null | unknown,
			providerId: 'password' | unknown,
			uid: string,
		}[],
		redirectEventId: null | unknown,
		stsTokenManager: {
			accessToken: string,
			apiKey: string,
			expirationTime: number,
			refreshToken: string,
		},
		tenantId: null | unknown,
		uid: string,
	}
};

export const getAllFirebase = () => {
    return getAll<IFirebaseStoreValue>(FIREBASE_DB_NAME, FIREBASE_OBJECT_STORE_NAME);
};

export const getFirebaseToken = async () => {
    const res = await getAllFirebase();
    if (res === null) {
        return null;
    }
    if (res.length === 0) {
        return null;
    }
    return res[0].value.stsTokenManager.accessToken;

};
