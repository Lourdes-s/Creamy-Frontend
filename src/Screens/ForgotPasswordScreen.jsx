import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../Hooks/useForm.jsx'
import Form from '../Components/Form'

const ForgotPasswordScreen = () => {

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
        //aca podemos hacer lo que queramos, capturarlo y guardarlo en el localstorage, mandar un fetch, etc. y se lo mandamos al formulario
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
        console.log(data)
    }

    return (
        <div>
            <h1>Restablecer contraseña</h1>
            <p>Al restablecer tu contraseña se enviara un correo electronico a tu cuenta para que puedas restablecer tu contraseña</p>
            <Form form_fields={form_fields} action={submitForgotPassword} initial_state_form={initial_state_form}> 
                <button type='submit'>Restablecer</button>
                <Link to='/login'>Iniciar Sesion</Link>
            </Form>
        </div>
    )
}

export default ForgotPasswordScreen