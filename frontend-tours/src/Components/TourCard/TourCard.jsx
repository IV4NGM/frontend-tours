import './TourCard.scss'
import { FaPlus, FaRegCalendarAlt } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const TourCard = ({ tourData }) => {
  const navigate = useNavigate()

  return (
    <div className='tour-card' onClick={() => navigate(`/tour/${tourData?._id}`)}>
      <img src={tourData?.template_info?.main_image} alt={tourData?.template_info?.name} className='main-image' />
      <p className='bold-text'>{tourData?.template_info?.name}</p>
      <p><FaRegCalendarAlt /> {tourData?.template_info?.duration} {tourData?.template_info?.duration === 1 ? 'día' : 'días'}</p>
      <p><IoLocationOutline /> {tourData?.template_info?.states.join(', ')} </p>
      <button className='btn btn-outline-primary'><FaPlus /> Más información</button>
    </div>
  )
}

export default TourCard
