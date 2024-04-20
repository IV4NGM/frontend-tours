import ImagesCarousel from '@/Components/Carousel/ImagesCarousel'
import OurInfoCard from '@/Components/OurInfoCard/OurInfoCard'
import ToursContainerHome from '@/Components/ToursContainerHome/ToursContainerHome'
import '@/Styles/Home.scss'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { getAllTours, resetApiState } from '@/Features/Tours/tourSlice'
import { useEffect } from 'react'

const Home = () => {
  const dispatch = useDispatch()
  const { tours, isError, isSuccess, message, errorType } = useSelector((state) => state.tour)

  const errorTypesAllowed = ['GET_TOURS']

  useEffect(() => {
    dispatch(getAllTours())

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
      <h2>¡Descubre nuestros destinos más famosos!</h2>
      <ImagesCarousel />
      <h2 className='space-up-lg'>Planea tu siguiente aventura con los mejores precios</h2>
      <OurInfoCard />
      <h2 className='space-up-lg'>Consulta nuestros tours</h2>
      <ToursContainerHome />
    </div>
  )
}

export default Home
