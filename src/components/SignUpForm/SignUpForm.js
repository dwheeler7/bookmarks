import { useState } from 'react'
import styles from './SignUpForm.module.scss'

export default function SignUpForm (props){
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }
    return(
        <>
            <form 
                className={styles.form} 
                onSubmit={(e) => {
                e.preventDefault()
                props.signUp(credentials)
            }}>
                <input type='text' placeholder='First name' name="firstName" onChange={handleChange} value={credentials.firstName} />
                <input type='text' placeholder='Last name' name="lastName" onChange={handleChange} value={credentials.lastName} />
                <input type='email' placeholder='Email' name="email" onChange={handleChange} value={credentials.email} />
                <input type='password' placeholder='Password' name="password" onChange={handleChange} value={credentials.password} />
                <input type="submit" value="Submit" />
            </form>

        </>
    )
   } 