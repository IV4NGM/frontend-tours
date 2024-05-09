import '@/Styles/CreateReservation.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAllTours, resetApiState } from '@/Features/Tours/tourSlice'
import { getClient, resetApiState as resetApiStateClient } from '@/Features/Clients/clientSlice'
import { createReservation, resetApiState as resetApiStateReservation } from '@/Features/Reservations/reservationSlice'

import { toast } from 'react-toastify'
import Spinner from '@/Components/Spinner/Spinner'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined'
import { SlGraph } from 'react-icons/sl'
import { getAllToursTemplates } from '@/Features/TourTemplates/tourTemplateSlice'
import useGetCurrentFormattedDate from '@/Hooks/useGetCurrentFormattedDate'
import formatTourDate from '@/Utils/formatTourDate'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

const CreateReservation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentDate = useGetCurrentFormattedDate()

  const { templates } = useSelector((state) => state.tourTemplate)

  const { clientInfo, isError: isErrorClient, errorType: errorTypeClient, isLoading: isLoadingClient, message: messageClient } = useSelector(state => state.client)

  const { tours, isSuccess, successType, isError, message, errorType, isLoading } = useSelector((state) => state.tour)

  const { reservationInfo, isError: isErrorReservation, errorType: errorTypeReservation, isLoading: isLoadingReservation, message: messageReservation, isSuccess: isSuccessReservation, successType: successTypeReservation } = useSelector(state => state.reservation)

  const successTypesAllowed = ['CREATED_RESERVATION']
  const errorTypesAllowed = ['CREATE_RESERVATION', 'GET_CLIENT']

  const [selectedTemplate, setSelectedTemplate] = useState('default')
  const [selectedTour, setSelectedTour] = useState('default')
  const [clientNumber, setClientNumber] = useState('')
  const [clientData, setClientData] = useState({})
  const [addPromo, setAddPromo] = useState(false)

  const createReservationFormSchema = yup.object().shape({
    reserved_seats_amount: yup.string('Debes ingresar un número').required('Escribe la cantidad de asientos').matches(/^[1-9]\d*$/, 'La cantidad de asientos debe ser un número entero positivo').typeError('Debes ingresar un número'),
    tourTemplate: yup.string().required('Selecciona una plantilla').notOneOf(['default'], 'Selecciona una plantilla'),
    tour: yup.string().required('Selecciona una fecha').notOneOf(['default'], 'Selecciona una fecha'),
    promo_code: yup.string(),
    promo_amount: yup.string('Debes ingresar un número')
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(createReservationFormSchema),
    context: { addPromo }
  })

  const onSubmit = (data) => {
    const { tourTemplate, tour, promo_code: promoCode, promo_amount: promoAmount, ...dataToPost } = data
    dataToPost.reserved_seats_amount = Number(data.reserved_seats_amount) || 0
    if (!clientData?.name) {
      toast.error('Ingresa un cliente')
    } else if (addPromo && (!promoCode || !promoAmount)) {
      toast.error('Promoción inválida')
    } else {
      dataToPost.tour = tour
      dataToPost.phone = clientData?.phone_number
      if (addPromo) {
        dataToPost.promo_applied = {
          code: promoCode,
          amount: Number(promoAmount) || 0
        }
      }
      dispatch(createReservation(dataToPost))
      console.log(dataToPost)
    }
  }
  useEffect(() => {
    if (isError && errorTypesAllowed.includes(errorType)) {
      toast.error(message)
    }
    if (isSuccess && successTypesAllowed.includes(successType)) {
      toast.success(message)
      navigate('/reservations')
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

  useEffect(() => {
    if (isErrorClient && errorTypesAllowed.includes(errorTypeClient)) {
      toast.error(messageClient)
    }
    if (errorTypeClient !== 'AUTH') {
      dispatch(resetApiStateClient())
    }
  }, [isErrorClient, messageClient, errorTypeClient])

  useEffect(() => {
    if (isErrorReservation && errorTypesAllowed.includes(errorTypeReservation)) {
      toast.error(messageReservation)
    }
    if (isSuccessReservation && successTypesAllowed.includes(successTypeReservation)) {
      toast.success(messageReservation)
      navigate('/reservations')
    }
    if (errorTypeReservation !== 'AUTH') {
      dispatch(resetApiStateReservation())
    }
  }, [isErrorReservation, messageReservation, errorTypeReservation, isSuccessReservation, successTypeReservation])

  useEffect(() => {
    if (clientInfo) {
      setClientData(clientInfo)
    }
  }, [clientInfo])

  if (isLoading || isLoadingClient || isLoadingReservation) {
    return <Spinner />
  }

  const selectedTemplateInfo = tours.filter(tour => tour?.template_info?._id === selectedTemplate)[0]

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

  let selectedTourInfo = {}
  if (selectedTemplateInfo && selectedTemplateInfo?.tours) {
    selectedTourInfo = allTours.filter(tour => tour._id === selectedTour)[0]
  }

  const onSubmitGetClient = (event) => {
    event.preventDefault()
    dispatch(getClient(clientNumber))
  }

  return (
    <div className='page-container'>
      <h2 className='form-update-template-title'>Crear una nueva reservación</h2>
      <div className='form form-template form-update-template'>
        <div className='form-container'>
          <form
            onSubmit={onSubmitGetClient}
          >
            <h5 className='space-down'>Información del cliente</h5>

            <div className='form-floating'>
              <input
                type='text'
                name='clientPhone'
                placeholder='Número del cliente'
                id='clientPhone'
                className='form-control search-field-md'
                value={clientNumber}
                onChange={(event) => setClientNumber(event.target.value)}
              />
              <label htmlFor='clientPhone'>Número del cliente</label>
            </div>
            <button className='btn btn-primary space-up-md' type='submit' disabled={!clientNumber} onClick={onSubmitGetClient}><AddOutlinedIcon /> Agregar cliente</button>
          </form>
        </div>
      </div>
      {clientData &&
        <div className='form form-container client-info'>
          <h5 className='self-center'>Cliente</h5>
          {clientData?.name && <p><AccountBoxOutlinedIcon /> <strong>Nombre:</strong> {clientData?.name}</p>}
          {clientData?.email && <p><EmailOutlinedIcon /> <strong>Email:</strong> {clientData?.email}</p>}
          {clientData?.reputation && <p><SlGraph /> <strong>Reputación:</strong> {clientData?.reputation}</p>}
        </div>}

      <div className='form form-template form-update-template'>
        <div className='form-container'>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <h5 className='space-down'>Información del tour</h5>
            <select {...register('tourTemplate')} className='form-select' onChange={(event) => setSelectedTemplate(event.target.value)} value={selectedTemplate}>
              <option value='default' defaultChecked>Selecciona una plantilla</option>
              {templates && templates.map((template, index) => {
                return (<option value={template?._id} key={`template-index-${index}`}>{template?.name}</option>)
              })}
            </select>
            <p className='warning-text'>{errors.tourTemplate?.message}</p>

            {selectedTemplate !== 'default' &&
              <>
                <p className='self-start'><strong>Duración en días:</strong> {selectedTemplateInfo?.template_info?.duration}</p>
                <select {...register('tour')} className='form-select space-up' onChange={(event) => setSelectedTour(event.target.value)} value={selectedTour}>
                  <option value='default' defaultChecked>Selecciona una fecha</option>
                  {allTours && allTours.map((tour, index) => {
                    return (<option value={tour?._id} key={`tour-${index}-template-${selectedTemplateInfo?._id}`}>{formatTourDate(tour.starting_date, selectedTemplateInfo?.template_info?.duration)} de {new Date(tour.starting_date).getFullYear()}</option>)
                  })}
                </select>
                <p className='warning-text'>{errors.tour?.message}</p>
                <p className='self-start'><strong>Id del tour:</strong> {selectedTourInfo?._id}</p>
              </>}

            <div className='form-floating'>
              <input
                type='text'
                name='reserved_seats_amount'
                placeholder='Cantidad de asientos'
                id='reserved_seats_amount'
                className='form-control'
                {...register('reserved_seats_amount')}
              />
              <label htmlFor='reserved_seats_amount'>Cantidad de asientos</label>
            </div>
            <p className='warning-text'>{errors.reserved_seats_amount?.message}</p>

            <div className='form-check self-start'>
              <input className='form-check-input ' type='checkbox' id='applyPromo' value={addPromo} onChange={() => setAddPromo(!addPromo)} />
              <label className='form-check-label' htmlFor='applyPromo'>
                Aplicar promoción
              </label>
            </div>

            {addPromo &&
              <>
                <div className='form-floating space-up'>
                  <input
                    type='text'
                    name='promo_code'
                    placeholder='Código de la promoción'
                    id='promo_code'
                    className='form-control'
                    {...register('promo_code')}
                  />
                  <label htmlFor='promo_code'>Código de la promoción</label>
                </div>
                <p className='warning-text'>{errors.promo_code?.message}</p>
                <div className='form-floating space-up'>
                  <input
                    type='text'
                    name='promo_amount'
                    placeholder='Cantidad de promociones'
                    id='promo_amount'
                    className='form-control'
                    {...register('promo_amount')}
                  />
                  <label htmlFor='promo_amount'>Cantidad de promociones</label>
                </div>
                <p className='warning-text'>{errors.promo_amount?.message}</p>
              </>}

            <button type='submit' className='btn btn-success space-up-md'>
              <AddOutlinedIcon /> Crear reservación
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateReservation
