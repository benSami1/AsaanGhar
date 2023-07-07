import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {


  apiKey: 'AIzaSyBI8m0ooPeaWrnsuLGThS-yDZw0qw5_b-o',
    appId: '1:133610598443:android:fda1a2e683c1d50e31ba6e',
    messagingSenderId: '133610598443',
    projectId: 'assan-ghar',
    storageBucket: 'assan-ghar.appspot.com',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, onAuthStateChanged };
