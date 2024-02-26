import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
 //  web app's Firebase configuration
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES,
    query,
    onSnapshot,
    orderBy,
    getAuth,
    signInWithEmailAndPassword,
};