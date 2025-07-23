import React, { useState } from 'react'
import Form from '../../Components/Form.jsx'
import Nav from '../../Components/Common/Nav/Nav.jsx'
import { getAuthenticatedHeaders } from "../../utils/fetching.js"
import './createProduct.css'

const categories = [
    'Dermocosmetica',
    'Cuidado capilar',
    'Cuidado personal',
    'Fragancias',
    'Maquillaje'
]
const CreateProductScreen = () => {
    const initial_state_form = {
        title: '',
        price: '',
        stock: '',
        description: '',
        category: '',
        image_base64: ''
    }

    const [errorState, setErrorState] = useState({
        title: '',
        price: '',
        stock: '',
        description: '',
        category: '',
        image_base64: '',
        general: ''
    })

    const [successState, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const form_fields = [
        {
            label_text: 'Nombre del producto:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-product',
                type: 'text',
                id: 'title',
                name: 'title',
                placeholder: 'Serum...'
            }
        },
        {
            label_text: 'Precio:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-product',
                type: 'number',
                id: 'price',
                name: 'price',
                placeholder: '19.99'
            }
        },
        {
            label_text: 'Stock:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-product',
                type: 'number',
                id: 'stock',
                name: 'stock',
                placeholder: '50'
            }
        },
        {
            label_text: 'Descripción:',
            field_component: 'TEXTAREA',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'textarea-product',
                id: 'description',
                name: 'description',
                placeholder: 'Describa el producto...'
            }
        },
        {
            label_text: 'Categoría:',
            field_component: 'SELECT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-product',
                type: 'text',
                id: 'category',
                name: 'category',
            },
            options: categories
        },
        {
            label_text: 'Imagen del producto:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-product',
                type: 'file',
                id: 'image_base64',
                name: 'image_base64',
                accept: 'image/*'
            }
        }
    ]

    const handleSubmitNewProduct = async (formState) => {
        setErrorState({
            title: '',
            price: '',
            stock: '',
            description: '',
            category: '',
            image_base64: '',
            general: ''
        })
        setSuccess(false)
        setLoading(true)

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                method: 'POST',
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify({new_product: formState})
            })

            const data = await response.json()

            switch (response.status) {
                case 201:
                    setSuccess(true)
                    break
                case 400:
                    if (data?.message && typeof data.message === 'object') {
                        const newErrorState = {
                            title: '',
                            price: '',
                            stock: '',
                            description: '',
                            category: '', 
                            image_base64: '',
                            general: ''
                        };
                        for (const field in data.message) {
                            const fieldErrors = data.message[field];
                            if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
                                newErrorState[field] = fieldErrors.map(e => e.message).join(', ');
                            }
                        }
                        setErrorState(newErrorState);
                    }
                    break;
                case 401:
                case 403:
                    setErrorState(prev => ({
                        ...prev,
                        general: 'No autorizado. Debes iniciar sesión.'
                    }))
                    break
                default:
                    setErrorState(prev => ({
                        ...prev,
                        general: 'Ocurrió un error inesperado. Inténtelo de nuevo.'
                    }))
                    break
            }
        } catch (error) {
            setErrorState(prev => ({
                ...prev,
                general: 'Error de conexión con el servidor'
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='screen-create-product'>
            <Nav />
            <div className='create-product-container'>
                <h1 className='title-create-product'>Crear Producto</h1>
                <Form className='form-create-product' form_fields={form_fields} action={handleSubmitNewProduct} initial_state_form={initial_state_form} error={errorState}>
                    <div className='feedback-messages-product'>
                        {successState && (
                            <span className='success-product'>
                                ¡Producto creado exitosamente!
                            </span>
                        )}
                        {Array.isArray(errorState.general)
                            ? errorState.general.map((e, i) => (
                                <span key={i} className='error-field-product'>{e.message}</span>
                            ))
                            : typeof errorState.general === 'string' && errorState.general.trim() !== '' && (
                                <span className='error-field-product'>{errorState.general}</span>
                            )
                        }
                    </div>
                    <button className='button-create-product' type='submit' disabled={loading}>
                        {loading ? 'Publicando...' : 'Publicar Producto'}
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default CreateProductScreen