// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {  } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { 
    collection, addDoc, doc, setDoc, Timestamp,
    getFirestore, getDocs, query, where, getDoc, updateDoc, orderBy, onSnapshot
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
        //chat already exist
        const q = query(collection(db, "chats"), where("users", "array-contains", user.email));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot.data());

        querySnapshot.forEach((doc) => {
            const exists = !!(doc.data().users.find(user => user === email)?.length > 0)
            // console.log(exists);
            if(exists) return false
        })

        //add new chat
        const docRef = await addDoc(collection(db, "chats"), {
            users: [user.email, email]
        });
        return true
    } catch (e) {
        return false
    }
}

export const getChats = async (user) => {
    try {
        const q = query(collection(db, "chats"), where("users", "array-contains", user.email));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot.data());

        return querySnapshot
    } catch (e) {
        return []
    }
}

export const getChat = async (id) => {
    try {
        const docRef = doc(db, "chats", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;
        const data = docSnap.data()
        // console.log(data);
        return data;
    } catch (e) {
        // console.log(e);
        return null
    }
}

export const loadChats = async (user) => {
    try {
        let res = await getChats(user)
        if(!res) return []

        let data = [];
        res.forEach((chat) => {
            // console.log(chat.id);
            data.push({
                id: chat.id,
                data: chat.data()
            });
        })

        return data.slice();

    } catch (error) {
        return []
    }
} 

export const getUser = async (email) => {
    try {
        const q = query(collection(db, "users"), where("email", "==", email));
        // const q = doc(db, "users", email);
        const docRef = await getDocs(q);

        const data = null

        await docRef.forEach((doc) => data = doc?.data())

        // console.log(data.photoURL);
        return data
    } catch (error) {
        return null
    }
}


export const addMessage = async (user, message, chat_id) => {
    try {
        await updateDoc(doc(db, "users", user.uid), {
            lastSeen: Timestamp.fromDate(new Date())
        }, { merge: true })

        await addDoc(collection(db, "messages"), {
            timestamp: Timestamp.fromDate(new Date()),
            message: message,
            chat_id: chat_id,
            user: user.email,
            photoURL: user.photoURL
        })

        return true
    } catch (error) {
        return false
    }
}


export const fetchMessages = async (user, chat_id) => {
    try {
        await updateDoc(doc(db, "users", user.uid), {
            lastSeen: Timestamp.fromDate(new Date())
        }, { merge: true })
        
        const q = query(
            collection(db, "messages"), 
            where("chat_id", "==", chat_id),
            // orderBy('timestamp', 'asc')
        );

        let messages = [];
        
        const unsubscribe = await onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((message) => {
                if(messages.filter(msg => msg.id === message.id).length === 0)
                messages.push({
                    id: message.id,
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime()
                });
            })
        });

        // const querySnapshot = await getDocs(q);

        // querySnapshot.forEach(doc => console.log(doc.data()))
        // return querySnapshot

        return messages;

    } catch (error) {
        // console.log(error);
        return []
    }
}

export { db, auth, provider }