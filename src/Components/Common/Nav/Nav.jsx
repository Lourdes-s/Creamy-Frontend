import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaPlus } from 'react-icons/fa'
import { AuthContext } from '../../../Context/AuthContext'
import './nav.css'

const Nav = () => {
    const { is_authenticated_state, user } = useContext(AuthContext);
    const isAdmin = user?.role === 'admin'

    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)

    // Cierra el menú si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <nav className='navbar'>
            <div className='nav-left'>
                <Link to="/home" className="logo">Creamy</Link>
                <div className='dropdown' ref={dropdownRef}>
                    <button
                        className='dropdown-toggle'
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        Productos
                    </button>
                    <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                        <Link to='/categoria/cuidado-capilar'>Cuidado capilar</Link>
                        <Link to='/categoria/cuidado-personal'>Cuidado personal</Link>
                        <Link to='/categoria/dermocosmetica'>Dermocosmética</Link>
                        <Link to='/categoria/fragancias'>Fragancias</Link>
                        <Link to='/categoria/maquillaje'>Maquillaje</Link>
                    </div>
                </div>
                <a href="/contact" className="nav-link">Contacto</a>
                <a href="/about_us" className="nav-link">Sobre Creamy</a>
            </div>
            <div className='nav-right'>
                {is_authenticated_state ? (
                    <div className="user-info">
                        <FaUser /> <span>{user?.name || 'Usuario'}</span>
                    </div>
                ) : (
                    <Link to="/login" className="nav-link">Ingresar</Link>
                )}

                <Link to="/carrito" className="icon-link">
                    <FaShoppingCart />
                </Link>

                {isAdmin && (
                    <Link to="/admin/agregar-producto" className="icon-link">
                        <FaPlus />
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Nav