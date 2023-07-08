import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCDGhn5NtiunaTRd4nqojc9JCMYEW9x7-g",
  authDomain: "aflami-3e9dc.firebaseapp.com",
  projectId: "aflami-3e9dc",
  storageBucket: "aflami-3e9dc.appspot.com",
  messagingSenderId: "329414751757",
  appId: "1:329414751757:web:fe55eb9ee98cd93b998744",
  measurementId: "G-9JFY8VDWB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)