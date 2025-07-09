import React from 'react'
import useForm from '../Hooks/useForm'

const Form = ({ children, action, form_fields, initial_state_form, error = {} }) => {
    const { formState, handleChange } = useForm(initial_state_form)

    const handleSubmit = (e) => {
        e.preventDefault()
        action(formState)
    }

    return (
        <form onSubmit={handleSubmit}>
            <FieldList form_fields={form_fields} handleChange={handleChange} formState={formState} error={error} />
            {children}
        </form>
    )
}

const FieldList = ({ form_fields, handleChange, formState, error }) => {
    return (
        form_fields.map((field, index) => {
            return (
                <Field
                    key={index + field.field_data_props.name}
                    field={field}
                    handleChange={handleChange}
                    state_value={formState[field.field_data_props.name]}
                    error={error[field.field_data_props.name]}
                />
            )
        })
    )
}

const Field = ({ field, handleChange, state_value, error }) => {
    return (
        <>
            <div {...field.field_container_props}>
                {field.label_text && <label>{field.label_text}</label>}
                {
                    field.field_component === 'INPUT' &&
                    <input {...field.field_data_props} onChange={handleChange} value={state_value} />
                }
            </div>
            {
                error && (
                    Array.isArray(error)
                        ? error.map((e, i) => (
                            <div key={i}>
                                <span className='error-field'>
                                    {typeof e === 'object' && e.message ? e.message : String(e)}
                                </span>
                            </div>
                        ))
                        : typeof error === 'string'
                            ? <div><span className='error-field'>{error}</span></div>
                            : null
                )
            }
        </>
    )
}

export default Form