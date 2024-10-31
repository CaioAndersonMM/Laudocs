import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCx80ja8AYou8KICz6Gn2yBx_2sP3jCY64",
  authDomain: "laudocs-b4226.firebaseapp.com",
  databaseURL: "https://laudocs-b4226-default-rtdb.firebaseio.com",
  projectId: "laudocs-b4226",
  storageBucket: "laudocs-b4226.appspot.com",
  messagingSenderId: "1028493008939",
  appId: "1:1028493008939:web:1a1236e572c62ceec20a6e"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();


const database = getFirestore(app);

export { database, app };
