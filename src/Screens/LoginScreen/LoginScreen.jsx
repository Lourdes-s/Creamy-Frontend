import React, { useContext, useState } from 'react'
import Form from '../../Components/Form.jsx'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext.jsx'
import './login.css'


const LoginScreen = () => {
    const [errorState, setErrorState] = useState({
        email: '',
        password: '',
        general: ''
    })

    const { login } = useContext(AuthContext)

    const form_fields = [
        {
            label_text: 'Email:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-login',
                type: 'email',
                id: 'email',
                name: 'email',
                placeholder: 'joedoe@example.com'
            }
        },
        {
            label_text: 'Contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-login',
                type: 'password',
                id: 'password',
                name: 'password',
            }
        }
    ]

    const initial_state_form = {
        email: '',
        password: ''
    }
    const handleLogin = async (formState) => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState)
            })

        const data = await responseHTTP.json()

        switch (responseHTTP.status) {
            case 400:
                if (data?.message && typeof data.message === 'object') {
                    const newErrorState = { email: '', password: '', general: '' }
                    for (const field in data.message) {
                        const fieldErrors = data.message[field]
                        if (Array.isArray(fieldErrors)) {
                            newErrorState[field] = fieldErrors.map(e => e.message)
                        }
                    }
                    setErrorState(newErrorState)
                } else {
                    setErrorState((prev) => ({
                        ...prev,
                        general: data.message || 'Error al registrar'
                    }))
                }
                break;
            case 404:
                setErrorState((prev) => ({
                    ...prev,
                    email: 'El email proporcionado no está registrado'
                }))
                break;
            case 401:
            case 403:
                setErrorState(prev => ({
                    ...prev,
                    password: 'El email y la contraseña proporcionados no coinciden'
                }))
                break;
            case 200:
                login(data.access_token, data.user.id)
                break;
            default:
                setErrorState((prev) => ({
                    ...prev,
                    general: 'Ocurrió un error inesperado. Inténtelo de nuevo.'
                }))
                break;
        }
    }

    return (
        <div className='screen-login'>
            <h1 className='title-login'>Inicia Sesion</h1>
            <Form className='form-login' form_fields={form_fields} action={handleLogin} initial_state_form={initial_state_form} error={errorState}>
                {Array.isArray(errorState.general) && errorState.general.map((e, i) => (
                    <span key={i} className='error-field-login'>{e.message}</span>
                ))}

                {typeof errorState.general === 'string' && errorState.general !== '' && (
                    <span className='error-field-login'>{errorState.general}</span>
                )}

                <button className='button-login' type='submit'>Iniciar Sesion</button>
            </Form>
            <Link className='link-login-forgot' to='/forgot-password'>Olvide mi contraseña</Link>
            <Link className='link-login-register' to='/register'>Crear un nuevo usuario</Link>
        </div>
    )
}



export default LoginScreen