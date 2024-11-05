import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase';

const auth = app ? getAuth(app) : null;

export default async function logout() {
    let error = null;

    try {
        if (auth) {
            await signOut(auth);
        } else {
            throw new Error("Auth instance is null");
        }
    } catch (e) {
        error = e;
        console.error("Erro ao deslogar:", e);
    }

    return { error };
}
