import { useEffect, useState } from "react"
import { getAuthenticatedHeaders } from "../utils/fetching"

const useProducts = () => {
    //logica de los productos
    const [products_state, setProducts] = useState([])
    const [products_loading_state, setProductsLoading] = useState(true)
    const [products_error_state, setProductsError] = useState(null)
    const obtenerProductos = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
            method: 'GET',
            headers: getAuthenticatedHeaders()
        })
        const data = await response.json()
        if(!data.ok) {
            setProductsError(data.error)
            setProductsLoading(false)
            return
        }
        else{
            setProducts(data.payload.products)
            setProductsLoading(false)
        }

    }
    useEffect(
        () => {
            obtenerProductos()
        },
        []
    )

    return {
        products_state,
        products_loading_state,
        products_error_state
    }
}

export default useProducts