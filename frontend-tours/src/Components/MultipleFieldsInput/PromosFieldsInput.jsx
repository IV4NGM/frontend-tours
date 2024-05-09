import './PromosFieldInput.scss'
import { useFieldArray } from 'react-hook-form'

const PromosFieldsInput = ({ control, register, errors, strict = false }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'promos',
    control
  })
  return (
    <>
      {fields.map((field, index) => (
        <div className='form-promo-container' key={field.id}>
          <select className='form-select' {...register(`promos.${index}.type`)}>
            <option value='default' defaultChecked>Selecciona el tipo de promoción</option>
            <option value='2x1'>2X1</option>
            <option value='discount'>Descuento en total</option>
            <option value='percentageDiscount'>Descuento en porcentaje</option>
          </select>
          {errors.promos && <p className='warning-text'>{errors.promos[index]?.type?.message}</p>}

          <div className='form-floating space-up'>
            <input
              type='text'
              placeholder='Valor de la promo'
              className='form-control'
              {...register(`promos.${index}.value`)}
              id={`promos-field-${index}`}
            />
            <label htmlFor={`promos-field-${index}`}>Valor de la promo</label>
          </div>
          {errors.promos && <p className='warning-text'>{errors.promos[index]?.value?.message}</p>}

          <div className='form-floating space-up'>
            <input
              type='text'
              placeholder='Cantidad de promos'
              className='form-control'
              {...register(`promos.${index}.amount`)}
              id={`promos-field-amount-${index}`}
            />
            <label htmlFor={`promos-field-amount-${index}`}>Cantidad de promos</label>
          </div>
          {errors.promos && <p className='warning-text'>{errors.promos[index]?.amount?.message}</p>}
          <div className='form-floating space-up'>
            <input
              type='text'
              placeholder='Cantidad máxima por reservación'
              className='form-control'
              {...register(`promos.${index}.maxUsesPerReservation`)}
              id={`promos-field-max-${index}`}
            />
            <label htmlFor={`promos-field-max-${index}`}>Cantidad máxima por reservación</label>
          </div>
          {errors.promos && <p className='warning-text'>{errors.promos[index]?.maxUsesPerReservation?.message}</p>}
          <div className='form-floating space-up'>
            <input
              type='text'
              placeholder='Código de la promo'
              className='form-control'
              {...register(`promos.${index}.code`)}
              id={`promos-field-code-${index}`}
            />
            <label htmlFor={`promos-field-code-${index}`}>Código de la promo</label>
          </div>
          {errors.promos && <p className='warning-text'>{errors.promos[index]?.code?.message}</p>}

          <select className='form-select space-up' {...register(`promos.${index}.show`)}>
            <option value>Mostrar promoción</option>
            <option value={false}>No mostrar promoción</option>
          </select>
          {errors.promos && <p className='warning-text'>{errors.promos[index]?.show?.message}</p>}
          {!strict && <button className='btn btn-outline-danger space-up' type='button' onClick={() => remove(index)}>Eliminar promoción</button>}
          {(strict && index > 0) && <button className='btn btn-outline-danger space-up' type='button' onClick={() => remove(index)}>Eliminar promoción</button>}
        </div>
      ))}
      <button className='btn btn-outline-secondary' type='button' onClick={() => append('')}>Agregar promoción</button>
    </>
  )
}

export default PromosFieldsInput
