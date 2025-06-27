import React from 'react'
import useForm from '../Hooks/useForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { useContext } from 'react'

const LoginScreen = () => {
    const {formState, handleChange} = useForm({
        email: '',
        password: ''
    })
    const {login} = useContext(AuthContext)    
    const navigate  = useNavigate()
    console.log(formState)
    const handleLogin = async (e) =>{
        e.preventDefault()
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState)
            }
        )
        const data = await responseHTTP.json()
        if(!data.ok){
            //manejamos los estados de error
            console.log(data.error)
        }
        else{
            login(data.data.access_token)
        }
        console.log(data)
    }
    
    return (
        <div>
            <h1>Inicia Sesion</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Ingresa tu email:</label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='cosmefulanito@gmail.com' 
                        onChange={handleChange} 
                        value={formState.email}
                    />
                </div>
                <div>
                    <label>Ingresa tu contraseña:</label>
                    <input 
                        type='password' 
                        id='password' 
                        name='password' 
                        placeholder='Tu_contraseña' 
                        onChange={handleChange} 
                        value={formState.password}
                    />
                </div>
                <button type='submit'>Iniciar Sesion</button>
                <Link to='/forgot-password'>Olvide mi contraseña</Link>
            </form>
        </div>
    )
}

export default LoginScreen