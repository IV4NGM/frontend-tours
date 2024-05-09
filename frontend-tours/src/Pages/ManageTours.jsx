import '@/Styles/ManageTours.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllToursTemplates, resetApiState } from '@/Features/TourTemplates/tourTemplateSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { IoMdAdd } from 'react-icons/io'
import { MdExpandMore, MdExpandLess, MdOutlineEdit } from 'react-icons/md'
import { IoTicketOutline } from 'react-icons/io5'

import Spinner from '@/Components/Spinner/Spinner'
import { useEffect, useState } from 'react'

const ManageTours = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const { templates, isError, isSuccess, message, errorType, isLoading } = useSelector((state) => state.tourTemplate)

  const errorTypesAllowed = ['GET_TOURS_TEMPLATES']

  useEffect(() => {
    dispatch(getAllToursTemplates())

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

  const [showTemplates, setShowTemplates] = useState(false)
  const [showTourTemplates, setShowTourTemplates] = useState(false)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='page-container'>
      <h2>Administración de Tours</h2>
      {user?.isAdmin &&
        <section className='manage-section'>
          <h4>Plantillas</h4>
          <button className='btn btn-outline-success' onClick={() => navigate('/new-template')}><IoMdAdd /> Crear plantilla</button>
          <button className='btn btn-outline-primary' onClick={() => setShowTemplates(!showTemplates)}>{showTemplates ? 'Ocultar' : 'Ver'} plantillas existentes {showTemplates ? <MdExpandLess /> : <MdExpandMore />} </button>
          {showTemplates &&
            <div className='templates-container'>
              {templates && templates.map((template, index) => {
                return (
                  <div className='template-card' key={`template-${index}`}>
                    <div className='template-card-info'><strong>Nombre: </strong>{template.name}</div>
                    <div className='template-card-info'><strong>Duración: </strong>{template.duration} {template.duration === 1 ? 'día' : 'días'}</div>
                    <button className='btn btn-outline-secondary' onClick={() => navigate(`/edit-template/${template._id}`)}><MdOutlineEdit /> Editar plantilla</button>
                  </div>
                )
              })}
            </div>}
        </section>}
      <section className='manage-section'>
        <h4>Tours</h4>
        <button className='btn btn-outline-success' onClick={() => navigate('/new-tour')}><IoMdAdd /> Crear tour</button>
        <button className='btn btn-outline-primary' onClick={() => setShowTourTemplates(!showTourTemplates)}>{showTourTemplates ? 'Ocultar' : 'Ver'} tours {showTourTemplates ? <MdExpandLess /> : <MdExpandMore />} </button>
        {showTourTemplates &&
          <div className='templates-container'>
            {templates && templates.map((template, index) => {
              return (
                <div className='template-card' key={`template-${index}`}>
                  <div className='template-card-info'><strong>Nombre: </strong>{template.name}</div>
                  <div className='template-card-info'><strong>Duración: </strong>{template.duration} {template.duration === 1 ? 'día' : 'días'}</div>
                  <button className='btn btn-outline-secondary' onClick={() => navigate(`/template/${template._id}`)}><IoTicketOutline /> Ver tours programados</button>
                </div>
              )
            })}
          </div>}
      </section>
    </div>
  )
}

export default ManageTours
