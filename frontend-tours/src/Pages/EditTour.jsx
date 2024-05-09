import React from 'react'
import { useParams } from 'react-router-dom'

const EditTour = () => {
  const { id } = useParams()
  return (
    <div>EditTour {id}</div>
  )
}

export default EditTour
