import { useState, useEffect } from 'react'
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import Container from "../../components/Container/Container"
// import components

export default function SignUpPage (props) {

    return (
        <>
        <Container>
            <SignUpForm signUp={props.signUp}/>
        </Container>
        </>
    )
}