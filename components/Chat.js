import { Avatar } from "@material-ui/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth, getUser } from "../firebase"
import getRecipientEmail from "../utils/getRecipientEmail"

function Chat({id, users}) {
    const [user] = useAuthState(auth)
    const recipientEmail = getRecipientEmail(users, user)
    const [data, setData] = useState(null)
    const router = useRouter()

    useEffect(() => {
        getUser(recipientEmail).then(res => setData({recipient: res}));
    }, [user])

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    return (
        <Container onClick={enterChat}>
            { 
                data?.recipient ? 
                    <UserAvatar src={data?.recipient?.photoURL}/>
                : 
                    <UserAvatar />                    
            }
            <p>{recipientEmail}</p> 
        </Container>
    )
}

export default Chat

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;

    :hover{
        background-color: #e9eaeb;
    }
`

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`