import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from '../Components/Form'

const ForgotPasswordScreen = () => {

    const [errorState, setErrorState] = useState({
        email: '',
        general: ''
    })

    const [successState, setSuccess] = useState(false)

    const form_fields = [
        {
            label_text: 'Ingresa el email de recuperacion:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                type: 'email',
                id: 'email',
                name: 'email',
                placeholder: 'joedoe@example.com'
            }
        }
    ]

    const initial_state_form = {
        email: ''
    }

    const submitForgotPassword = async (form_state) => {

        setErrorState({ email: '', general: '' })
        setSuccess(false)

        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: form_state.email,
                })
            }
        )
        const data = await responseHTTP.json()

        switch (responseHTTP.status) {
            case 200:
                setSuccess(true)
                break;
            default:
                if (!responseHTTP.ok) {
                    setErrorState((prev) => ({
                        ...prev,
                        general: data.message || 'Ocurrió un error inesperado.'
                    }))
                }
                break;
        }
    }

    return (
        <div className='screen-forgot'>
            <h1 className='title-forgot'>Restablecer contraseña</h1>
            <p className='text-forgot'>Al restablecer tu contraseña se enviara un correo electronico a tu cuenta para que puedas restablecer tu contraseña</p>
            <Form className='form-forgot' form_fields={form_fields} action={submitForgotPassword} initial_state_form={initial_state_form}>
                <div className="feedback-messages-forgot">
                    {successState && (
                        <span className="success-forgot">Te enviamos un email para restablecer tu contraseña. Revisá tu casilla.</span>
                    )}
                    {!successState && errorState.general && (
                        <span className="error-forgot">{errorState.general}</span>
                    )}
                </div>
                <button className='button-forgot' type='submit'>Restablecer</button>
            </Form>
            <Link className='link-forgot' to='/login'>Iniciar Sesion</Link>
        </div>
    )
}

export default ForgotPasswordScreen

