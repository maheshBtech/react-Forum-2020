import React from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'

function Header() {
    const history = useHistory();
    const register = () => history.push('/register')
    const login = () => history.push('./')
    return (
        <nav className = "nav">
            <button onClick = {register}>Join now</button>
            <button onClick = {login}>Sign in</button>
            
        </nav>
    )
}

export default Header
