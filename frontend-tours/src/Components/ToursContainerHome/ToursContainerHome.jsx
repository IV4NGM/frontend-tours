import { useSelector } from 'react-redux'
import TourCard from '@/Components/TourCard/TourCard'
import './ToursContainerHome.scss'

const ToursContainerHome = () => {
  const { tours } = useSelector((state) => state.tour)
  return (
    <div className='tours-container'>
      {tours && tours.map((tour, index) => {
        return <TourCard tourData={tour} key={`tour-card-${index}`} />
      })}
    </div>
  )
}

export default ToursContainerHome
