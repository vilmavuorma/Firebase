import { initializeApp } from 'firebase/app'
import { getFirestore,collection,addDoc,serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDeSddIWNtzJ4bmNN9jvv_y3MI2ZDzmq1E",
  authDomain: "chat-76e25.firebaseapp.com",
  projectId: "chat-76e25",
  storageBucket: "chat-76e25.appspot.com",
  messagingSenderId: "913230639923",
  appId: "1:913230639923:web:8a64f59d8fcb275ea38446"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES
};