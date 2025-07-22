import { useState } from "react"

const useForm = (initialForm) => {
    const [formState, setFormState] = useState(initialForm)
    const handleChange = (e) => {
        const { name, type, value, files } = e.target

        if (type === 'file') {
            const FILE_MB_LIMIT = 2 // 2MB
            const file = files[0]
            
            if (file && file.size > FILE_MB_LIMIT * 1024 * 1024) {
                alert('El archivo es demasiado grande')
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                const base64 = reader.result
                setFormState(prev => ({
                    ...prev,
                    [name]: base64
                }))
            }

            if (file) {
                reader.readAsDataURL(file)
            }
        } else {
            setFormState(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    return {
        formState,
        handleChange
    }
}

export default useForm