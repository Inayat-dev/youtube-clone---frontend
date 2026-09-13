import React from 'react'
import { Api } from '../api/Api'

export const authContext = React.createContext();

export default function AuthContext({ children }) {

    const [user, setUser] = React.useState({
        name: null,
        username: null,
        email: null,
        avatar: null
    })
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    // App load hote hi check karo user already logged in hai ya nahi (token/cookie se)
    React.useEffect(() => {
        checkAuth()
    }, [])

    async function checkAuth() {
        try {
            const res = await Api.get('/users/me')
            setUser(res.data)
        } catch (err) {
            setUser({ name: null, username: null, email: null, avatar: null })
        } finally {
            setLoading(false)
        }
    }

    async function register(formData) {
        
        setError(null)
        try {
            const res = await Api.post('/users/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return { success: true, user: res.data.data }
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed'
            setError(message)
            return { success: false, message }
        }
    }

    async function login(credentials) {
        setError(null)
        try {
            const res = await Api.post('/users/login', credentials)
            const loggedInUser = res.data

            setUser(loggedInUser)

            return { success: true, user: loggedInUser }
        } catch (err) {
            const message = err?.response?.data?.message || 'Login failed'
            setError(message)
            return { success: false, message }
        }
    }

    async function forgetPassword(formData){
        setError(null)
        try {
            const res = await Api.post('/users/update-password', {oldPassword:formData.get("oldPassword"), newPassword:formData.get("newPassword")})
            const changePass = res.data

            if(!changePass.success){
                return { success: false, user: changePass }
            }

            return { success: true, user: changePass }
        } catch (err) {
            const message = err.response?.data?.message || 'Password Forget Faild'
            setError(message)
            return { success: false, message }
        }
    }

    async function logout() {
        try {
            await Api.post('/users/logout')
        } catch (err) {
            // logout API fail bhi ho to local state clear kar do
        } finally {
            setUser({ name: null, username: null, email: null, avatar: null })
            localStorage.removeItem('token')
        }
    }

    return (
        <authContext.Provider value={{ user, login, logout, loading, error, register, forgetPassword }}>
            {children}
        </authContext.Provider>
    )
}