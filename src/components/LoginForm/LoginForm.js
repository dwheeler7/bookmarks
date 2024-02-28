import { useState } from 'react'
import styles from './LoginForm.module.scss'
import { Link } from 'react-router-dom'

const LoginForm = props => {
    const [credentials, setCredentials] = useState({        
        email: '',
        password: ''
    })

    const handleChange = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }

    return(
        <>
            <form 
                className={styles.loginForm} 
                onSubmit={(e) => {
                e.preventDefault()
                props.login(credentials)
            }}>
                <input type='email' placeholder='Email' name="email" onChange={handleChange} value={credentials.email} />
                <input type='password' placeholder='Password' name="password" onChange={handleChange} value={credentials.password} />
                <input type="submit" value="Submit" />
            </form>
            <Link to='/sign-up'>Sign up</Link>
        </>
    )

}

export default LoginForm