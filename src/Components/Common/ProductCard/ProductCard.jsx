import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaEllipsisV } from 'react-icons/fa'
import { getAuthenticatedHeaders } from '../../../utils/fetching.js'
import './productCard.css'

const ProductCard = ({ product, isAdmin, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)

    const handleDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product._id}`, {
                method: 'DELETE',
                headers: getAuthenticatedHeaders()
            })
            const result = await response.json()
            if (response.ok) {
                onDelete(product._id)
            } else {
                alert(result.message || 'Error al eliminar producto')
            }
        } catch (err) {
            console.error(err)
            alert('Error de red al eliminar el producto')
        }
    }

    useEffect(() => {
                const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className='product-card'>
            <img src={product.image_base64} alt={product.title} className='product-image' />
            <div className='product-info'>
                <h3>{product.title}</h3>
                <div className='product-details'>
                    <span className='product-price'>Precio {Number(product.price).toLocaleString('es-AR')}</span>
                    <Link to={`/product/${product._id}`} className='product-link'>Ver detalle</Link>
                </div>
            </div>

            {isAdmin && (
                <div className='admin-actions' ref={menuRef}>
                    <button className='menu-toggle' onClick={() => setShowMenu(!showMenu)}>
                        <FaEllipsisV />
                    </button>
                    {showMenu && (
                        <div className='admin-menu'>
                            <button className='delete-button' onClick={handleDelete}>
                                Eliminar producto
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProductCard