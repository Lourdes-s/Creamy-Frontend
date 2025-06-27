import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useForm from '../Hooks/useForm'
import Form from '../Components/Form.jsx'

const RecoveryPasswordScreen = () => {
    const {reset_token} = useParams()
    console.log('Token de reset: ' + reset_token)
    const actionRecoveryPassword = async (form_state) => {
        console.log(form_state)

        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/recovery-password/` + reset_token,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: form_state.password,
                })
            }
        )
        const data = await responseHTTP.json()
        console.log(data)
    }

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

    return (
        <div>
            <h1>Modifica tu contraseña</h1>
            <Form action={actionRecoveryPassword} form_fields ={form_fields} initial_state_form={initial_state_form}>
                <button type='submit'>Restablecer</button>
                <Link to='/login'>Iniciar Sesion</Link>
            </Form>
        </div>
    )
}

export default RecoveryPasswordScreen