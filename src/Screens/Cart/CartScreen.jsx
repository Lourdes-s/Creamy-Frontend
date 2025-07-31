import React from 'react'
import useCart from '../../Hooks/useCart'
import Nav from '../../Components/Common/Nav/Nav'
import { Link } from 'react-router-dom'
import { FaTrash } from "react-icons/fa"
import './cart.css'

const CartScreen = () => {
    const { cart, loading, error, updateQuantity, removeFromCart, clearCart } = useCart()

    if (loading) return <div className='cart-loading'>Cargando carrito...</div>
    if (error) return <div className='cart-error'>{error}</div>

    const total = cart.reduce((acc, item) => {
        if (!item.product || !item.product.price) return acc
        return acc + item.product.price * item.quantity
    }, 0)

    return (
        <div className='cart-screen'>
            <Nav />
            <div className='cart-sidebar'>
                <h1 className='cart-title'>Mi Carrito</h1>
                {cart.length === 0 ? (
                    <p className='cart-empty'>Todavía no agregaste productos 🛒</p>
                ) : (
                    <>
                        <div className='cart-items'>
                            {cart
                                .filter(item => item.product && typeof item.product === 'object') // aseguramos producto válido
                                .map((item, index) => (
                                    <div className='cart-item' key={item.product._id || index}>
                                        <img src={item.product.image_base64} alt={item.product.title} className='cart-item-image' />
                                        <div className='cart-item-details'>
                                            <h3>{item.product.title}</h3>
                                            <div className='cart-controls'>
                                                <button className='qty-btn' onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button className='qty-btn' onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                                                <button type='button' className='remove-btn' onClick={() => removeFromCart(item.product._id)}><FaTrash /></button>
                                            </div>
                                            <p>Precio: ${Number(item.product.price).toLocaleString('es-AR')}</p>
                                            <p>Subtotal: ${Number(item.product.price * item.quantity).toLocaleString('es-AR')}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className='cart-summary'>
                            <h2>Total: ${total.toLocaleString('es-AR')}</h2>
                            <button className="clear-cart-button" onClick={clearCart}> Vaciar carrito </button>
                            <button className='cart-checkout-button'>Finalizar compra</button>
                        </div>
                    </>
                )
                }
            </div>
        </div>
    )
}

export default CartScreen