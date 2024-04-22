import './TourDateDetails.scss'
import formatTourDate from '@/Utils/formatTourDate'
import DiscountTagInfo from '@/Components/Tags/DiscountTagInfo'

import { FaRegCalendarAlt } from 'react-icons/fa'

const TourDateDetails = ({ tour, tourData }) => {
  const availability = tour?.total_seats - tour?.reserved_seats_amount
  const textAvailability = `${availability} lugar${availability > 1 ? 'es' : ''} disponible${availability > 1 ? 's' : ''}`
  const availablePromos = tour.promos.filter(promo => promo.isActive && promo.show && promo.usedCount < promo.amount)
  let availablePromoTypes
  if (availablePromos.length > 0) {
    availablePromoTypes = Array.from(new Set(availablePromos.map(promo => promo.type)))
  }

  const promosArray = []
  let validPromos = tour?.promos
  validPromos = validPromos.filter(promo => promo.isActive && promo.show && promo.usedCount < promo.amount)
  validPromos.forEach(promo => {
    promosArray.push({
      type: promo.type,
      value: promo.value
    })
  })

  let promosToShow = []
  if (promosArray.some(promo => promo.type === '2x1')) {
    promosToShow.push('2X1')
  }
  if (promosArray.some(promo => promo.type === 'percentageDiscount')) {
    const promoValues = Array.from(new Set(promosArray.filter(promo => promo.type === 'percentageDiscount' && promo.value > 0).map(promo => promo.value)))
    promosToShow = promosToShow.concat(promoValues.map(promoValue => `${promoValue}% OFF`).sort((a, b) => b - a))
  }
  if (promosArray.some(promo => promo.type === 'discount')) {
    promosToShow.push('Especial')
  }

  return (
    <div className='tour-date-details'>
      <p className='tour-date-details-date'><FaRegCalendarAlt /> {formatTourDate(tour?.starting_date, tourData?.template_info?.duration)}</p>
      <p><strong>Total:</strong> ${tour?.price} por persona</p>
      <p><strong>Reserva con:</strong> ${tour?.min_payment} por persona</p>
      {(availability <= 10) && <p className='tour-date-availability'>{textAvailability}</p>}
      <div className='tour-date-promos-container'>
        {promosToShow.length > 0 && promosToShow.map((promo, index) => <DiscountTagInfo data={promo} key={`promo-data-${index}`} />)}
      </div>
    </div>
  )
}

export default TourDateDetails
