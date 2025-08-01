import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [is_authenticated_state, setIsAuthenticated] = useState(Boolean(sessionStorage.getItem('access-token')))
    const [user, setUser] = useState(
        sessionStorage.getItem('user')
            ? JSON.parse(sessionStorage.getItem('user'))
            : null
    )

    // esto es por si refresca y el token existe pero no el usuario
    useEffect(() => {
        const token = sessionStorage.getItem('access-token')
        const storedUser = sessionStorage.getItem('user')

        if (token && storedUser) {
            setIsAuthenticated(true)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (auth_token, user_data) => {
        sessionStorage.setItem('access-token', auth_token)
        sessionStorage.setItem('user', JSON.stringify(user_data))
        setUser(user_data)
        setIsAuthenticated(true)
        navigate('/home')
    }

    const logout = () => {
        sessionStorage.removeItem('access-token')
        sessionStorage.removeItem('user')
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ is_authenticated_state, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}