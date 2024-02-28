import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import AddBookmarkPage from './pages/AddBookmarkPage/AddBookmarkPage'
import styles from './App.module.scss'
import Nav from './components/Nav/Nav'

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
    const getAllBookmarks = async (userId, token) => {
        try {
            const response = await fetch(`/api/bookmarks/${userId}/bookmarks`, {                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
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
            <Nav />

            <Routes>                
                <Route path='/'
                element={
                    <HomePage 
                        user={user}
                        token={token}
                        setToken={setToken}
                        setUser={setUser}
                        login={login}
                        getAllBookmarks={getAllBookmarks} 
                        updateBookmark={updateBookmark}
                        createBookmark={createBookmark}
                    />}>
                </Route>                
                
                <Route path='/sign-up'
                element={
                    <SignUpPage 
                        setUser={setUser}
                        setToken={setToken}
                        signUp={signUp}                        
                    />
                }></Route>

                <Route path='/login'
                element={
                    <LoginPage 
                        setUser={setUser}
                        setToken={setToken}                        
                        login={login}
                    />
                }></Route>                                  
            </Routes>
        </div>
    )
}