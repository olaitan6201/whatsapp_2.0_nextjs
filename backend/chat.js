import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 

export const addChat = async (email, user) => {
    try {

        //chat already exist
        const q = query(collection(db, "chats"), where("users", "array-contains", user.email));
        const querySnapshot = await getDocs(q);
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
