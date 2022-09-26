// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {  } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { 
    collection, addDoc, doc, setDoc, Timestamp,
    getFirestore, getDocs, query, where
} from "firebase/firestore"; 

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

export const updateUser = async (ref, user) => {
    try {
        const docData = {
            email: user.email,
            lastSeen: Timestamp.fromDate(new Date()),
            photoURL: user.photoURL
        }
        
        let res = await setDoc(doc(db, "users", ref), docData, { merge: true });
        return res;
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        // console.error("Error adding document: ", e);
        return null
    }
}


export const addChat = async (email, user) => {
    try {
        console.log('Gotten here');
        //chat already exist
        const q = query(collection(db, "chats"), where("users", "array-contains", user.email));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.data());
        const chatExists = !!querySnapshot?.find((chat) => 
            chat.data().users.find(user => user === email)?.length > 0
        );

        if(chatExists) return false

        //add new chat
        const docRef = await addDoc(collection(db, "chats"), {
            users: [user.email, email]
        });
        return true
    } catch (e) {
        return false
    }
}

export { db, auth, provider }