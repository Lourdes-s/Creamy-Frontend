import React, { useContext, useState } from 'react'
import useProducts from '../Hooks/useProducts'
import { Link } from 'react-router-dom'
import Slider from '../Components/Common/Slider/Slider'
import { homeSliderImages } from '../Data/sliderData.js'



const HomeScreen = () => {
    const {products_state, products_loading_state, products_error_state} = useProducts()
    return (
        <div>
            <Slider slidesContent={homeSliderImages} />
            <Link to={'/product/new'}>Vender</Link>
            <h1>Bienvenido</h1>
            {/* ver si el usuario tiene rol de admin y si tiene rol de admin mostrar el boton de crear producto, el boton te llevara a /product/new y nos mostrara un formulario para crear un producto */}
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
                                            <Product product={product} key={product._id}/>
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

const Product = ({product}) => {

    return (
        <div key={product._id}>
            <h2>{product.title}</h2>
            {product.image_base64 && <img src={product.image_base64} alt={product.title} width={100}/>}
            <span>Precio ${product.price}</span>
            <Link to={`/product/${product._id}`}>Ver detalle</Link>
        </div>
    )
}    