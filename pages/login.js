import { Button } from "@material-ui/core"
import Head from "next/head"
import styled from "styled-components"
import { signInWithGoogle } from "../firebase"

function Login(){

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"/>
                <Button variant="outlined" onClick={signInWithGoogle}>Sign In With Google</Button>
            </LoginContainer>
        </Container>
    )
}
export default Login

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background: whitesmoke;
`

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
    background: white;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
    border-radius: 5px;
`

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`