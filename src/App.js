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



    // login

    // create bookmark

    // get all bookmarks

    // update bookmark

    // delete bookmark

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