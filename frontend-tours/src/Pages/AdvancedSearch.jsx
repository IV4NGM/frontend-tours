import '@/Styles/AdvancedSearch.scss'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { getAllTours, resetApiState, resetNavSearch, setNavSearch } from '@/Features/Tours/tourSlice'
import { useEffect, useState } from 'react'
import useGetCurrentFormattedDate from '@/Hooks/useGetCurrentFormattedDate'

import Slider from '@mui/material/Slider'
import { useNavigate } from 'react-router-dom'
import AdvancedSearchResults from '@/Components/AdvancedSearchResults/AdvancedSearchResults'

import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'

const { beforeToday } = DateRangePicker

const AdvancedSearch = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentDate = useGetCurrentFormattedDate()

  const { tours, isError, isSuccess, message, errorType, navSearch } = useSelector((state) => state.tour)

  const errorTypesAllowed = ['GET_TOURS']

  const [textSearch, setTextSearch] = useState(navSearch)
  const [selectedDuration, setSelectedDuration] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [isDateRange, setIsDateRange] = useState(false)
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [sliderValue, setSliderValue] = useState([500, 5000])
  const [tourFilters, setTourFilters] = useState({
    text: '',
    duration: 'all',
    type: 'all',
    prices: [500, 5000],
    isDateRange: false,
    dateRange: [new Date(), new Date()]
  })

  const onSubmit = () => {
    setTourFilters({
      text: textSearch,
      duration: selectedDuration,
      type: selectedType,
      prices: sliderValue,
      isDateRange,
      dateRange: dateRange || [new Date(), new Date()]
    })
    // console.log('submitting')
  }

  useEffect(() => {
    dispatch(getAllTours({ current_date: currentDate }))

    return () => {
      // dispatch(resetNavSearch())
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

  const resetFiltersExceptText = () => {
    setSelectedDuration('all')
    setSelectedType('all')
    setIsDateRange(false)
    setNavSearch('')
    setSliderValue([500, 5000])
  }

  useEffect(() => {
    setTextSearch(navSearch)
    setTourFilters({
      text: navSearch,
      duration: 'all',
      type: 'all',
      prices: [500, 5000],
      isDateRange: false,
      dateRange: [new Date(), new Date()]
    })
    resetFiltersExceptText()
  }, [navSearch])

  const resetFilters = () => {
    setSelectedDuration('all')
    setSelectedType('all')
    setIsDateRange(false)
    setTextSearch('')
    setNavSearch('')
    dispatch(resetNavSearch())
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
          <div className='form-check duration-check'>
            <label className='form-check-label' htmlFor='isDateRange'>
              Todas las fechas disponibles
            </label>
            <input
              className='form-check-input' type='radio' name='isDateRange' id='isDateRange'
              onChange={() => setIsDateRange(false)}
              checked={!isDateRange}
            />
          </div>
          <div className='form-check duration-check'>
            <label className='form-check-label' htmlFor='isDateRange-1'>
              Seleccionar rango de fechas
            </label>
            <input
              className='form-check-input' type='radio' name='isDateRange' id='isDateRange-1'
              onChange={() => setIsDateRange(true)}
              checked={isDateRange}
            />
          </div>
          {isDateRange &&
            <div className='spaced'>
              <DateRangePicker
                format='dd/MM/yyyy'
                character=' – '
                placeholder='Fecha de inicio - Fecha de fin'
                shouldDisableDate={beforeToday()}
                ranges={[]}
                showHeader={false}
                value={dateRange}
                onChange={setDateRange}
              />
            </div>}
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
          <div className='button-row space-up-lg'>
            <button className='btn btn-primary' type='submit'>Buscar ahora</button>
            <button onClick={() => resetFilters()} className='btn btn-outline-secondary' type='reset'>Restablecer filtros</button>
          </div>

        </form>
        {/* <div className='tours-container'> */}
        {/* <h3 className='spaced spaced--top'>Tours que coinciden con tu búsqueda</h3> */}
        <AdvancedSearchResults filters={tourFilters} />
        {/* </div> */}
      </div>
    </div>
  )
}

export default AdvancedSearch
