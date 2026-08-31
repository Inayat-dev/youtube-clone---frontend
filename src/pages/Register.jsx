// pages/Register.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'
import Error from '../components/Error'
import Loading from '../components/Loading'

export default function Register() {
    const { register, error } = React.useContext(authContext)
    const navigate = useNavigate()
    const [submitting, setSubmitting] = React.useState(false)

    

    async function handleSubmit(formData) {
        setSubmitting(true)
        const result = await register(formData)
        setSubmitting(false)

        if (result.success) {
            navigate('/login')
        }
    }

    return (
        <div className='login-container'>
            <div className='login'>
                    <br /><br />
                    <br /><br />
                    <br /><br />
                    <br /><br />
                    <br /><br />
                <h2 className='login-heading'>Sign up</h2>
                <p className='login-punch'>Create your account to get started</p>
                <form action={handleSubmit} className='login-form'>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" name="fullName" id="fullName" placeholder="Enter full name" required />

                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Choose a username" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="************" required />

                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" name="avatar" id="avatar" accept="image/*" required />

                    <label htmlFor="coverImage">Cover Image (optional)</label>
                    <input type="file" name="coverImage" id="coverImage" accept="image/*" />

                    <Error message={error} />

                    <button disabled={submitting}>{submitting ? 'Creating account...' : 'Sign up'}</button>
                    <br /><br />
                    <div className='options'>
                        <div>Already have an account?</div>
                        <div onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Login</div>
                    </div>
                    <br /><br />
                </form>
            </div>
            <div className='hero-image'>
                <img src="https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className='img-hero' alt="hero" />
            </div>
        </div>
    )
}