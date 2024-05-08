/* eslint-disable react/prop-types */
import './TourCardFiltered.scss'
import airplane from '@/assets/airplane.jpg'
import { FaPlus, FaRegCalendarAlt } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'

import { useNavigate } from 'react-router-dom'
import RectangleTag from '@/Components/Tags/RectangleTag'
import DiscountTag from '@/Components/Tags/DiscountTag'
import DateTag from '@/Components/Tags/DateTag'

const TourCardFiltered = ({ tourData }) => {
  const navigate = useNavigate()

  return (
    <div className='tour-card' onClick={() => navigate(`/tour/${tourData?._id}`)}>
      {tourData.promoToShow && <DiscountTag data={tourData.promoToShow} />}
      <div className='tour-card-image-container'>
        {tourData.nextDate && <DateTag date={tourData.nextDate} duration={tourData?.template_info?.duration} />}
        <img
          src={tourData?.template_info?.main_image || airplane} alt={tourData?.template_info?.name} className='main-image' onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = airplane
          }}
        />
        {(tourData.availability <= 10) && <RectangleTag data={tourData.textAvailability} />}
      </div>
      <p className='tour-card-title'>{tourData?.template_info?.name}</p>
      {tourData.minPrice && <p className='tour-card-price'>Desde ${tourData.minPrice}</p>}
      <p><FaRegCalendarAlt /> {tourData?.template_info?.duration} {tourData?.template_info?.duration === 1 ? 'día' : 'días'}</p>
      <p><IoLocationOutline /> {tourData?.template_info?.states.join(', ')} </p>
      <button className='btn btn-outline-primary'><FaPlus /> Ver detalles y más fechas</button>
    </div>
  )
}

export default TourCardFiltered
