import '@/Styles/ManageReservations.scss'
import { useSelector } from 'react-redux'

const ManageReservations = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className='page-container'>
      <h2>Administración de Reservaciones y clientes</h2>
      <section className='manage-section'>
        <h4>Reservaciones</h4>
        <p>Crear reservación</p>
        <p>Actualizar reservación</p>
      </section>
      <section className='manage-section'>
        <h4>Clientes</h4>
        <p>Ver reservaciones de clientes</p>
        <p>Editar clientes</p>
        {user?.isManager && <p>Ver todos los clientes</p>}
      </section>
    </div>
  )
}

export default ManageReservations
