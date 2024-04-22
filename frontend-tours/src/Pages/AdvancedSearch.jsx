import '@/Styles/AdvancedSearch.scss'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { getAllTours, resetApiState, setNavSearch } from '@/Features/Tours/tourSlice'
import { useEffect } from 'react'
import useGetCurrentFormattedDate from '@/Hooks/useGetCurrentFormattedDate'

const AdvancedSearch = () => {
  const dispatch = useDispatch()
  const currentDate = useGetCurrentFormattedDate()
  const { tours, isError, isSuccess, message, errorType, navSearch } = useSelector((state) => state.tour)

  const errorTypesAllowed = ['GET_TOURS']

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

  return (
    <div className='page-container'>
      <h2>Búsqueda avanzada</h2>
    </div>
  )
}

export default AdvancedSearch
