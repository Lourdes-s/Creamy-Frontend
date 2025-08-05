import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Form from '../../Components/Form.jsx'
import Nav from '../../Components/Common/Nav/Nav.jsx'
import { getAuthenticatedHeaders } from "../../utils/fetching.js"
import './editProduct.css'

const categories = [
    'Dermocosmetica',
    'Cuidado capilar',
    'Cuidado personal',
    'Fragancias',
    'Maquillaje'
]

const EditProductScreen = () => {
    const { product_id } = useParams()
    const [formState, setFormState] = useState(null)
    const [errorState, setErrorState] = useState({})
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product_id}`, {
                    headers: getAuthenticatedHeaders()
                })
                const data = await res.json()
                if (res.ok) {
                    const product = data.payload.product
                    setFormState({
                        title: product.title || '',
                        price: product.price || '',
                        stock: product.stock || '',
                        description: product.description || '',
                        category: product.category || '',
                        image_base64: product.image_base64 || ''
                    })
                } else {
                    setErrorState({ general: 'Producto no encontrado' })
                }
            } catch (error) {
                setErrorState({ general: 'Error al obtener el producto' })
            }
        }

        fetchProduct()
    }, [product_id])

    const handleUpdateProduct = async (updatedForm) => {
        setErrorState({})
        setSuccess(false)
        setLoading(true)

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product_id}`, {
                method: 'PUT',
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify({ updated_data: updatedForm })
            })
            const data = await res.json()
            if (res.ok) {
                setSuccess(true)
            } else {
                setErrorState({ general: data.message || 'Error al actualizar producto' })
            }
        } catch (err) {
            setErrorState({ general: 'Error al conectar con el servidor' })
        } finally {
            setLoading(false)
        }
    }

    if (!formState) {
        return <p style={{ padding: '2rem' }}>Cargando datos del producto...</p>
    }

    return (
        <div className='screen-edit-product'>
            <Nav />
            <div className='edit-product-container'>
                <h1 className='title-edit-product'>Editar Producto</h1>
                <Form
                    className='form-edit-product'
                    form_fields={form_fields}
                    action={handleUpdateProduct}
                    initial_state_form={formState}
                    error={errorState}
                >
                    <div className='feedback-messages-product'>
                        {successState && (
                            <span className='success-product'>¡Producto actualizado exitosamente!</span>
                        )}
                        {errorState.general && (
                            <span className='error-field-product'>{errorState.general}</span>
                        )}
                    </div>
                    <button className='button-edit-product' type='submit' disabled={loading}>
                        {loading ? 'Actualizando...' : 'Guardar Cambios'}
                    </button>
                </Form>
            </div>
        </div>
    )

}

export default EditProductScreen