import './TourCard.scss'
import { FaPlus, FaRegCalendarAlt } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import tag from '@/assets/tag.png'
import RectangleTag from '@/Components/Tags/RectangleTag'
import DiscountTag from '@/Components/Tags/DiscountTag'

const TourCard = ({ tourData }) => {
  const navigate = useNavigate()

  const tours = tourData.tours
  const promo = {}
  let availability = 100

  if (tours.length > 0) {
    const availabilityArray = tours.map(tour => tour.total_seats - tour.reserved_seats_amount).filter(number => number > 0)
    if (availabilityArray.length > 0) {
      availability = Math.min(availabilityArray)
    }
  }

  return (
    <div className='tour-card' onClick={() => navigate(`/tour/${tourData?._id}`)}>
      {(availability <= 10) && <RectangleTag data={`${availability} lugares`} />}
      <DiscountTag data='10% OFF' />
      <img src={tourData?.template_info?.main_image} alt={tourData?.template_info?.name} className='main-image' />
      <p className='tour-card-title'>{tourData?.template_info?.name}</p>
      <p><FaRegCalendarAlt /> {tourData?.template_info?.duration} {tourData?.template_info?.duration === 1 ? 'día' : 'días'}</p>
      <p><IoLocationOutline /> {tourData?.template_info?.states.join(', ')} </p>
      <button className='btn btn-outline-primary'><FaPlus /> Más información</button>
    </div>
  )
}

export default TourCard
