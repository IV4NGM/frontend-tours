import React from 'react'
import { useParams } from 'react-router-dom'

const TemplateInfo = () => {
  const { id } = useParams()
  return (
    <div className='page-container'>TemplateInfo {id}</div>
  )
}

export default TemplateInfo
