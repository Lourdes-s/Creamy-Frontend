import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaPlus, FaBars, FaTimes } from 'react-icons/fa'
import { AuthContext } from '../../../Context/AuthContext'
import LogoCreamy from '../../../Assets/images/Logo.png'
import './nav.css'

const Nav = () => {
    const { is_authenticated_state, user, logout } = useContext(AuthContext)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const userMenuRef = useRef(null)
    const isAdmin = user?.role === 'admin'

    const [showDropdown, setShowDropdown] = useState(false)
    const desktopDropdownRef = useRef(null)
    const mobileDropdownRef = useRef(null)

    const [menuOpen, setMenuOpen] = useState(false)

    // Cierra el menú si se hace clic fuera
useEffect(() => {
    const handleClickOutside = (event) => {
        if (
            desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target) &&
            mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)
        ) {
            setShowDropdown(false)
        }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
}, [])

    return (
        <nav className='navbar'>
            <div className='nav-left'>
                <Link to="/home" className="logo">
                    <img src={LogoCreamy} alt="logo" />
                </Link>

                {/* Menú Desktop */}
                <div className='dropdown desktop-only' ref={desktopDropdownRef}>
                    <button className='dropdown-toggle' onClick={() => setShowDropdown(!showDropdown)}>
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

                <a href="/contact" className="nav-link desktop-only">Contacto</a>
                <a href="/about_us" className="nav-link desktop-only">Sobre Creamy</a>
            </div>

            <div className='nav-right desktop-only'>
                {is_authenticated_state ? (
                    <div className='dropdown' ref={userMenuRef}>
                        <button className='dropdown-toggle' onClick={() => setShowUserMenu(!showUserMenu)}>
                            <FaUser /> <span>{user?.name}</span>
                        </button>
                        <div className={`dropdown-menu right ${showUserMenu ? 'show' : ''}`}>
                            <button className='dropdown-item' onClick={() => { logout(); setShowUserMenu(false); }}>
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" className="nav-link"><FaUser /> Ingresar</Link>
                )}

                <Link to="/carrito" className="icon-link">
                    <FaShoppingCart />
                </Link>

                {isAdmin && (
                    <Link to={'/product/new'} className="icon-link">
                        <FaPlus />
                    </Link>
                )}
            </div>

            {/* Botón Hamburguesa */}
            <button
                className={`hamburger ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menú"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Menú Mobile */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <div className='dropdown' ref={mobileDropdownRef}>
                    <button className='dropdown-toggle' onClick={() => setShowDropdown(!showDropdown)}>
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

                <div className='mobile-icons'>
                    {is_authenticated_state ? (
                        <div className='dropdown' ref={userMenuRef}>
                            <button className='dropdown-toggle' onClick={() => setShowUserMenu(!showUserMenu)}>
                                <FaUser /> <span>{user?.name}</span>
                            </button>
                            <div className={`dropdown-menu ${showUserMenu ? 'show' : ''}`}>
                                <button className='dropdown-item' onClick={() => { logout(); setShowUserMenu(false); setMenuOpen(false); }}>
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link"><FaUser /></Link>
                    )}

                    <Link to="/carrito" className="icon-link">
                        <FaShoppingCart />
                    </Link>

                    {isAdmin && (
                        <Link to={'/product/new'} className="icon-link">
                            <FaPlus />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav