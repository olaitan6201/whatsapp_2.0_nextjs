import Head from "next/head"
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import ChatScreen from "../../components/ChatScreen"
import Sidebar from '../../components/Sidebar'
import { auth, getChat } from "../../firebase"
import getRecipientEmail from "../../utils/getRecipientEmail"

const ChatPage = ({ chat, messages }) => {
    const [user] = useAuthState(auth)

    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    )
}

export default ChatPage

export async function getServerSideProps(context){
    let chat = await getChat(context.query.id)
    const messages = '';
    // console.log(chat, context.query.id);
    return { props: { chat, messages } };
}

const Container = styled.div`
    display: flex;
`

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`