import { useState, useEffect } from 'react'
import LoginForm from "../../components/LoginForm/LoginForm"
import Container from "../../components/Container/Container"

const LoginPage = props => {

    return (
        <>
        <Container>
            <LoginForm login={props.login}/>
        </Container>
        </>
    )
}

export default LoginPage