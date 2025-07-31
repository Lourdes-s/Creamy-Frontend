import { useState, useEffect } from 'react'
import { getAuthenticatedHeaders } from '../utils/fetching'

const useCart = () => {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchCart = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
                method: 'GET',
                headers: getAuthenticatedHeaders()
            })
            const data = await response.json()
            if (!data.ok) throw new Error('No se pudo obtener el carrito')
            setCart(data.payload.cart)
        } catch (err) {
            console.error(err)
            setError('No se pudo obtener el carrito')
        } finally {
            setLoading(false)
        }
    }

    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
                method: 'POST',
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify({ productId, quantity })
            })
            const data = await response.json()
            if (!response.ok) {
                console.error('Error al agregar al carrito:', data.message)
                return
            }
            setCart(data.payload.cart)
        } catch (err) {
            console.error('Error de red al agregar al carrito', err)
        }
    }

    const updateQuantity = async (productId, quantity) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/update`, {
                method: 'PUT',
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify({ productId, quantity })
            })
            if (quantity <= 0) {
                await removeFromCart(productId)
                return
            }
            if (!response.ok) throw new Error("Error actualizando")
            const data = await response.json()
            await fetchCart()
        } catch (err) {
            console.error("Error al actualizar cantidad", err)
        }
    }

    const removeFromCart = async (productId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${productId}`, {
                method: 'DELETE',
                headers: getAuthenticatedHeaders()
            })
            if (!response.ok) throw new Error("Error eliminando")
            await fetchCart()
        } catch (err) {
            console.error("Error al eliminar del carrito", err)
        }
    }

    const clearCart = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/clear`, {
                method: 'DELETE',
                headers: getAuthenticatedHeaders()
            });
            if (!response.ok) throw new Error("Error al vaciar carrito")
            const data = await response.json()
            if (data?.payload?.cart && Array.isArray(data.payload.cart)) {
                setCart(data.payload.cart)
            } else {
                setCart([]) 
            }
        } catch (err) {
            console.error("Error al vaciar carrito", err)
            setCart([])
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    return {
        cart,
        loading,
        error,
        addToCart,
        fetchCart,
        updateQuantity,
        removeFromCart,
        clearCart
    }
}

export default useCart