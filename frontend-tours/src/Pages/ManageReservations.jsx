import '@/Styles/ManageReservations.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllToursTemplates, resetApiState } from '@/Features/TourTemplates/tourTemplateSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { IoMdAdd } from 'react-icons/io'
import { MdExpandMore, MdExpandLess, MdOutlineEdit } from 'react-icons/md'
import { IoTicketOutline, IoSearchOutline } from 'react-icons/io5'

import Spinner from '@/Components/Spinner/Spinner'
import { useEffect, useState } from 'react'

const ManageReservations = () => {
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const [showSearchReservation, setShowSearchReservation] = useState(false)
  const [searchReservationId, setSearchReservationId] = useState('')

  const [showSearchClientReservation, setShowSearchClientReservation] = useState(false)
  const [clientForReservations, setClientForReservations] = useState('')

  const [showEditClient, setShowEditClient] = useState(false)
  const [clientForEdit, setClientForEdit] = useState('')

  const onSubmitReservationId = (event) => {
    event.preventDefault()
    console.log('buscar reserva', searchReservationId)
  }

  const onSubmitClientReservation = (event) => {
    event.preventDefault()
    console.log('buscar reservas de cliente', clientForReservations)
  }

  const onSubmitClientEdit = (event) => {
    event.preventDefault()
    console.log('editar cliente', clientForEdit)
  }

  return (
    <div className='page-container'>
      <h2>Administración de Reservaciones y clientes</h2>
      <section className='manage-section'>
        <h4>Reservaciones</h4>
        <button className='btn btn-outline-success space-down' onClick={() => navigate('/new-reservation')}> <IoMdAdd /> Crear reservación</button>
        <div className='section-separator' />
        <button className='btn btn-outline-primary space-down' onClick={() => setShowSearchReservation(!showSearchReservation)}> {showSearchReservation ? 'Ocultar' : 'Ver'} información de reservación {showSearchReservation ? <MdExpandLess /> : <MdExpandMore />}</button>
        {showSearchReservation &&
          <form onSubmit={onSubmitReservationId}>
            <div className='form-floating'>
              <input
                type='text'
                name='reservationId'
                placeholder='Id de la reservación'
                id='reservationId'
                className='form-control search-field-md'
                value={searchReservationId}
                onChange={(event) => setSearchReservationId(event.target.value)}
              />
              <label htmlFor='reservationId'>Id de la reservación</label>
            </div>
            <button className='btn btn-primary space-up' type='submit' disabled={!searchReservationId} onClick={onSubmitReservationId}><IoSearchOutline /> Buscar reservación</button>
          </form>}
      </section>
      <section className='manage-section'>
        <h4>Clientes</h4>
        <button className='btn btn-outline-success space-down' onClick={() => navigate('/new-client')}> <IoMdAdd /> Nuevo cliente</button>
        <button className='btn btn-outline-primary space-down' onClick={() => setShowSearchClientReservation(!showSearchClientReservation)}> {showSearchClientReservation ? 'Ocultar' : 'Ver'} reservaciones de cliente {showSearchClientReservation ? <MdExpandLess /> : <MdExpandMore />}</button>
        {showSearchClientReservation &&
          <form onSubmit={onSubmitClientReservation}>
            <div className='form-floating'>
              <input
                type='text'
                name='clientPhoneReservation'
                placeholder='Número del cliente'
                id='clientPhoneReservation'
                className='form-control search-field-md'
                value={clientForReservations}
                onChange={(event) => setClientForReservations(event.target.value)}
              />
              <label htmlFor='clientPhoneReservation'>Número del cliente</label>
            </div>
            <button className='btn btn-primary space-up' type='submit' disabled={!clientForReservations} onClick={onSubmitClientReservation}><IoSearchOutline /> Buscar reservaciones</button>
          </form>}
        <div className='section-separator' />
        <button className='btn btn-outline-primary space-down' onClick={() => setShowEditClient(!showEditClient)}> Editar clientes {showEditClient ? <MdExpandLess /> : <MdExpandMore />}</button>
        {showEditClient &&
          <form onSubmit={onSubmitClientEdit}>
            <div className='form-floating'>
              <input
                type='text'
                name='clientPhoneEdit'
                placeholder='Número del cliente'
                id='clientPhoneEdit'
                className='form-control search-field-md'
                value={clientForEdit}
                onChange={(event) => setClientForEdit(event.target.value)}
              />
              <label htmlFor='clientPhoneEdit'>Número del cliente</label>
            </div>
            <button className='btn btn-primary space-up' type='submit' disabled={!clientForEdit} onClick={onSubmitClientEdit}><MdOutlineEdit /> Editar cliente</button>
          </form>}
      </section>
    </div>
  )
}

export default ManageReservations
