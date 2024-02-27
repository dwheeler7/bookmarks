import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import AddBookmarkPage from './pages/AddBookmarkPage/AddBookmarkPage'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'

export default function App(){
    // user state
    const [user, setUser] = useState(null)
    // token state
    const [token, setToken] = useState('')

    // sign up 
    const signUp = async (credentials) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            setUser(data.user)
            setToken(data.token)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
        } catch (err) {
            console.error(err) 
        }
    }

    // login
    const login = async (credentials) => {

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            setUser(data.user)
            setToken(data.token)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))            
        } catch (err) {
            console.error(err) 
        }

    }

    // create bookmark
    const createBookmark = async (bookmarkData, token) => {
        if (!token) return
        try {
            const response = await fetch('/api/bookmarks', {        
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookmarkData)
            })
            const data = await response.json()
            return data
        } catch (err) {
            console.error(err) 
        }
    }

    // get all bookmarks
    const getAllBookmarks = async () => {
        try {
            const response = await fetch('/api/bookmarks')
            const data = await response.json()
            return data
        } catch (err) {
            console.error(err) 
        }
    }

    // update bookmark
    const updateBookmark = async (bookmarkData, id, token) => {
        if (!token) return
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookmarkData)
            })
            const data = await response.json()
            return data
        } catch(err) {
            console.error(err)
        }
    }

    // delete bookmark
    const deleteBookmark = async (id, token) => {
        if (!token) return
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            return data
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className={styles.App}>

            <Routes>
                // Homepage route
                <Route path='/'
                element={
                    <HomePage 
                        user={user}
                        token={token}
                        setToken={setToken}
                        setUser={setUser}
                        getAllBookmarks={getAllBookmarks} 
                        updateBookmark={updateBookmark}
                    />}>
                </Route>

                // Authpage route
                <Route path='/register'
                element={
                    <AuthPage 
                        setUser={setUser}
                        setToken={setToken}
                        signUp={signUp}
                        login={login}
                    />
                }></Route>

                // New bookmark route
                <Route path='/new'
                element={
                    <AddBookmarkPage
                        user={user} 
                        token={token} 
                        setToken={setToken}
                        setUser={setUser}
                        createBookmark={createBookmark}
                />}></Route>            
            </Routes>
        </div>
    )
}