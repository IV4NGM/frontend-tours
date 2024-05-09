import { useFieldArray } from 'react-hook-form'

const MultipleFieldsInput = ({ name, title, placeholder, control, register, strict = false }) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control
  })
  return (
    <>
      {fields.map((field, index) => (
        <div className='form-floating' key={field.id}>
          <input
            type='text'
            placeholder={placeholder}
            className='form-control'
            {...register(`${name}.${index}`)}
            id={`${name}-field-${index}`}
          />
          <label htmlFor={`${name}-field-${index}`}>{placeholder}</label>
          {!strict && <button className='btn btn-outline-danger' type='button' onClick={() => remove(index)}>Eliminar {title}</button>}
          {(strict && index > 0) && <button className='btn btn-outline-danger' type='button' onClick={() => remove(index)}>Eliminar {title}</button>}
        </div>
      ))}
      <button className='btn btn-outline-secondary' type='button' onClick={() => append('')}>Agregar {title}</button>
    </>
  )
}

export default MultipleFieldsInput
