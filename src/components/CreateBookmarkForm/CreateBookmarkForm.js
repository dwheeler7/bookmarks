import { useState } from 'react'
import styles from './CreateBookmarkForm.module.scss'
import { Link } from 'react-router-dom'

const CreateBookmarkForm = props => {
    const [formData, setFormData] = useState({        
        title: '',
        url: ''
    })

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    return(
        <>
            <form 
                className={styles.bookmarkForm} 
                onSubmit={(e) => {
                e.preventDefault()
                props.createBookmark(formData, props.token)
            }}>
                <input type='text' placeholder='Bookmark title' name="title" onChange={handleChange} value={formData.title} />
                <input type='text' placeholder='URL' name="url" onChange={handleChange} value={formData.url} />
                <input type="submit" value="Submit" />
            </form>            
        </>
    )

}

export default CreateBookmarkForm