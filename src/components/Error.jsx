// components/Error.jsx
export default function Error({ message }) {
    if (!message) return null

    return (
        <div className='error-box'>
            <span className='error-icon'>!</span>
            <p className='error-text'>{message}</p>
        </div>
    )
}