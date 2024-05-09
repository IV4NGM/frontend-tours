import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAllTours, resetApiState } from '@/Features/Tours/tourSlice'

import { toast } from 'react-toastify'
import Spinner from '@/Components/Spinner/Spinner'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined'
import { getAllToursTemplates } from '@/Features/TourTemplates/tourTemplateSlice'
import useGetCurrentFormattedDate from '@/Hooks/useGetCurrentFormattedDate'
import formatTourDate from '@/Utils/formatTourDate'

const CreateReservation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentDate = useGetCurrentFormattedDate()

  const { templates } = useSelector((state) => state.tourTemplate)

  const { isSuccess, successType, isError, message, errorType, isLoading } = useSelector((state) => state.tour)

  const successTypesAllowed = ['CREATED_RESERVATION']
  const errorTypesAllowed = ['CREATE_RESERVATION']

  const [selectedTemplate, setSelectedTemplate] = useState('default')
  const [selectedTour, setSelectedTour] = useState('default')
  const [client, setClient] = useState('')

  const createReservationFormSchema = yup.object().shape({
    // tourTemplate: yup.string().required('Selecciona una plantilla').notOneOf(['default'], 'Selecciona una plantilla'),
    // total_seats: yup.string('Debes ingresar un número').required('Escribe la cantidad de asientos').matches(/^[1-9]\d*$/, 'La cantidad de asientos debe ser un número entero positivo').typeError('Debes ingresar un número'),
    // price: yup.string('Debes ingresar un número').required('Escribe el precio por persona').matches(/^[1-9]\d*(\.\d{1,2})?$/, 'El precio debe ser un número con máximo 2 decimales').typeError('Debes ingresar un número'),
    // min_payment: yup.string('Debes ingresar un número').required('Escribe el precio para reservar').matches(/^[1-9]\d*(\.\d{1,2})?$/, 'El precio debe ser un número con máximo 2 decimales').typeError('Debes ingresar un número'),
    // // starting_date: yup.object(),
    // promos: yup.array().of(
    //   yup.object().shape({
    //     type: yup.string().oneOf(['2x1', 'discount', 'percentageDiscount'], 'Selecciona el tipo de promoción'),
    //     value: yup.string('Debes ingresar un número').required('Escribe el valor de la promoción').matches(/^[1-9]\d*$/, 'El valor de la promo debe ser un número entero positivo').typeError('Debes ingresar un número').default(1),
    //     amount: yup.string('Debes ingresar un número').required('Escribe la cantidad de promos').matches(/^[1-9]\d*$/, 'La cantidad debe ser un número entero positivo').typeError('Debes ingresar un número'),
    //     maxUsesPerReservation: yup.string('Debes ingresar un número').required('Escribe la cantidad máxima de usos por reservación').matches(/^[1-9]\d*$/, 'La cantidad debe ser un número entero positivo').typeError('Debes ingresar un número'),
    //     code: yup.string().required('Escribe un código para la promoción'),
    //     show: yup.boolean()
    //   })
    // )
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(createReservationFormSchema)
  })

  const onSubmit = (data) => {
    const formattedData = { ...data }
    // formattedData.template_id = data.tourTemplate
    // formattedData.total_seats = Number(data.total_seats)
    // formattedData.price = Number(data.price)
    // formattedData.min_payment = Number(data.min_payment)

    // const utcDate = new Date(startingDate)
    // utcDate.setUTCHours(0, 0, 0, 0) // Set time to 00:00:00:000 in UTC
    // formattedData.starting_date = utcDate.toUTCString()

    // formattedData.promos = data.promos.map(promo => {
    //   return ({
    //     type: promo.type,
    //     value: Number(promo.value),
    //     amount: Number(promo.amount),
    //     maxUsesPerReservation: Number(promo.maxUsesPerReservation),
    //     code: promo.code,
    //     show: promo.show
    //   })
    // })
    // dispatch(createTour(formattedData))
    console.log(formattedData)
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

  useEffect(() => {
    dispatch(getAllToursTemplates())
    dispatch(getAllTours({ current_date: currentDate }))
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  const selectedTemplateInfo = templates.filter(template => template._id === selectedTemplate)[0]

  let allTours = []

  // const [allTours, setAllTours] = useState([])
  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  if (selectedTemplateInfo && selectedTemplateInfo?.tours) {
    allTours = selectedTemplateInfo.tours.filter(tour => tour?.status?.status_code === 'Active' && tour?.total_seats - tour?.reserved_seats_amount > 0)
  }

  if (allTours.length > 0) {
    allTours = allTours.sort((tourA, tourB) => new Date(tourA?.starting_date) - new Date(tourB?.starting_date))
  }

  console.log(selectedTemplateInfo)
  console.log(allTours)

  return (
    <div className='page-container'>
      <h2 className='form-update-template-title'>Crear un nuevo tour</h2>
      <div className='form form-template form-update-template'>
        <div className='form-container'>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <select {...register('tourTemplate')} className='form-select spaced' onChange={(event) => setSelectedTemplate(event.target.value)} value={selectedTemplate}>
              <option value='default' defaultChecked>Selecciona una plantilla</option>
              {templates && templates.map((template, index) => {
                return (<option value={template?._id} key={`template-index-${index}`}>{template?.name}</option>)
              })}
            </select>
            <p className='warning-text'>{errors.tourTemplate?.message}</p>

            {selectedTemplate !== 'default' &&
              <>
                <div className='form-floating space-down'>
                  <input
                    type='text'
                    placeholder='Duración del tour en días'
                    id='duration_info'
                    className='form-control'
                    value={selectedTemplateInfo?.duration}
                    disabled
                  />
                  <label htmlFor='duration_info'>Duración del tour en días</label>
                </div>
                <select {...register('tour')} className='form-select spaced' onChange={(event) => setSelectedTour(event.target.value)} value={selectedTour}>
                  <option value='default' defaultChecked>Selecciona una fecha</option>
                  {allTours && allTours.map((tour, index) => {
                    return (<option value={tour?._id} key={`tour-${index}-template-${selectedTemplateInfo?._id}`}>{formatTourDate(tour.starting_date, selectedTemplateInfo?.duration)}</option>)
                  })}
                </select>
              </>}

            <button type='submit' className='btn btn-success space-up-lg'>
              <AddOutlinedIcon /> Crear reservación
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateReservation
