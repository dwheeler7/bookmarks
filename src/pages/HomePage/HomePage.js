import { useState, useEffect } from 'react'
import LoginForm from "../../components/LoginForm/LoginForm"
import CreateBookmarkForm from "../../components/CreateBookmarkForm/CreateBookmarkForm"
import Container from '../../components/Container/Container'

const HomePage = props => { 
    
    const [bookmarks, setBookmarks] = useState([])    

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const data = await props.getAllBookmarks(props.user._id, props.token)
                setBookmarks(data)
            } catch(err) {
                console.error(err)
            }
        }
        // fetchBookmarks()
    }, [])

    return (        
        <>
        <Container>
            { props.user? <CreateBookmarkForm createBookmark={props.createBookmark} token={props.token} /> : <LoginForm login={props.login}/> }            
        </Container>
        </>
    )
}

export default HomePage