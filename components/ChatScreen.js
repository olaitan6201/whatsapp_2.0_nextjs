import { Avatar, IconButton } from "@material-ui/core"
import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@material-ui/icons"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import styled from "styled-components"
import { addMessage, auth, db, fetchMessages } from "../firebase"
import getRecipientEmail from "../utils/getRecipientEmail"
import Message from "./Message"

function ChatScreen({ chat }) {
    const [user] = useAuthState(auth)
    const router = useRouter()
    const [input, setInput] = useState("")
    const q = query(
        collection(db, "messages"), 
        where("chat_id", "==", router.query.id), orderBy("timestamp", 'asc'));
    const [messages, setMessages] = useState(null)
    
    useEffect(() => {
        fetchMessages(user, router.query.id).then(res => {
            if(res) setMessages(res);
        }).catch((error) =>{ })

    }, [user])

    const sendMessage = async (e) => {
        e.preventDefault();

        const res = await addMessage(user, input, router.query.id)

        if(res) setInput("");
        else console.log('an error occured', res);
    }

    return (
        <Container>
            <Header>

                <Avatar />
                <HeaderInformation>
                    <h3>{getRecipientEmail(chat.users, user)}</h3>
                    <p>Last seen ...</p>
                </HeaderInformation>

                <HeaderIcons>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {/* show messages */}
                { messages && messages.map(doc => 
                    <Message
                        key={doc.id} 
                        user={doc.user} 
                        message={doc.message}
                    />
                )}
                <EndOfMessage />
            </MessageContainer>

            <InputContainer>
                <InsertEmoticon />
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                <Mic />
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
`

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    background-color: white;
    bottom: 0;
    z-index: 100;
`

const Input = styled.input`
    flex: 1;
    outline: none;
    border:none;
    border-radius: 10px;
    padding: 20px;
    background-color: whitesmoke;
    margin-left: 15px;
    margin-right: 15px;
`

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    > h3{
        margin-bottom: 3px;
    }

    > p{
        font-size: 14px;
        color: grey;
    }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`

const EndOfMessage = styled.div``