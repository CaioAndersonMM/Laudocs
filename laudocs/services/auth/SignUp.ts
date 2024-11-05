
import { app } from '../firebase';
import { createUserWithEmailAndPassword,getAuth } from 'firebase/auth';

const auth = app ? getAuth(app) : getAuth();

export default async function SignUp(email: string, password: string) {
    let result= null;
    let error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    
  } catch (e) {
    error = e;
  }

    return { result, error };
}

