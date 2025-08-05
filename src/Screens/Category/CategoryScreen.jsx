import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import useProducts from '../../Hooks/useProducts'
import ProductCard from '../../Components/Common/ProductCard/ProductCard.jsx'
import Nav from '../../Components/Common/Nav/Nav.jsx'
import { AuthContext } from '../../Context/AuthContext.jsx'
import './category.css'


const CategoryScreen = () => {
    const { category_name } = useParams()
    const { products_state, products_loading_state, products_error_state, setProducts } = useProducts()
    const { user } = useContext(AuthContext)
    const isAdmin = user?.role === 'admin'

    const normalized = (str) => str.toLowerCase().replace(/\s+/g, '-')

    const filteredProducts = products_state.filter(product =>
        normalized(product.category) === category_name)

    return (
        <div className='screen-category'>
            <Nav />
            <h1 className='title-category'>{category_name.replace(/-/g, ' ')}</h1>
            {
                products_loading_state
                    ? <span className='loading-category'>Cargando productos...</span>
                    : products_error_state
                        ? <span className='error-category'>{products_error_state}</span>
                        : (
                            <div className='products-grid-category'>
                                {filteredProducts.map(product => (
                                    <ProductCard key={product._id} product={product} isAdmin={isAdmin} onDelete={(id) => setProducts(prev => prev.filter(p => p._id !== id))}/>
                                ))}
                            </div>
                        )
            }
        </div>
    )
}

export default CategoryScreen