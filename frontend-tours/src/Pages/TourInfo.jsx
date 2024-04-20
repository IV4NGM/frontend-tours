import { toast } from 'react-toastify'
import { FaPlus, FaRegCalendarAlt } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'

import { useSelector, useDispatch } from 'react-redux'
import { getAllTours, resetApiState } from '@/Features/Tours/tourSlice'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '@/Components/Spinner/Spinner'

const TourInfo = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { tours, isError, isLoading, isSuccess, message, errorType } = useSelector((state) => state.tour)

  const errorTypesAllowed = ['GET_TOURS']

  useEffect(() => {
    dispatch(getAllTours())

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
      // dispatch(resetApiState())
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
  return (
    <div className='page-container'>
      <img src={tourData?.template_info?.main_image} alt={tourData?.template_info?.name} className='main-image' />
      <p className='bold-text'>{tourData?.template_info?.name}</p>
      <p><FaRegCalendarAlt /> {tourData?.template_info?.duration} {tourData?.template_info?.duration === 1 ? 'día' : 'días'}</p>
      <p><IoLocationOutline /> {tourData?.template_info?.states.join(', ')} </p>
    </div>
  )
}

export default TourInfo
