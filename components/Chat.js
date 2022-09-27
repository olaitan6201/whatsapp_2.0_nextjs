import { Avatar } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth, getUser } from "../firebase"
import getRecipientEmail from "../utils/getRecipientEmail"

function Chat({id, users}) {
    const [user] = useAuthState(auth)
    const recipientEmail = getRecipientEmail(users, user)
    const [data, setData] = useState(null)

    useEffect(() => {
        getUser(recipientEmail).then(res => setData({recipient: res}));
    }, [user])

    return (
        <Container>
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