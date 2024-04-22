/* eslint-disable react/prop-types */
import './TourCard.scss'
import airplane from '@/assets/airplane.jpg'
import { FaPlus, FaRegCalendarAlt } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'

import { useNavigate } from 'react-router-dom'
import RectangleTag from '@/Components/Tags/RectangleTag'
import DiscountTag from '@/Components/Tags/DiscountTag'
import DateTag from '@/Components/Tags/DateTag'

const TourCard = ({ tourData }) => {
  const navigate = useNavigate()

  let allTours = tourData.tours.filter(tour => tour?.status?.status_code === 'Active')
  if (allTours.length > 0) {
    allTours = allTours.sort((tourA, tourB) => new Date(tourA?.starting_date) - new Date(tourB?.starting_date))
  }

  const tours = allTours.filter(tour => tour.total_seats - tour.reserved_seats_amount > 0)

  const promosArray = []
  let availability = 100
  let minPrice
  const dates = []
  let nextDate

  if (tours.length > 0) {
    // const availabilityArray = tours.map(tour => tour.total_seats - tour.reserved_seats_amount).filter(number => number > 0)
    // if (availabilityArray.length > 0) {
    //   availability = Math.min(...availabilityArray)
    // }
    const pricesArray = tours.map(tour => tour.price).filter(price => price > 0)
    if (pricesArray.length > 0) {
      minPrice = Math.min(...pricesArray)
    }
    tours.forEach(tour => {
      dates.push(tour.starting_date)
      let validPromos = tour.promos
      validPromos = validPromos.filter(promo => promo.isActive && promo.show && promo.usedCount < promo.amount)
      validPromos.forEach(promo => {
        promosArray.push({
          type: promo.type,
          value: promo.value
        })
      })
    })
    nextDate = tours[0].starting_date
    availability = tours[0].total_seats - tours[0].reserved_seats_amount
  }
  const textAvailability = `¡Solo ${availability} lugar${availability > 1 ? 'es' : ''} disponible${availability > 1 ? 's' : ''}!`

  let promoToShow
  if (promosArray.some(promo => promo.type === '2x1')) {
    promoToShow = '2X1'
  } else if (promosArray.some(promo => promo.type === 'percentageDiscount')) {
    const promoValues = promosArray.filter(promo => promo.type === 'percentageDiscount').map(promo => promo.value)
    promoToShow = `${Math.min(Math.max(...promoValues), 100) || 0}% OFF`
  } else if (promosArray.some(promo => promo.type === 'discount')) {
    promoToShow = '%'
  }

  return (
    <div className='tour-card' onClick={() => navigate(`/tour/${tourData?._id}`)}>
      {promoToShow && <DiscountTag data={promoToShow} />}
      <div className='tour-card-image-container'>
        {nextDate && <DateTag date={nextDate} duration={tourData?.template_info?.duration} />}
        <img
          src={tourData?.template_info?.main_image || airplane} alt={tourData?.template_info?.name} className='main-image' onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = airplane
          }}
        />
        {(availability <= 10) && <RectangleTag data={textAvailability} />}
      </div>
      <p className='tour-card-title'>{tourData?.template_info?.name}</p>
      {minPrice && <p>Desde ${minPrice}</p>}
      <p><FaRegCalendarAlt /> {tourData?.template_info?.duration} {tourData?.template_info?.duration === 1 ? 'día' : 'días'}</p>
      <p><IoLocationOutline /> {tourData?.template_info?.states.join(', ')} </p>
      <button className='btn btn-outline-primary'><FaPlus /> Ver detalles y más fechas</button>
    </div>
  )
}

export default TourCard
