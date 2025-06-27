import React from 'react'
import useForm from '../Hooks/useForm'

const Form = ({children, action, form_fields, initial_state_form}) => {
    //children ha referncia a el contenido encerrado como hijo de nuestro componente
    
    const {formState, handleChange} = useForm(initial_state_form)

    const handleSubmit = (e) => {
        e.preventDefault()
        action(formState)//👀
    }

    return (
        <form onSubmit={handleSubmit}>
            <FieldList form_fields={form_fields} handleChange={handleChange} formState={formState}/>
            {children}
        </form>
    )
}

const FieldList = ({form_fields, handleChange, formState}) => {
    return(
        form_fields.map((field, index) => {
            return(
                <Field 
                key={index + field.field_data_props.name} 
                field={field} 
                handleChange={handleChange} 
                state_value={formState[field.field_data_props.name]}
                />
            )
        })
    )
}

/* 
{
            label_text: 'Ingresa tu nueva contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                type: 'password',
                id: 'password',
                name: 'password',
                placeholder: ''
            }
        }
*/

const Field = ({field, handleChange, state_value}) => {
    return (
        <div {...field.field_container_props}>
            {field.label_text && <label>{field.label_text}</label>}
            <>
                {
                    field.field_component === 'INPUT' 
                    ? <input {...field.field_data_props} onChange={handleChange} value={state_value}/>
                    : <textarea></textarea>
                }
            </>
        </div>
    )
}

export default Form