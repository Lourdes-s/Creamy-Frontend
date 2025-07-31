import React, { useState } from 'react'
import useProductDetail from '../../Hooks/useProductDetail'
import useCart from '../../Hooks/useCart'
import { useParams } from 'react-router-dom'
import Nav from '../../Components/Common/Nav/Nav'
import './productDetail.css'

const unitsOptions = [1, 2, 3, 4, 5]

const ProductDetailScreen = () => {
    const { product_id } = useParams()
    const { product_detail_state, product_detail_error_state, product_detail_loading_state } = useProductDetail(product_id)

    const [units, setUnits] = useState(1)
    const [feedbackMessage, setFeedbackMessage] = useState(null)
    const { addToCart } = useCart()

    if (product_detail_loading_state) return <span>Cargando...</span>
    const handleAddToCart = () => {
        addToCart(product_id, units)
        setFeedbackMessage(`Agregaste ${units} unidad${units > 1 ? 'es' : ''} de ${product_detail_state.title} al carrito.`)
    }

    return (
        <div className='screen-product-detail'>
            <Nav />
            <div className='details-product-detail'>
                <img className='image-product-detail' src={product_detail_state.image_base64} alt={product_detail_state.title} />
                <div className='info-product-detail'>
                    <h1 className='title-product-detail'>{product_detail_state.title}</h1>
                    <p className='description-product-detail'>{product_detail_state.description}</p>
                    <span className='price-product-detail'>Precio: ${Number(product_detail_state.price).toLocaleString('es-AR')}</span>
                    <span className='shipping-product-detail'>Envío gratis a partir de los $90.000</span>
                    <label htmlFor='units' className='quantity-product-detail'>Cantidad:</label>
                    <select id='units' className='select-units-product-detail' value={units} onChange={(e) => setUnits(Number(e.target.value))}>
                        {unitsOptions.map(u => (
                            <option key={u} value={u}>{u} unidad{u > 1 ? 'es' : ''}</option>
                        ))}
                    </select>
                    <div className='actions-product-detail'>
                        <button className='buy-product-detail'>Comprar Ahora</button>
                        <button className='add-cart-product-detail' onClick={handleAddToCart}>Agregar al carrito</button>
                    </div>
                    {feedbackMessage && <div className='feedback-message'>{feedbackMessage}</div>}
                </div>
            </div>
        </div>
    )
}

export default ProductDetailScreen