import '@/Styles/TemplateInfo.scss'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { getAllToursTemplates, getToursFromTemplate } from '@/Features/TourTemplates/tourTemplateSlice'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '@/Components/Spinner/Spinner'
import { MdOutlineCancel, MdOutlineEdit } from 'react-icons/md'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { FaRegCheckCircle } from 'react-icons/fa'

import formatTourDate from '@/Utils/formatTourDate'
import CustomModal from '@/Components/CustomModal/CustomModal'
import { cancelTour, completeTour, deleteTour, resetApiState } from '@/Features/Tours/tourSlice'

const TemplateInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { isError, isSuccess, message, errorType, successType } = useSelector(state => state.tour)
  const { templates, templateInfo, isLoading } = useSelector((state) => state.tourTemplate)

  const successTypesAllowed = ['COMPLETED_TOUR', 'CANCELED_TOUR', 'DELETED_TOUR']
  const errorTypesAllowed = ['COMPLETE_TOUR', 'CANCEL_TOUR', 'DELETE_TOUR']

  const [tourToUpdate, setTourToUpdate] = useState('')
  const [showModalComplete, setShowModalComplete] = useState(false)
  const [showModalCancel, setShowModalCancel] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)

  useEffect(() => {
    dispatch(getAllToursTemplates())
    dispatch(getToursFromTemplate(id))

    // return () => {
    //   dispatch(resetApiState())
    // }
  }, [])

  useEffect(() => {
    if (isError && errorTypesAllowed.includes(errorType)) {
      console.log(message)
      toast.error(message)
    }
    if (isSuccess && successTypesAllowed.includes(successType)) {
      toast.success(message)
      dispatch(resetApiState())
    }
    if (errorType !== 'AUTH') {
      dispatch(resetApiState())
    }
  }, [isError, isSuccess, message, errorType])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const toursIds = templates.map((template) => template._id)
  const tourIndex = toursIds.findIndex((tourId) => tourId === id)

  let tourData = {}

  if (tourIndex !== -1) {
    tourData = { ...templates[tourIndex] }
    // tourData.tours = [...templateInfo]
  }

  const [toursByTemplate, setToursByTemplate] = useState([])

  useEffect(() => {
    if (templateInfo.tours && templateInfo.tours.length > 0) {
      setToursByTemplate([...templateInfo.tours])
    }
  }, [templateInfo])

  if (isLoading) {
    return <Spinner />
  }
  if (tourIndex === -1 && !isLoading) {
    return (
      <div className='page-container'>
        <h2>Ups, el tour que buscas no existe</h2>
        <h3>Vuelve a la página de administración para ver otros tours</h3>
        <button className='btn btn-success btn-lg spaced' onClick={() => navigate('/tours')}>Ir a Tours</button>
      </div>
    )
  }

  // let sortedTours = []
  // if (tourData?.tours && tourData?.tours.length > 0) {
  //   sortedTours = [...tourData.tours]
  //   sortedTours.sort((tourA, tourB) => {
  //     if (tourA?.status?.status_code === 'Active' && tourB?.status?.status_code !== 'Active') return -1
  //     if (tourA?.status?.status_code !== 'Active' && tourB?.status?.status_code === 'Active') return 1
  //     if (tourA?.starting_date !== tourB?.starting_date) {
  //       return new Date(tourA?.starting_date) - new Date(tourB?.starting_date)
  //     }
  //     return 0
  //   })
  // }

  let sortedTours = []
  if (toursByTemplate && toursByTemplate.length > 0) {
    sortedTours = [...toursByTemplate]
    sortedTours.sort((tourA, tourB) => {
      if (tourA?.isActive && !tourB?.isActive) return -1
      if (!tourA?.isActive && tourB?.isActive) return 1
      if (tourA?.status?.status_code === 'Active' && tourB?.status?.status_code !== 'Active') return -1
      if (tourA?.status?.status_code !== 'Active' && tourB?.status?.status_code === 'Active') return 1
      if (tourA?.status?.status_code === 'Completed' && tourB?.status?.status_code !== 'Completed') return -1
      if (tourA?.status?.status_code !== 'Completed' && tourB?.status?.status_code === 'Completed') return 1
      if (tourA?.status?.status_code === 'Canceled' && tourB?.status?.status_code !== 'Canceled') return -1
      if (tourA?.status?.status_code !== 'Canceled' && tourB?.status?.status_code === 'Canceled') return 1
      if (tourA?.starting_date !== tourB?.starting_date) {
        return new Date(tourA?.starting_date) - new Date(tourB?.starting_date)
      }
      return 0
    })
  }

  const getClassName = (isActive, statusCode) => {
    let className = 'template-info-tour-card'
    if (!isActive) {
      if (statusCode === 'Completed') {
        className = className + ' template-info-tour-card-completed'
      } else if (statusCode === 'Canceled') {
        className = className + ' template-info-tour-card-canceled'
      } else {
        className = className + ' template-info-tour-card-inactive'
      }
    }
    return className
  }

  return (
    <div className='page-container'>
      <h2 className='bold-text space-down-md'>{tourData?.name}</h2>
      {((sortedTours && sortedTours.length > 0) && sortedTours.filter(tour => tour?.isActive).length > 0) && <h3>Tours activos</h3>}
      <div className='tour-info-cards-container'>
        {(sortedTours && sortedTours.length > 0) && sortedTours.filter(tour => tour?.isActive).map((tour, index) => (
          <div key={`tour-date-${index}`} className={getClassName(tour?.isActive, tour?.status?.status_code)}>
            <h4 className='space-down'>{formatTourDate(tour.starting_date, tourData?.duration)} de {new Date(tour.starting_date).getFullYear()}</h4>
            <p className='self-center small-text'><strong>Id:</strong> {tour._id}</p>
            <p><strong>Status:</strong> {tour.status.status_code}</p>
            <p><strong>Total de asientos:</strong> {tour.total_seats}</p>
            <p><strong>Precio:</strong> ${tour.price}</p>
            <p><strong>Precio para reservar:</strong> ${tour.min_payment}</p>
            <p><strong>Total de reservaciones:</strong> {tour.reservations?.length || 0}</p>
            <p><strong>Asientos reservados:</strong> {tour.reserved_seats_amount}</p>
            <p><strong>Asientos confirmados:</strong> {tour.confirmed_seats?.length || 0}</p>
            {/* {(tour.promos && tour.promos?.length > 0) &&
              <>
                <h5 className='space-up'>Promos</h5>
                {tour.promos.map((promo, index) => (
                  <p key={`promo-tour-${tour.id}-${index}`}>Tipo: {promo.type} Código: {promo.code}</p>
                ))}
              </>} */}

            <p><strong>isActive:</strong> {tour?.isActive ? 'true' : 'false'}</p>
            <div className='space-down' />
            {(user?.isAdmin && tour?.isActive) && <button className='btn btn-outline-secondary space-up self-center'><MdOutlineEdit /> Editar tour</button>}
            {(user?.isAdmin && tour?.isActive && tour?.status?.status_code !== 'Canceled' && tour?.status?.status_code !== 'Completed') &&
              <button
                className='btn btn-outline-success space-up self-center' onClick={() => {
                  setTourToUpdate(tour._id)
                  setShowModalComplete(true)
                }}
              >
                <FaRegCheckCircle /> Marcar como completo
              </button>}
            {(user?.isAdmin && tour?.isActive && tour?.status?.status_code !== 'Canceled' && tour?.status?.status_code !== 'Completed') &&
              <button
                className='btn btn-outline-danger space-up self-center' onClick={() => {
                  setTourToUpdate(tour._id)
                  setShowModalCancel(true)
                }}
              >
                <MdOutlineCancel /> Cancelar tour
              </button>}
            {(user?.isAdmin && tour?.isActive && tour?.status?.status_code === 'Canceled') &&
              <button
                className='btn btn-danger space-up self-center' onClick={() => {
                  setTourToUpdate(tour._id)
                  setShowModalDelete(true)
                }}
              >
                <DeleteOutlineOutlinedIcon /> Eliminar tour
              </button>}
          </div>
        ))}
      </div>
      {((sortedTours && sortedTours.length > 0) && sortedTours.filter(tour => !tour?.isActive).length > 0) && <h3 className='space-up-lg'>Tours inactivos</h3>}
      <div className='tour-info-cards-container'>
        {(sortedTours && sortedTours.length > 0) && sortedTours.filter(tour => !tour?.isActive).map((tour, index) => (
          <div key={`tour-date-${index}`} className={getClassName(tour?.isActive, tour?.status?.status_code)}>
            <h4 className='space-down'>{formatTourDate(tour.starting_date, tourData?.duration)} de {new Date(tour.starting_date).getFullYear()}</h4>
            <p className='self-center small-text'><strong>Id:</strong> {tour._id}</p>
            <p><strong>Status:</strong> {tour.status.status_code}</p>
            <p><strong>Total de asientos:</strong> {tour.total_seats}</p>
            <p><strong>Precio:</strong> ${tour.price}</p>
            <p><strong>Precio para reservar:</strong> ${tour.min_payment}</p>
            <p><strong>Total de reservaciones:</strong> {tour.reservations?.length || 0}</p>
            <p><strong>Asientos reservados:</strong> {tour.reserved_seats_amount}</p>
            <p><strong>Asientos confirmados:</strong> {tour.confirmed_seats?.length || 0}</p>
            {/* {(tour.promos && tour.promos?.length > 0) &&
              <>
                <h5 className='space-up'>Promos</h5>
                {tour.promos.map((promo, index) => (
                  <p key={`promo-tour-${tour.id}-${index}`}>Tipo: {promo.type} Código: {promo.code}</p>
                ))}
              </>} */}

            <p><strong>isActive:</strong> {tour?.isActive ? 'true' : 'false'}</p>
            <div className='space-down' />
            {(user?.isAdmin && tour?.isActive) && <button className='btn btn-outline-secondary space-up self-center'><MdOutlineEdit /> Editar tour</button>}
            {(user?.isAdmin && tour?.isActive && tour?.status?.status_code !== 'Canceled' && tour?.status?.status_code !== 'Completed') &&
              <button
                className='btn btn-outline-success space-up self-center' onClick={() => {
                  setTourToUpdate(tour._id)
                  setShowModalComplete(true)
                }}
              >
                <FaRegCheckCircle /> Marcar como completo
              </button>}
            {(user?.isAdmin && tour?.isActive && tour?.status?.status_code !== 'Canceled' && tour?.status?.status_code !== 'Completed') &&
              <button
                className='btn btn-outline-danger space-up self-center' onClick={() => {
                  setTourToUpdate(tour._id)
                  setShowModalCancel(true)
                }}
              >
                <MdOutlineCancel /> Cancelar tour
              </button>}
            {(user?.isAdmin && tour?.isActive && tour?.status?.status_code === 'Canceled') &&
              <button
                className='btn btn-danger space-up self-center' onClick={() => {
                  setTourToUpdate(tour._id)
                  setShowModalDelete(true)
                }}
              >
                <DeleteOutlineOutlinedIcon /> Eliminar tour
              </button>}
          </div>
        ))}
      </div>
      <CustomModal
        title='Marcar tour como completo'
        showModal={showModalComplete}
        setShowModal={setShowModalComplete}
        text='¿Estás seguro de que quieres marcar este tour como completo? Esta acción no se puede deshacer.'
        onYes={() => dispatch(completeTour(tourToUpdate))}
        textYes='Marcar tour como completo'
        textNo='Cancelar'
      />
      <CustomModal
        title='Cancelar tour'
        showModal={showModalCancel}
        setShowModal={setShowModalCancel}
        text='¿Estás seguro de que quieres cancelar este tour? Esta acción permanente cancelará todas las reservaciones asociadas, y podría generar obligaciones de devoluciones.'
        onYes={() => dispatch(cancelTour(tourToUpdate))}
        textYes='Cancelar tour'
        textNo='Descartar cambios'
        danger
      />
      <CustomModal
        title='Eliminar tour'
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
        text='¿Estás seguro de que quieres eliminar este tour? Esta acción no se puede deshacer.'
        onYes={() => dispatch(deleteTour(tourToUpdate))}
        textYes='Eliminar tour'
        textNo='Cancelar'
        danger
      />
    </div>

  )
}

export default TemplateInfo
