import React, { useContext, useState } from 'react'
import useProducts from '../Hooks/useProducts'
import { Link } from 'react-router-dom'
import Slider from '../Components/Common/Slider/Slider'
import { homeSliderImages } from '../Data/sliderData.js'
import Nav from '../Components/Common/Nav/Nav'



const HomeScreen = () => {
    const { products_state, products_loading_state, products_error_state } = useProducts()
    return (
        <div>
            <Nav />
            <Slider slidesContent={homeSliderImages} />
            <h1>Descubrí nuestros productos de skincare y cosmetica para vos</h1>
            <div>
                {
                    products_loading_state
                        ? <span>Loading...</span>
                        : (
                            products_error_state
                                ? <span>{products_error_state}</span>
                                : <div>
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
                <span className='product-price'>Precio ${product.price}</span>
                <Link to={`/product/${product._id}`} className='product-link'>Ver detalle</Link>
            </div>
        </div>
    )
}    