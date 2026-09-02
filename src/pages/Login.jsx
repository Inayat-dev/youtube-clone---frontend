import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import Error from '../components/Error'
import { NavLink } from 'react-router-dom'
import { useNotification } from '../context/Notificationcontext'
import { useParams } from 'react-router-dom'


export default function Login() {
    const { login, error } = React.useContext(authContext)
    const navigate = useNavigate()
    const notify = useNotification()
    const [submitting, setSubmitting] = React.useState(false)
    const {username, success} = useParams()
    React.useEffect(() => {
        if (success) {
            notify.success(' Register Successfully')
        }
    }, [])

    function handleSubmit(formData) {
        setSubmitting(true)
        login({
            email: formData.get("email"),
            password: formData.get("password")
        }).then((result)=>{
            setSubmitting(false)

            if (result.success) {
                navigate('/home')
            }
        })
        setSubmitting(false)
    }

    return (
        <>
        {    success != undefined?notify.success(username+' Register Successfully '):""}
            <div className='login-container'>
                <div className='login'>
                    <h2 className='login-heading'>Log in</h2>
                    <p className='login-punch'>Before we start, please log into your account</p>
                    <form action={handleSubmit} className='login-form'>
                        <label htmlFor="email">Enter Username/ Email</label>
                        <input type="text" name='email' id='email' placeholder='Enter Username/ Email' required />

                        <label htmlFor="password">Enter Password</label>
                        <input type="password" name='password' id='password' placeholder='************' required />

                        {error && <Error message={error}/>}

                        <div className='options'>
                            <div>
                                <input type="checkbox" name="remember" id="remember" className='remember' /> remember me
                            </div>
                            <NavLink to={"/forget-password"}>
                                Forgot Password?
                            </NavLink>
                        </div>
                        <button disabled={submitting}>{submitting ? 'Logging in...' : 'Login'}</button>
                        <div style={{margin:"100px 0 0 0"}}>Don't have an account? <NavLink to={"/register"}>Create an account</NavLink></div>
                    </form>
                </div>
                <div className='hero-image'>
                    <img src="https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className='img-hero' alt="hero" />
                </div>
            </div>
        </>
    )
}