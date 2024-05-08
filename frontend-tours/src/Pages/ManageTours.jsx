import '@/Styles/ManageTours.scss'
import { useSelector } from 'react-redux'

const ManageTours = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className='page-container'>
      <h2>Administración de Tours</h2>
      {user?.isAdmin &&
        <section className='manage-section'>
          <h4>Plantillas</h4>
          <p>Crear plantilla</p>
          <p>Modificar plantilla existente</p>
        </section>}
      <section className='manage-section'>
        <h4>Tours</h4>
        <p>Crear tour</p>
        <p>Ver información</p>
        <p>Actualizar tour</p>
      </section>
    </div>
  )
}

export default ManageTours
