import { useSelector } from 'react-redux'
import TourCard from '@/Components/TourCard/TourCard'
import './ToursContainerHome.scss'

const ToursContainerHome = () => {
  const { tours } = useSelector((state) => state.tour)
  const sortedTours = [...tours]
  sortedTours.sort((tourA, tourB) => tourA.template_info.duration - tourB.template_info.duration)
  return (
    <div className='tours-container'>
      {sortedTours && sortedTours.map((tour, index) => {
        return <TourCard tourData={tour} key={`tour-card-${index}`} />
      })}
    </div>
  )
}

export default ToursContainerHome
