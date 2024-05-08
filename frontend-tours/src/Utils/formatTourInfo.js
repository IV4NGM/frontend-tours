const formatDate = (dateInfo) => {
  const date = new Date(dateInfo.toDateString())
  date.setUTCHours(0, 0, 0, 0)
  const dateToUTC = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
  const formattedDate = new Date(dateToUTC)
  return formattedDate
}

const formatTourInfo = (tourData, filters) => {
  const formattedTour = { ...tourData }

  let allTours = tourData.tours.filter(tour => tour?.status?.status_code === 'Active')
  if (allTours.length > 0) {
    allTours = allTours.sort((tourA, tourB) => new Date(tourA?.starting_date) - new Date(tourB?.starting_date))
  }

  let tours = allTours.filter(tour => (filters.prices[0] === 500 || tour.price >= filters.prices[0]) && (filters.prices[1] === 5000 || tour.price <= filters.prices[1]) && (tour.total_seats - tour.reserved_seats_amount > 0))

  if (filters.isDateRange) {
    const initialDate = formatDate(filters.dateRange[0])
    const finalDate = formatDate(filters.dateRange[1])
    tours = tours.filter(tour => {
      const tourDate = new Date(tour.starting_date)
      tourDate.setUTCHours(0, 0, 0, 0)
      return (tourDate >= initialDate && tourDate <= finalDate)
    })
  }

  const promosArray = []
  let availability = 100
  let minPrice
  const dates = []
  let nextDate

  // console.log(tours)

  if (tours.length > 0) {
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

  formattedTour.tours = tours
  formattedTour.availability = availability
  formattedTour.textAvailability = textAvailability
  formattedTour.promoToShow = promoToShow
  formattedTour.nextDate = nextDate
  formattedTour.minPrice = minPrice

  return formattedTour
}

export default formatTourInfo
