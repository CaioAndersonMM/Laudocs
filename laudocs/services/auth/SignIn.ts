import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';

if (!app) {
    throw new Error("Firebase app is not initialized");
}
const auth = getAuth(app);

export default async function signIn(email: string, password: string) {
    let result = null;
    let error = null;

    try {
        await setPersistence(auth, browserLocalPersistence);

        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
