import React, { useState } from 'react'
import Form from '../Components/Form.jsx'
import { Link, useNavigate } from 'react-router-dom'

const RegisterScreen = () => {

    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        password: '',
        general: ''
    })

    const [successState, setSuccess] = useState(false)

    const form_fields = [
        {
            label_text: 'Nombre de usuario:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-register',
                type: 'text',
                id: 'name',
                name: 'name',
                placeholder: 'CosmeFulanito'
            }
        },
        {
            label_text: 'Email:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-register',
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
                className: 'input-register',
                type: 'password',
                id: 'password',
                name: 'password',
            }
        }
    ]

    const initial_state_form = {
        name: '',
        email: '',
        password: ''
    }

    const navigate = useNavigate()

    const handlerRegister = async (formState) => {

        setErrorState({ name: '', email: '', password: '', general: '' })
        setSuccess(false)

        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })

        const data = await responseHTTP.json()

        switch (responseHTTP.status) {
            case 400:
                setErrorState((prev) => ({
                    ...prev,
                    general: data.message || 'Error al registrar'
                }))
                break;
            case 201:
                setSuccess(true)
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
        <div className='screen-register'>
            <h1 className='title-register'>Crea una cuenta</h1>
            <Form className='form-register' form_fields={form_fields} action={handlerRegister} initial_state_form={initial_state_form} error={errorState}>
                <div className='feedback-messages-register'>
                    {successState && (
                        <span className='success-register'>Usuario creado exitosamente, revise su correo electronico para verificar su cuenta</span>
                    )}
                    {!successState && errorState.general && (
                        <span className='error-register'>{errorState.general}</span>
                    )}
                </div>
                <button className='button-register' type='submit'>Registrar</button>
            </Form>
            <Link className='link-register' to='/login'>Iniciar sesion</Link>
        </div>
    )
}

export default RegisterScreen