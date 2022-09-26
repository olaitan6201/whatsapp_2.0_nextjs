import { Avatar, Button, IconButton } from "@material-ui/core"
import styled from "styled-components"
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from "@material-ui/icons/Search"
import * as EmailValidator from 'email-validator'
import { auth } from "../firebase"

function Sidebar() {

    const createChat = () => {
        const input = prompt('Please enter the user email address:')
        if (!input) return null
        if(!EmailValidator.validate(input)) return null
        //Add chat to db
    }

    return (
        <Container>
            <Header>
                <UserAvatar onClick={() => auth.signOut()} />

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>

            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

            {/* List of Chats */}
        </Container>
    )
}

export default Sidebar


const Container = styled.div``

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity: .8;
    }
`

const IconsContainer = styled.div`

`

const Search = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
    /* border-bottom: 1px solid whitesmoke; */
`

const SearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
`

const SidebarButton = styled(Button)`
    width: 100%;
    
    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`