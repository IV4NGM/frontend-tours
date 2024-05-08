import { useNavigate, Link } from 'react-router-dom'
import LoginForm from '@/Components/LoginForm/LoginForm'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '@/Components/Spinner/Spinner'

const Login = () => {
  const { isLoading } = useSelector(state => state.auth)

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='page-container'>
      <h2>Sistema de administración de Explorers Tours</h2>
      <h4 className='space-up space-down'>¿No es lo que buscabas? <Link to='/' className='link'>Volver a inicio</Link></h4>
      <LoginForm initialState={formState} setFormState={setFormState} />
    </div>
  )
}

export default Login
