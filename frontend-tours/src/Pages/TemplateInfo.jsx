import '@/Styles/TemplateInfo.scss'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { getAllToursTemplates, getToursFromTemplate, resetApiState } from '@/Features/TourTemplates/tourTemplateSlice'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '@/Components/Spinner/Spinner'
import { MdOutlineCancel } from 'react-icons/md'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { FaRegCheckCircle } from 'react-icons/fa'

import formatTourDate from '@/Utils/formatTourDate'

const TemplateInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { templates, templateInfo, isError, isLoading, isSuccess, message, errorType } = useSelector((state) => state.tourTemplate)

  const errorTypesAllowed = ['GET_TOURS_FROM_TEMPLATE']

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
      if (tourA?.starting_date !== tourB?.starting_date) {
        return new Date(tourA?.starting_date) - new Date(tourB?.starting_date)
      }
      return 0
    })
  }

  return (
    <div className='page-container'>
      <h2 className='bold-text space-down'>{tourData?.name}</h2>
      <div className='tour-info-cards-container'>
        {(sortedTours && sortedTours.length > 0) && sortedTours.map((tour, index) => (
          <div key={`tour-date-${index}`} className='template-info-tour-card'>
            <h4>{formatTourDate(tour.starting_date, tourData?.duration)}</h4>
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
            {(user?.isAdmin && tour?.isActive && tour?.status?.status_code !== 'Canceled' && tour?.status?.status_code !== 'Completed') && <button className='btn btn-outline-success space-up self-center'><FaRegCheckCircle /> Marcar como completo</button>}
            {(user?.isAdmin && tour?.isActive && tour?.status?.status_code !== 'Canceled' && tour?.status?.status_code !== 'Completed') && <button className='btn btn-outline-danger space-up self-center'><MdOutlineCancel /> Cancelar tour</button>}
            {(user?.isAdmin && tour?.isActive && tour?.status?.status_code === 'Canceled') && <button className='btn btn-outline-secondary space-up self-center'><DeleteOutlineOutlinedIcon /> Eliminar tour</button>}
          </div>
        ))}
      </div>

    </div>
  )
}

export default TemplateInfo
