import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import Error from '../components/Error'
import { NavLink } from 'react-router-dom'


export default function ForgetPassword() {
    const { forgetPassword, error } = React.useContext(authContext)
    const navigate = useNavigate()
    const [submitting, setSubmitting] = React.useState(false)

    async function handleSubmit(formData) {
        setSubmitting(true)

        const result = await forgetPassword(formData)

        setSubmitting(false)

        if (result.success) {
            navigate('/home')
        }
    }

    return (
        <>
            <div className='login-container'>
                <div className='login'>
                    <h2 className='login-heading'>Forgot password?</h2>
                    <p className='login-punch'>did you not remember your password</p>
                    <form action={handleSubmit} className='login-form'>
                        <label htmlFor="email">Enter old Password</label>
                        <input type="password" name='oldPassword' id='oldPassword' placeholder='************' required />

                        <label htmlFor="password">Enter new Password</label>
                        <input type="password" name='newPassword' id='newPassword' placeholder='************' required />

                        {error && <Error message={error}/>}

                        <button disabled={submitting}>{submitting ? 'reset password...' : 'Reset'}</button>
                        <div style={{margin:"100px 0 0 0"}}>Login Account <NavLink to={"/login"}>Login</NavLink></div>
                    </form>
                </div>
                <div className='hero-image'>
                    <img src="https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className='img-hero' alt="hero" />
                </div>
            </div>
        </>
    )
}