import React, { useState } from 'react'
import Form from '../../Components/Form.jsx'
import './contact.css'
const ContactScreen = () => {
    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        message: '',
        general: ''
    })

    const [successState, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const form_fields = [
        {
            label_text: 'Nombre de usuario:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-contact',
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
                className: 'input-login',
                type: 'email',
                id: 'email',
                name: 'email',
                placeholder: 'joedoe@example.com'
            }
        },
        {
            label_text: 'Mensaje:',
            field_component: 'TEXTAREA',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-contact',
                type: 'text',
                id: 'message',
                name: 'message',
                placeholder: 'Escriba su mensaje aqui'
            }
        }
    ]

    const initial_state_form = {
        name: '',
        email: '',
        message: ''
    }

    const handleContact = async (formState) => {

        setErrorState({ name: '', email: '', message: '', general: '' })
        setSuccess(false)
        setLoading(true)

        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/contact`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            })

        const data = await responseHTTP.json()

        switch (responseHTTP.status) {
            case 200:
                setSuccess(true)
                break;
            default:
                if (!responseHTTP.ok) {
                    setErrorState((prev) => ({
                        ...prev,
                        general: data.message || 'Ocurrio un error inesperado.'
                    }))
                }
                break;
        }
        setLoading(false)
    }

    return (
        <div>
            <h1>Contactanos!</h1>
            <p>Queremos saber de vos.</p>
            <Form className='contact-form' form_fields={form_fields} action={handleContact} initial_state_form={initial_state_form} error={errorState}>
                <div className='feedback-messages-contact'>
                    {successState && (
                        <span className='success-contact'>Email enviado con exito. Gracias por contactarnos</span>
                    )}
                    {Array.isArray(errorState.general)
                        ? errorState.general.map((e, i) => (<span key={i} className='error-field'>{e.message}</span>))
                        : typeof errorState.general === 'string' && (<span className='error-field'>{errorState.general}</span>)
                    }
                </div>
                <button className='button-contact' type='submit' disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
            </Form>
        </div>
    )
}

export default ContactScreen