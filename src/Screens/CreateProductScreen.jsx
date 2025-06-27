import React from 'react'
import useForm from '../Hooks/useForm'
import { getAuthenticatedHeaders } from "../utils/fetching"

const CreateProductScreen = () => {
    const {formState, handleChange, handleChangeImage} = useForm({
        title: '',
        price: '',
        stock: '',
        description: '',
        category: '',
        image_base64: ''
    })

    const handleSubmmitNewProduct = async (e) => {
        e.preventDefault()
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
            method: 'POST',
            headers: getAuthenticatedHeaders(),
            body: JSON.stringify({new_product: formState})
        })
        const data = await responseHTTP.json()
        console.log(data)
    }

    return (
        <div>
            <h1>Crear Producto</h1>
            <form onSubmit={handleSubmmitNewProduct}>
                <div>
                    <label htmlFor="title">Ingrese el nombre del producto que desea vender</label>
                    <input type="text" name="title" id="title" placeholder='Nombre del producto' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="price">Ingrese el precio del producto</label>
                    <input type="number" name="price" id="price" placeholder='Precio del producto' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="stock">Ingrese la cantidad de stock del producto</label>
                    <input type="number" name="stock" id="stock" placeholder='Stock del producto' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="description">Ingrese la descripcion del producto</label>
                    <input type="text" name="description" id="description" placeholder='Descripcion del producto' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="category">Ingrese la categoria del producto</label>
                    <input type="text" name="category" id="category" placeholder='Categoria del producto' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="image">Seleccione una imagen</label>
                    {formState.image_base64 && <img src={formState.image_base64} alt="" width={200}/>}
                    <input type="file" name="image_base64" id="image" onChange={(evento) => handleChangeImage(evento, 'image_base64')}/>
                </div>
                <button type="submit">Publicar Producto</button>
            </form>
        </div>
    )
}

export default CreateProductScreen