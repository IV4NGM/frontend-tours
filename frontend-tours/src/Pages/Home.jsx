import ImagesCarousel from '@/Components/Carousel/ImagesCarousel'
import OurInfoCard from '@/Components/OurInfoCard/OurInfoCard'
import ToursContainerHome from '@/Components/ToursContainerHome/ToursContainerHome'
import '@/Styles/Home.scss'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { getAllTours, resetApiState } from '@/Features/Tours/tourSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useGetCurrentFormattedDate from '@/Hooks/useGetCurrentFormattedDate'
import WhatsAppButton from '@/Components/WhatsAppButton/WhatsAppButton'

const Home = () => {
  const dispatch = useDispatch()
  const currentDate = useGetCurrentFormattedDate()
  const { tours, isError, isSuccess, message, errorType } = useSelector((state) => state.tour)

  const errorTypesAllowed = ['GET_TOURS']

  useEffect(() => {
    dispatch(getAllTours({ current_date: currentDate }))

    return () => {
      dispatch(resetApiState())
    }
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

  return (
    <div className='page-container'>
      <h2>Explorers Tours: Tu siguiente aventura</h2>
      <ImagesCarousel />
      <h2 className='space-up-lg'>Planea tu siguiente aventura con los mejores precios</h2>
      <OurInfoCard />
      <div className='advanced-search-invitation space-up-lg'>
        <h2 className='space-down-lg'>¿Buscas alguna fecha en especial para tu viaje?</h2>
        <h4>Prueba nuestra <Link to='/search' className='link'>búsqueda avanzada</Link>, o bien, ¡contáctanos!</h4>
      </div>
      <WhatsAppButton text='Enviar mensaje' />
      <h2 className='space-up-lg space-down-lg'>Consulta nuestro catálogo</h2>
      <ToursContainerHome />
    </div>
  )
}

export default Home
