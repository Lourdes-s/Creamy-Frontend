import React, {useState} from 'react'
import useForm from '../Hooks/useForm.jsx'
import { Link, useNavigate } from 'react-router-dom'

const RegisterScreen = () => {

    const navigate = useNavigate()

//cuando invoco a use form (del hook) se crea otro estado del formulario y me devuelve dicho estado y una funcion para asociar a cada input y que modifique mi estado del formulario
    const {formState, handleChange} = useForm({
        name: '',
        email: '',
        password: ''
    })

    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        password: '',
        general: ''
    })


    const handlerRegister = async (event) => {
        event.preventDefault() 
        console.log('formulario registro enviado')


        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })

        console.log(responseHTTP)

        const data = await responseHTTP.json()

        console.log(data)
        //tomar el error que venga del back y setear los errores de ser necesario
        if(!data.ok){
            if(data.data.registerState.name.errors){
                //seteamos el estado de error 
                setErrorState((prevstate) => {
                    return {...prevstate, name: data.data.registerState.name.errors}
                })
            }
        }
        else{
            navigate('/login')
        }
    }

    return (
        <div>
            <h1>Registrate aqui</h1>
            <form onSubmit={handlerRegister}>
                <div>
                    <label>Ingresa tu nombre:</label>
                    <input 
                        type='text' 
                        id='name' 
                        name='name' 
                        placeholder='Cosme Fulanito' 
                        onChange={handleChange} 
                        value={formState.name}
                    />
                    {
                        errorState.name && <span>{errorState.name}</span>
                    }
                </div>
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
                    {
                        errorState.email && <span>{errorState.email}</span>
                    }
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
                    {
                        errorState.password && <span>{errorState.password}</span>
                    }
                </div>
                <button type='submit'>Registrar</button>
                <Link to='/forgot-password'>Olvide mi contraseña</Link>
            </form>
        </div>
    )
}

export default RegisterScreen