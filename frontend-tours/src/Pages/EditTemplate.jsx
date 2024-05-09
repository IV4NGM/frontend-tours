import '@/Styles/CreateTemplate.scss'
import airplane from '@/assets/airplane.jpg'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import { MdOutlineEdit } from 'react-icons/md'
import Spinner from '@/Components/Spinner/Spinner'
import { getOneTourTemplate, resetApiState, updateTemplate, deleteTemplate } from '@/Features/TourTemplates/tourTemplateSlice'
import MultipleFieldsInput from '@/Components/MultipleFieldsInput/MultipleFieldsInput'
import CustomModal from '@/Components/CustomModal/CustomModal'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const EditTemplate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams()

  const { templates, isSuccess, successType, isError, message, errorType, isLoading } = useSelector((state) => state.tourTemplate)

  const successTypesAllowed = ['UPDATED_TEMPLATE', 'DELETED_TEMPLATE']
  const errorTypesAllowed = ['UPDATE_TEMPLATE', 'DELETE_TEMPLATE']

  const [mainImageUrl, setMainImageUrl] = useState('')
  const [isInternational, setIsInternational] = useState(false)

  const [userMainImageUrl, setUserMainImageUrl] = useState('')

  const [showModalDelete, setShowModalDelete] = useState(false)

  yup.addMethod(yup.string, 'stripEmptyString', function () {
    return this.transform((value) => (value === '' ? undefined : value))
  })

  const [template, setTemplate] = useState({})

  const editTemplateFormSchema = yup.object().shape({
    name: yup.string().required('Escribe el nombre del tour').stripEmptyString().default(template?.name),
    exercise_level: yup.string().required('Escribe el nivel de ejercicio').stripEmptyString().default(template?.exercise_level),
    recommended_for: yup.string().required('Escribe para quiénes está recomendado').stripEmptyString().default(template?.recommended_for),
    duration: yup.string('Debes ingresar un número').required('Escribe la duración en días').matches(/^[1-9]\d*$/, 'La duración debe ser un número entero positivo').typeError('Debes ingresar un número'),
    description: yup.string().required('Escribe la descripción del tour').stripEmptyString().default(template?.description),
    main_image: yup.string().required('Ingresa una imagen principal').stripEmptyString().default(template?.main_image),
    secondary_images: yup.array(),
    cities: yup.array(),
    states: yup.array(),
    countries: yup.array(),
    continents: yup.array(),
    isInternational: yup.boolean().default(template?.isInternational)
  })

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(editTemplateFormSchema),
    defaultValues: {
      name: template?.name,
      exercise_level: template?.exercise_level,
      recommended_for: template?.recommended_for,
      duration: template?.duration,
      description: template?.description,
      main_image: template?.main_image,
      secondary_images: template?.secondary_images,
      cities: template?.cities,
      states: template?.states,
      countries: template?.countries,
      isInternational: template?.isInternational
    }
  })

  const onSubmit = (data) => {
    const formattedData = { ...data }
    formattedData.isInternational = isInternational
    formattedData.id = id
    formattedData.duration = Number(data.duration)
    dispatch(updateTemplate(formattedData))
    console.log(formattedData)
  }

  useEffect(() => {
    dispatch(getOneTourTemplate(id))
  }, [])

  useEffect(() => {
    if (successType === 'GET_ONE_TEMPLATE') {
      const retrievedTemplate = templates.filter(template => template._id === id)[0]
      setTemplate(retrievedTemplate)
      setValue('duration', retrievedTemplate.duration)
      setValue('secondary_images', retrievedTemplate.secondary_images)
      setValue('cities', retrievedTemplate.cities)
      setValue('states', retrievedTemplate.states)
      setValue('countries', retrievedTemplate.countries)
      setValue('continents', retrievedTemplate.continents)
      setValue('isInternational', retrievedTemplate.isInternational)
    }
    dispatch(resetApiState())
  }, [successType])

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
    if (template) {
      setMainImageUrl(template.main_image || '')
      setIsInternational(template.isInternational || false)
    }
    setUserMainImageUrl(mainImageUrl)
  }, [mainImageUrl, template])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='page-container'>
      <h2 className='form-update-template-title'>Modificar plantilla</h2>
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
                defaultValue={template?.name}
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
                defaultValue={template?.duration}
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
                defaultValue={template?.exercise_level}
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
                defaultValue={template?.recommended_for}
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
                defaultValue={template?.description}
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
                value={userMainImageUrl}
                onChange={(event) => setUserMainImageUrl(event.target.value)}
              />
              <label htmlFor='main_image'>URL de la imagen principal</label>
            </div>
            <img
              src={userMainImageUrl || airplane || ''} className='edit-image' alt='Tour-image' onError={({ currentTarget }) => {
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
              <MdOutlineEdit /> Modificar plantilla
            </button>

            <div className='flex-row buttons-row'>
              <button type='button' className='btn btn-secondary' onClick={() => navigate('/tours')}><CancelOutlinedIcon /> Descartar cambios</button>
              <button type='button' className='btn btn-outline-danger' onClick={() => setShowModalDelete(true)}><DeleteOutlineOutlinedIcon /> Eliminar plantilla</button>
            </div>

          </form>
        </div>
      </div>
      <CustomModal
        title='Eliminar plantilla'
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
        text='¿Estás seguro de que quieres eliminar esta plantilla? Esta acción no se puede deshacer.'
        onYes={() => dispatch(deleteTemplate(id))}
        textYes='Eliminar plantilla'
        textNo='Cancelar'
        danger
      />
    </div>
  )
}

export default EditTemplate
