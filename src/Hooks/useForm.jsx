import { useState } from "react"

const useForm = (initialForm) => {
    //logica de formularios y estados
    const [formState, setFormState] = useState(initialForm)
    const handleChange = (evento) => {
        evento.target // es el elemento HTML que emitio el evento
        evento.target.value // el valor del elemento HTML que emitio el evento (el input)

        const field_name = evento.target.name
        const field_value = evento.target.value

        //la funcionsetter de mi estado  me permite modificar mi estado y re renderizar mi componente 
        //Opcionalmente yo le puedo pasar una callback, la misma sera invocada y el valor de retorno de mi callback sera el nuevo valor de mi estado
        //El parametro de la callbacck es el prevState o el estado previo

        setFormState((prevFormState) => {
            return {...prevFormState, [field_name]: field_value}//los corchetes es para que no me lo tomme como propiedad sino como variable 
    })
}

    const handleChangeImage = (evento, field_name) => {
        //llamo a la primer imagen cargada en este input
        const FILE_MB_LIMIT = 2 //2mb
        const file = evento.target.files[0]
        if (file && file.size > FILE_MB_LIMIT * 1024 * 1024) {
            alert('El archivo es demasiado grande')
        }
        const reader = new FileReader()
        //es un evento que se va a cargar cuando termine de cargar el archivo
        reader.onloadend = () => {
            const image_base64 = reader.result //el archivo en base 64
            setFormState(
                (prevFormState) => {
                    return ({...prevFormState, [field_name]: image_base64}
                    )
                }
            )
        }

        if(file){
            //read as data URL lee el archivo y lo convierte en base 64
            reader.readAsDataURL(file)
        }
}

    return{
        formState, 
        handleChange, 
        handleChangeImage
    }
}

export default useForm 