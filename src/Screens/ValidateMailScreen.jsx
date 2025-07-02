import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ValidateMailScreen = () => {
    const { validation_token } = useParams()
    const navigate = useNavigate()
    const [validationEmailResponseState, setValidationEmailResponseState] = useState({
        is_loading: true,
        response: null,
        is_error: null
    })

    const verifyMailToken = async (validation_token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-email/${validation_token}`)
            const result = await response.json()

            if (response.ok) {
                setValidationEmailResponseState({
                    is_loading: false,
                    response: result,
                    is_error: null
                });
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                setValidationEmailResponseState({
                    is_loading: false,
                    response: null,
                    is_error: result.message || 'Error al validar el token.'
                })
            }
        } catch (error) {
            console.error(error);
            setValidationEmailResponseState({
                is_loading: false,
                response: null,
                is_error: 'Error de conexión. Por favor, inténtalo de nuevo más tarde.'
            })
        }
    }

    useEffect(() => {
        verifyMailToken(validation_token)
    }, [validation_token])

    return (
        <div className ='validate-mail-container'>
            {validationEmailResponseState.is_loading && <h2 className='loading-message-validate'>Cargando...</h2>}
            {validationEmailResponseState.is_error && <h2 className="error-message-validate">{validationEmailResponseState.is_error}</h2>}
            {validationEmailResponseState.response && <h2 className="success-message-validate">¡Correo verificado correctamente!</h2>}
        </div>
    )
}

export default ValidateMailScreen