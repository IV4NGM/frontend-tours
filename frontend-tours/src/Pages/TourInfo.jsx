import { toast } from 'react-toastify'
import { FaRegCalendarAlt, FaCheck, FaCity, FaMapMarked, FaBusAlt } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { RiRunFill } from 'react-icons/ri'
import { BiWorld } from 'react-icons/bi'

import { useSelector, useDispatch } from 'react-redux'
import { getAllTours, resetApiState } from '@/Features/Tours/tourSlice'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '@/Components/Spinner/Spinner'
import useGetCurrentFormattedDate from '@/Hooks/useGetCurrentFormattedDate'
import TourInfoImagesCarousel from '@/Components/TourInfoImagesCarousel/TourInfoImagesCarousel'

import '@/Styles/TourInfo.scss'
import TourDateDetails from '@/Components/TourDateDetails/TourDateDetails'
import WhatsAppButton from '@/Components/WhatsAppButton/WhatsAppButton'

const TourInfo = () => {
  const { id } = useParams()
  const currentDate = useGetCurrentFormattedDate()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { tours, isError, isLoading, isSuccess, message, errorType } = useSelector((state) => state.tour)

  const errorTypesAllowed = ['GET_TOURS']

  useEffect(() => {
    dispatch(getAllTours({ current_date: currentDate }))

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

  const toursIds = tours.map((tour) => tour._id)
  const tourIndex = toursIds.findIndex((tourId) => tourId === id)

  let tourData = {}

  if (tourIndex !== -1) {
    tourData = tours[tourIndex]
  }
  if (isLoading) {
    return <Spinner />
  }
  if (tourIndex === -1 && !isLoading) {
    return (
      <div className='page-container'>
        <h2>Ups, el tour que buscas no existe</h2>
        <h3>Vuelve al inicio para encontrar tu próxima aventura</h3>
        <button className='btn btn-success btn-lg spaced' onClick={() => navigate('/')}>Ir a Inicio</button>
      </div>
    )
  }

  let images = []
  images.push(tourData?.template_info?.main_image)
  images = images.concat(tourData?.template_info?.secondary_images)

  let allTours = tourData.tours.filter(tour => tour?.status?.status_code === 'Active' && tour?.total_seats - tour?.reserved_seats_amount > 0)
  if (allTours.length > 0) {
    allTours = allTours.sort((tourA, tourB) => new Date(tourA?.starting_date) - new Date(tourB?.starting_date))
  }

  return (
    <div className='page-container'>
      <h2 className='bold-text space-down'>{tourData?.template_info?.name}</h2>
      <TourInfoImagesCarousel images={images} name={tourData?.template_info?.name} />
      <div className='tour-description'>
        <p className='property-name'>Tour</p>
        <p><FaBusAlt /> {tourData?.template_info?.name}</p>
        <p className='property-name'>Duración</p>
        <p><FaRegCalendarAlt /> {tourData?.template_info?.duration} {tourData?.template_info?.duration === 1 ? 'día' : 'días'}</p>
        <p className='property-name'>Nivel de ejercicio</p>
        <p><RiRunFill /> {tourData?.template_info?.exercise_level}</p>
        <p className='property-name'>Recomendado</p>
        <p><FaCheck /> {tourData?.template_info?.recommended_for}</p>
        <p className='property-name'>Estados a visitar</p>
        <p><IoLocationOutline /> {tourData?.template_info?.states.join(', ')} </p>
        <p className='property-name'>Ciudades a visitar</p>
        <p><FaCity /> {tourData?.template_info?.cities.join(', ')} </p>
        {tourData?.template_info?.countries.length > 1 &&
          <>
            <p className='property-name'>Países</p>
            <p><FaMapMarked /> {tourData?.template_info?.countries.join(', ')} </p>
          </>}
        {tourData?.template_info?.continents.length > 1 &&
          <>
            <p className='property-name'>Continentes</p>
            <p><BiWorld /> {tourData?.template_info?.continents.join(', ')} </p>
          </>}
        <p className='property-name'>Descripción</p>
        <p className='display-linebreak'>{tourData?.template_info?.description} </p>
      </div>
      <h3 className='space-up-lg'>Próximas fechas</h3>
      <div className='next-dates-container'>
        {allTours.length === 0 && <p className='medium-text'>¡Pronto abriremos más fechas para este tour!</p>}
        {allTours.length > 0 && allTours.map((tour, index) => (
          <TourDateDetails tour={tour} tourData={tourData} key={`tour-date-${index}`} />
        ))}
      </div>
      {allTours.length > 0 && <WhatsAppButton text='¡Reservar ahora!' />}
    </div>
  )
}

export default TourInfo
