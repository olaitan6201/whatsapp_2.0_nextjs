// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgqkldR5YIbHNihtoc9_kEw6YzyzJFGhE",
  authDomain: "whatsapp-2-nextjs-4f148.firebaseapp.com",
  projectId: "whatsapp-2-nextjs-4f148",
  storageBucket: "whatsapp-2-nextjs-4f148.appspot.com",
  messagingSenderId: "1061389917181",
  appId: "1:1061389917181:web:079d19cd0063c0e2549794"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try{
        let result = await signInWithPopup(auth, provider)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        return user;
    }
    catch(error){
        return null
    }
}

export const signOut = async () => {
    // try{}
}

export { db, auth, provider }