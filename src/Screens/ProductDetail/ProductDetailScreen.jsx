import React, { useState } from 'react'
import useProductDetail from '../../Hooks/useProductDetail'
import { useParams } from 'react-router-dom'
import Nav from '../../Components/Common/Nav/Nav'
import './productDetail.css'

const units = ['1 unidad', '2 unidades', '3 unidades', '4 unidades', '5 unidades']

const ProductDetailScreen = () => {
    const { product_id } = useParams()
    const { product_detail_state, product_detail_error_state, product_detail_loading_state } = useProductDetail(product_id)

    const [selectedUnit, setSelectedUnit] = useState('1 unidad')
    const [feedbackMessage, setFeedbackMessage] = useState(null)

    const handleAddToCart = () => {
        setFeedbackMessage(`Agregaste ${selectedUnit} de ${product_detail_state.title} al carrito `)
        // Acá iría la lógica real con contexto, redux, etc.
    }

    if (product_detail_loading_state) return <span>Cargando...</span>
    if (product_detail_error_state) return <span>Error: {product_detail_error_state}</span>

    return (
        <div className='screen-product-detail'>
            <Nav />
            <div className='details-product-detail'>
                <img className='image-product-detail' src={product_detail_state.image_base64} alt={product_detail_state.title}/>
                <div className='info-product-detail'>
                    <h1 className='title-product-detail'>{product_detail_state.title}</h1>
                    <p className='description-product-detail'>{product_detail_state.description}</p>
                    <span className='price-product-detail'>Precio: ${Number(product_detail_state.price).toLocaleString('es-AR')}</span>
                    <span className='shipping-product-detail'>Envío gratis a partir de los $90.000</span>
                    <label htmlFor='units' className='quantity-product-detail'>Cantidad:</label>
                    <select id='units' className='select-units-product-detail' value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
                        {units.map((u, i) => <option key={i} value={u}>{u}</option>)}
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