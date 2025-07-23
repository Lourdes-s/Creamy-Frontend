import React, { useContext, useState } from 'react'
import useProducts from '../../Hooks/useProducts.jsx'
import { Link } from 'react-router-dom'
import Slider from '../../Components/Common/Slider/Slider.jsx'
import { homeSliderImages } from '../../Data/sliderData.js'
import ProductCard from '../../Components/Common/ProductCard/ProductCard.jsx'
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
                                                    <ProductCard product={product} key={product._id} />
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