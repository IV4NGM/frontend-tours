import { useSelector } from 'react-redux'
import TourCard from '@/Components/TourCard/TourCard'
import './ToursContainerHome.scss'

const ToursContainerHome = () => {
  const { tours } = useSelector((state) => state.tour)
  const sortedTours = [...tours]
  sortedTours.sort((tourA, tourB) => {
    const durationDiff = tourA.template_info.duration - tourB.template_info.duration
    if (durationDiff !== 0) {
      return durationDiff
    }
    if (tourA.template_info.name < tourB.template_info.name) {
      return -1
    }
    if (tourA.template_info.name > tourB.template_info.name) {
      return 1
    }
    return 0
  })
  return (
    <div className='tours-container'>
      {sortedTours && sortedTours.map((tour, index) => {
        return <TourCard tourData={tour} key={`tour-card-${index}`} />
      })}
    </div>
  )
}

export default ToursContainerHome
