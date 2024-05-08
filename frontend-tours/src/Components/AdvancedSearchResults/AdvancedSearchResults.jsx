import { useSelector } from 'react-redux'
import TourCard from '@/Components/TourCard/TourCard'
import './AdvancedSearchResults.scss'

import { stringSimilarity } from 'string-similarity-js'
import TourCardFiltered from './TourCardFiltered'

import formatTourInfo from '@/Utils/formatTourInfo'

const AdvancedSearchResults = ({ filters }) => {
  console.log(filters)
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

  const { text, duration, type, prices, isDateRange, dateRange } = filters
  let filteredTours = sortedTours.filter((tour) => {
    // Filtrar por tours nacionales e internacionales
    if ((tour?.template_info?.isInternational && type === 'nationals') || (!tour?.template_info?.isInternational && type === 'internationals')) return false

    // Filtrar por duración
    if (duration === '1' && tour?.template_info?.duration !== 1) return false
    if (duration === '2-3' && (tour?.template_info?.duration < 2 || tour.template_info?.duration > 3)) return false
    if (duration === '4-5' && (tour?.template_info?.duration < 4 || tour.template_info?.duration > 5)) return false
    if (duration === '5' && tour?.template_info?.duration <= 5) return false

    // Filtrar por título

    if (text !== '') {
      // console.log('tour: ', tour?.template_info?.name)
      let score = 0
      const normalizedName = tour?.template_info?.name.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase()
      const normalizedText = text.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase()
      if (normalizedName.includes(normalizedText)) {
        score = 1
        // console.log('includes', score)
      } else {
        score = score + stringSimilarity(normalizedName, normalizedText)
        // console.log('noincludes', score)
      }
      if (score < 0.5) {
        let places = tour?.template_info?.cities
        places = places.concat(tour?.template_info?.states)
        places = places.concat(tour?.template_info?.countries.filter(country => country !== 'México'))
        places = places.concat(tour?.template_info?.continents.filter(country => country !== 'América'))
        // console.log(places)
        const placesScores = places.map(place => stringSimilarity(place.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase(), normalizedText))
        // console.log(placesScores)
        score = score + Math.max(...placesScores)
      }

      // console.log('final score:', score)

      if (score < 0.5) {
        return false
      }
    }

    return true
  })

  filteredTours = filteredTours.map(tour => formatTourInfo(tour, filters)).filter(tour => tour.tours.length > 0)
  console.log(filteredTours)

  return (
    <div className='tours-container flex-start'>
      {filteredTours.length === 0 &&
        <>
          <p className='no-tours'>No encontramos tours con estos parámetros, pero aquí hay unos tours que te podrían interesar:</p>
          {sortedTours && sortedTours.map((tour, index) => {
            return <TourCard tourData={tour} key={`tour-card-${index}`} />
          })}
        </>}
      {filteredTours && filteredTours.map((tour, index) => {
        return <TourCardFiltered tourData={tour} key={`tour-card-filtered-${index}`} />
      })}
    </div>
  )
}

export default AdvancedSearchResults
