// context/NotificationContext.jsx
import React, { createContext, useContext, useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import '../assets/css/Notification.css'

const NotificationContext = createContext(null)
const DEFAULT_DURATION = 4500
let idCounter = 0

const ICONS = {
    success: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10.5l3.2 3.2L15 6.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    error: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    warning: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 7.5v4M10 14.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8.6 3.4c.6-1 2.2-1 2.8 0l6.4 11a1.6 1.6 0 01-1.4 2.4H3.6a1.6 1.6 0 01-1.4-2.4l6.4-11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
    ),
    info: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 9v5M10 6.2h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    ),
}

export function NotificationProvider({ children }) {
    const [toasts, setToasts] = useState([])
    const timers = useRef({})   // id -> setTimeout handle
    const meta = useRef({})     // id -> { remaining, start } for accurate pause/resume

    const hardRemove = useCallback((id) => {
        clearTimeout(timers.current[id])
        delete timers.current[id]
        delete meta.current[id]
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    // marks a toast as leaving so the exit animation can play, then drops it
    const remove = useCallback((id) => {
        clearTimeout(timers.current[id])
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
        setTimeout(() => hardRemove(id), 220)
    }, [hardRemove])

    const push = useCallback((message, { type = 'info', duration = DEFAULT_DURATION } = {}) => {
        const id = ++idCounter
        setToasts((prev) => [...prev, { id, message, type, duration }])
        if (duration > 0) {
            meta.current[id] = { remaining: duration, start: Date.now() }
            timers.current[id] = setTimeout(() => remove(id), duration)
        }
        return id
    }, [remove])

    const pause = useCallback((id) => {
        const m = meta.current[id]
        if (!m) return
        clearTimeout(timers.current[id])
        m.remaining -= Date.now() - m.start
    }, [])

    const resume = useCallback((id) => {
        const m = meta.current[id]
        if (!m || m.remaining <= 0) return
        m.start = Date.now()
        timers.current[id] = setTimeout(() => remove(id), m.remaining)
    }, [remove])

    const notify = useCallback((message, options) => push(message, options), [push])
    notify.success = (message, options) => push(message, { ...options, type: 'success' })
    notify.error = (message, options) => push(message, { ...options, type: 'error' })
    notify.warning = (message, options) => push(message, { ...options, type: 'warning' })
    notify.info = (message, options) => push(message, { ...options, type: 'info' })
    notify.dismiss = remove

    return (
        <NotificationContext.Provider value={notify}>
            {children}
            {createPortal(
                <div className="toast-stack" role="region" aria-label="Notifications">
                    {toasts.map((t) => (
                        <Toast
                            key={t.id}
                            toast={t}
                            onClose={() => remove(t.id)}
                            onPause={() => pause(t.id)}
                            onResume={() => resume(t.id)}
                        />
                    ))}
                </div>,
                document.body
            )}
        </NotificationContext.Provider>
    )
}

function Toast({ toast, onClose, onPause, onResume }) {
    const { type, message, duration, leaving } = toast
    return (
        <div
            className={`toast toast--${type}${leaving ? ' toast--leaving' : ''}`}
            role={type === 'error' ? 'alert' : 'status'}
            onMouseEnter={onPause}
            onMouseLeave={onResume}
        >
            <span className="toast__icon">{ICONS[type]}</span>
            <p className="toast__message">{message}</p>
            <button className="toast__close" onClick={onClose} aria-label="Dismiss notification">
                <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>
            {duration > 0 && (
                <span className="toast__progress" style={{ animationDuration: `${duration}ms` }} />
            )}
        </div>
    )
}

export function useNotification() {
    const ctx = useContext(NotificationContext)
    if (!ctx) {
        throw new Error('useNotification must be used inside a <NotificationProvider>')
    }
    return ctx
}