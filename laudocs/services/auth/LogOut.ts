import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

export default async function logout() {
    let error = null;

    try {
        await signOut(auth);
    } catch (e) {
        error = e;
        console.error("Erro ao deslogar:", e);
    }

    return { error };
}
