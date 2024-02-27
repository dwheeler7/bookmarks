import { useState, useEffect } from 'react'
import Container from '../../components/Container/Container'

// homepage will:
    // show list of bookmarks
    // 

export default function HomePage (props) { 
    
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const data = await props.getAllBookmarks()
                setBookmarks(data)
            } catch(err) {
                console.error(err)
            }
        }
        fetchBookmarks()
    }, [])



    return (        
        <>
        <Container>
            {bookmarks.length? <p>{bookmarks[0].title}</p> : '...' }            
        </Container>
        </>
    )
}