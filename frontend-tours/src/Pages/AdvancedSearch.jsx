import '@/Styles/AdvancedSearch.scss'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { getAllTours, resetApiState, setNavSearch } from '@/Features/Tours/tourSlice'
import { useEffect, useState } from 'react'
import useGetCurrentFormattedDate from '@/Hooks/useGetCurrentFormattedDate'

import Slider from '@mui/material/Slider'
import { useNavigate } from 'react-router-dom'
import AdvancedSearchResults from '@/Components/AdvancedSearchResults/AdvancedSearchResults'

const AdvancedSearch = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentDate = useGetCurrentFormattedDate()

  const { tours, isError, isSuccess, message, errorType, navSearch } = useSelector((state) => state.tour)

  const errorTypesAllowed = ['GET_TOURS']

  const [textSearch, setTextSearch] = useState(navSearch)
  const [selectedDuration, setSelectedDuration] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [sliderValue, setSliderValue] = useState([500, 5000])
  const [tourFilters, setTourFilters] = useState({
    text: '',
    duration: 'all',
    type: 'all',
    prices: [500, 5000]
  })

  const onSubmit = () => {
    setTourFilters({
      text: textSearch,
      duration: selectedDuration,
      type: selectedType,
      prices: sliderValue
    })
  }

  useEffect(() => {
    dispatch(getAllTours({ current_date: currentDate }))

    return () => {
      dispatch(resetApiState())
    }
  }, [])

  useEffect(() => {
    if (isError && errorTypesAllowed.includes(errorType)) {
      console.log(message)
      toast.error(message)
    }
    if (errorType !== 'AUTH') {
      dispatch(resetApiState())
    }
  }, [isError, isSuccess, message, errorType])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setTextSearch(navSearch)
    onSubmit()
  }, [navSearch])

  const resetFilters = () => {
    setSelectedDuration('all')
    setSelectedType('all')
    setTextSearch('')
    setNavSearch('')
    setSliderValue([500, 5000])
  }

  return (
    <div className='page-container'>
      <h2>Búsqueda avanzada</h2>
      <div className='search-page-container'>
        <form
          className='filters-container form-container' onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <div className='form-floating general-search'>
            <input
              type='text'
              className='form-control'
              id='general-search'
              placeholder='Explora nuestros tours'
              value={textSearch}
              onChange={(event) => setTextSearch(event.target.value)}
            />
            <label htmlFor='general-search'>Explora nuestros tours</label>
          </div>
          <h5 className='spaced'>Duración</h5>
          <div className='form-check duration-check'>
            <label className='form-check-label' htmlFor='allDurationsCheckbox'>
              Cualquier duración
            </label>
            <input
              className='form-check-input' type='radio' name='duration' id='allDurationsCheckbox'
              onChange={() => setSelectedDuration('all')}
              checked={selectedDuration === 'all'}
            />
          </div>
          <div className='form-check duration-check'>
            <label className='form-check-label' htmlFor='allDurationsCheckbox-1'>
              1 día
            </label>
            <input
              className='form-check-input' type='radio' name='duration' id='allDurationsCheckbox-1'
              onChange={() => setSelectedDuration('1')}
              checked={selectedDuration === '1'}
            />
          </div>
          <div className='form-check duration-check'>
            <label className='form-check-label' htmlFor='allDurationsCheckbox-2'>
              2 a 3 días
            </label>
            <input
              className='form-check-input' type='radio' name='duration' id='allDurationsCheckbox-2'
              onChange={() => setSelectedDuration('2-3')}
              checked={selectedDuration === '2-3'}
            />
          </div>
          <div className='form-check duration-check'>
            <label className='form-check-label' htmlFor='allDurationsCheckbox-3'>
              4 a 5 días
            </label>
            <input
              className='form-check-input' type='radio' name='duration' id='allDurationsCheckbox-3'
              onChange={() => setSelectedDuration('4-5')}
              checked={selectedDuration === '4-5'}
            />
          </div>
          <div className='form-check duration-check'>
            <label className='form-check-label' htmlFor='allDurationsCheckbox-4'>
              +5 días
            </label>
            <input
              className='form-check-input' type='radio' name='duration' id='allDurationsCheckbox-4'
              onChange={() => setSelectedDuration('5')}
              checked={selectedDuration === '5'}
            />
          </div>
          <h5 className='spaced'>Tipo</h5>
          <select className='form-select' onChange={(event) => setSelectedType(event.target.value)} value={selectedType}>
            <option value='all'>Nacionales e Internacionales</option>
            <option value='nationals'>Solo Nacionales</option>
            <option value='internationals'>Solo Internacionales</option>
          </select>
          <h5 className='spaced'>Fechas</h5>
          <h5 className='spaced'>Filtrar por precio</h5>
          <div className='slider-container'>
            <p>${sliderValue[0]}</p>
            <Slider
              value={sliderValue}
              onChange={(event) => setSliderValue(event.target.value)}
              valueLabelDisplay='auto'
              min={500}
              max={5000}
              step={500}
            />
            <p>${sliderValue[1] === 5000 ? '5000+' : sliderValue[1]}</p>
          </div>
          <button className='btn btn-primary space-up-lg' type='submit'>Buscar ahora</button>
          <button onClick={resetFilters} className='btn btn-outline-secondary spaced' type='reset'>Restablecer filtros</button>
        </form>
        <div className='products-container'>
          <h3 className='spaced spaced--top'>Tours que coinciden con tu búsqueda</h3>
          <AdvancedSearchResults filters={tourFilters} />
        </div>
      </div>
    </div>
  )
}

export default AdvancedSearch
