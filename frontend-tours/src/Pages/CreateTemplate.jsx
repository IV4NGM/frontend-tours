import '@/Styles/CreateTemplate.scss'
import airplane from '@/assets/airplane.jpg'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import Spinner from '@/Components/Spinner/Spinner'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined'
import { createTemplate, resetApiState } from '@/Features/TourTemplates/tourTemplateSlice'
import MultipleFieldsInput from '@/Components/MultipleFieldsInput/MultipleFieldsInput'

const CreateTemplate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isSuccess, successType, isError, message, errorType, isLoading } = useSelector((state) => state.tourTemplate)

  const successTypesAllowed = ['CREATED_TEMPLATE']
  const errorTypesAllowed = ['CREATE_TEMPLATE']

  const [mainImageUrl, setMainImageUrl] = useState('')
  const [isInternational, setIsInternational] = useState(false)

  const registerTemplateFormSchema = yup.object().shape({
    name: yup.string().required('Escribe el nombre del tour'),
    exercise_level: yup.string().required('Escribe el nivel de ejercicio').default('Normal'),
    recommended_for: yup.string().required('Escribe para quiénes está recomendado').default('Para toda la familia'),
    duration: yup.string('Debes ingresar un número').required('Escribe la duración en días').matches(/^[1-9]\d*$/, 'La duración debe ser un número entero positivo').typeError('Debes ingresar un número'),
    description: yup.string().required('Escribe la descripción del tour'),
    main_image: yup.string().required('Ingresa una imagen principal'),
    secondary_images: yup.array(),
    cities: yup.array(),
    states: yup.array(),
    countries: yup.array(),
    continents: yup.array(),
    isInternational: yup.boolean().default(false)
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(registerTemplateFormSchema)
  })

  const onSubmit = (data) => {
    const formattedData = { ...data }
    formattedData.isInternational = isInternational
    dispatch(createTemplate(formattedData))
  }

  useEffect(() => {
    if (isError && errorTypesAllowed.includes(errorType)) {
      toast.error(message)
    }
    if (isSuccess && successTypesAllowed.includes(successType)) {
      toast.success(message)
      navigate('/tours')
    }
    if (errorType !== 'AUTH') {
      dispatch(resetApiState())
    }
  }, [isError, isSuccess, message, errorType])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='page-container'>
      <h2 className='form-update-template-title'>Crear una nueva plantilla</h2>
      <div className='form form-template form-update-template'>
        <div className='form-container'>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='form-floating'>
              <input
                type='text'
                name='name'
                placeholder='Nombre del tour'
                id='name'
                className='form-control'
                {...register('name')}
              />
              <label htmlFor='name'>Nombre del tour</label>
            </div>
            <p className='warning-text'>{errors.name?.message}</p>

            <div className='form-floating form-average-score'>
              <input
                type='text'
                name='duration'
                placeholder='Duración del tour en días'
                id='duration'
                className='form-control'
                {...register('duration')}
              />
              <label htmlFor='duration'>Duración del tour en días</label>
            </div>
            <p className='warning-text'>{errors.duration?.message}</p>

            <div className='form-floating'>
              <input
                type='text'
                name='exercise_level'
                placeholder='Nivel de ejercicio'
                id='exercise_level'
                className='form-control'
                {...register('exercise_level')}
                defaultValue='Normal'
              />
              <label htmlFor='exercise_level'>Nivel de ejercicio</label>
            </div>
            <p className='warning-text'>{errors.exercise_level?.message}</p>

            <div className='form-floating'>
              <input
                type='text'
                name='recommended_for'
                placeholder='Recomendado para:'
                id='recommended_for'
                className='form-control'
                {...register('recommended_for')}
                defaultValue='Para toda la familia'
              />
              <label htmlFor='recommended_for'>Recomendado para:</label>
            </div>
            <p className='warning-text'>{errors.recommended_for?.message}</p>

            <div className='form-floating'>
              <textarea
                name='description'
                placeholder='Descripción del tour'
                id='description'
                className='form-control'
                {...register('description')}
              />
              <label htmlFor='description'>Descripción del tour</label>
            </div>
            <p className='warning-text'>{errors.description?.message}</p>

            <p className='medium-text'>Imagen principal</p>
            <div className='form-floating'>
              <input
                type='text'
                name='main_image'
                placeholder='URL de la imagen principal'
                id='main_image'
                className='form-control'
                {...register('main_image')}
                value={mainImageUrl}
                onChange={(event) => setMainImageUrl(event.target.value)}
              />
              <label htmlFor='main_image'>URL de la imagen principal</label>
            </div>
            <img
              src={mainImageUrl || airplane || ''} className='edit-image' alt='Tour-image' onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = airplane
              }}
            />
            <p className='warning-text'>{errors.main_image?.message}</p>

            <p className='medium-text'>Imágenes secundarias</p>
            <MultipleFieldsInput name='secondary_images' title='imagen' placeholder='URL de la imagen secundaria' control={control} register={register} />

            <p className='medium-text'>Ciudades</p>
            <MultipleFieldsInput name='cities' title='ciudad' placeholder='Nombre de la ciudad' control={control} register={register} />

            <p className='medium-text'>Estados</p>
            <MultipleFieldsInput name='states' title='estado' placeholder='Nombre del estado' control={control} register={register} />

            <div className='form-check'>
              <label className='form-check-label' htmlFor='type-national'>
                Nacional
              </label>
              <input
                className='form-check-input' type='radio' name='isInternational' id='type-national'
                onChange={() => setIsInternational(false)}
                checked={!isInternational}
                value={false}
              />
            </div>

            <div className='form-check'>
              <label className='form-check-label' htmlFor='type-international'>
                Internacional
              </label>
              <input
                className='form-check-input' type='radio' name='isInternational' id='type-international'
                onChange={() => setIsInternational(true)}
                checked={isInternational}
                value
              />
            </div>

            {isInternational &&
              <>
                <p className='medium-text'>Países</p>
                <MultipleFieldsInput name='countries' title='país' placeholder='Nombre del país' control={control} register={register} />

                <p className='medium-text'>Continentes</p>
                <MultipleFieldsInput name='continents' title='continente' placeholder='Nombre del continente' control={control} register={register} />
              </>}

            <button type='submit' className='btn btn-success'>
              <AddOutlinedIcon /> Crear plantilla
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTemplate
