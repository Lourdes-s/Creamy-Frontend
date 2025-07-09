import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Form from '../Components/Form.jsx'

const RecoveryPasswordScreen = () => {
    const { reset_token } = useParams()

    const [errorState, setErrorState] = useState({
        password: '',
        general: ''
    })

    const [successState, setSuccess] = useState(false)

    const form_fields = [
        {
            label_text: 'Ingresa tu nueva contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                type: 'password',
                id: 'password',
                name: 'password',
                placeholder: ''
            }
        }
    ]

    const initial_state_form = {
        password: ''
    }

    const actionRecoveryPassword = async (form_state) => {
        setErrorState({ password: '', general: '' })
        setSuccess(false)

        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/recovery-password/${reset_token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: form_state.password, reset_token
            })
        })

        const data = await responseHTTP.json()

        switch (responseHTTP.status) {
            case 200:
                setSuccess(true)
                break
            case 400:
                const errorObj = {}
                const errorData = data.message
                if (Array.isArray(errorData?.password)) {
                    errorObj.password = errorData.password
                }
                if (Array.isArray(errorData?.reset_token)) {
                    errorObj.general = errorData.reset_token
                }
                setErrorState(prev => ({
                    ...prev,
                    ...errorObj
                }))
                break
            case 404:
            case 410:
                setErrorState(prev => ({
                    ...prev,
                    general: 'El enlace de recuperación es inválido o ha expirado.'
                }))
                break
            default:
                setErrorState(prev => ({
                    ...prev,
                    general: 'Ocurrió un error inesperado. Inténtalo más tarde.'
                }))
                break
        }
    }

    return (
        <div className='screen-recovery'>
            <h1 className='title-recovery'>Modifica tu contraseña</h1>
            <Form className='form-recovery' error={errorState} action={actionRecoveryPassword} form_fields={form_fields} initial_state_form={initial_state_form}>
                <div className="feedback-messages-recovery">
                    {successState && (
                        <span className="success-recovery">Tu contraseña ha sido actualizada correctamente.</span>
                    )}
                    {Array.isArray(errorState.general)
                        ? errorState.general.map((e, i) => (
                            <span className="error-recovery" key={i}>{e.message}</span>
                        ))
                        : typeof errorState.general === 'string' && (
                            <span className="error-recovery">{errorState.general}</span>
                        )
                    }
                </div>
                <button className='button-recovery' type='submit'>Restablecer</button>
            </Form>
            <Link className='link-recovery' to='/login'>Iniciar Sesión</Link>
        </div>
    )
}

export default RecoveryPasswordScreen