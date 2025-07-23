import React from 'react'
import { Link } from 'react-router-dom'
import './productCard.css'

const ProductCard = ({ product }) => {
    return (
        <div className='product-card' key={product._id}>
            <img src={product.image_base64} alt={product.title} className='product-image' />
            <div className='product-info'>
                <h3>{product.title}</h3>
                <div className='product-details'>
                    <span className='product-price'>Precio {Number(product.price).toLocaleString('es-AR')}</span>
                    <Link to={`/product/${product._id}`} className='product-link'>Ver detalle</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard

