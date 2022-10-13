import { useEffect } from "react";
import styled from "styled-components"

function Message({user, message}) {
    // useEffect(()=>{
        // console.log(message);
    // })
    return (
        <Container>
            <p>{message}</p>
        </Container>
    )
}

export default Message;

const Container = styled.div``