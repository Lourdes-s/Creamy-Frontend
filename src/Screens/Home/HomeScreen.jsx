import React, { useContext, useState } from 'react'
import useProducts from '../../Hooks/useProducts.jsx'
import { Link } from 'react-router-dom'
import Slider from '../../Components/Common/Slider/Slider.jsx'
import { homeSliderImages } from '../../Data/sliderData.js'
import Nav from '../../Components/Common/Nav/Nav.jsx'
import './home.css'


const HomeScreen = () => {
    const { products_state, products_loading_state, products_error_state } = useProducts()
    return (
        <div className='screen-home'>
            <Nav />
            <Slider slidesContent={homeSliderImages} />
            <p className='intro-home'>En Creamy vas a encontrar productos seleccionados de skincare, cosmética y cuidado personal. Calidad coreana, precios justos y amor por tu piel.</p>
            <h1 className='title-home'>Descubrí nuestros productos de skincare y cosmetica para vos</h1>
            <div className='products-container-home'>
                {
                    products_loading_state
                        ? <span className='loading-home'>Loading...</span>
                        : (
                            products_error_state
                                ? <span className='error-home'>{products_error_state}</span>
                                : <div className='products-grid-home'>
                                    {
                                        products_state.map(
                                            (product) => {
                                                return (
                                                    <Product product={product} key={product._id} />
                                                )
                                            }
                                        )
                                    }
                                </div>
                        )
                }
            </div>
        </div>
    )
}

export default HomeScreen

const Product = ({ product }) => {

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