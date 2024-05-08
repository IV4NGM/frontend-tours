import '@/Styles/ManagerTools.scss'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ManagerTools = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/')
    }
  }, [])

  return (
    <div className='page-container'>
      <h2>Herramientas de {user?.isManager ? 'manager' : 'administrador'}</h2>
      <section className='manage-section'>
        <h4>Usuarios</h4>
        <p>Crear usuario</p>
        <p>Ver todos los usuarios</p>
      </section>
      <section className='manage-section'>
        <h4>Clientes</h4>
        {user?.isManager && <p>Ver todos los clientes</p>}
      </section>
    </div>
  )
}

export default ManagerTools
