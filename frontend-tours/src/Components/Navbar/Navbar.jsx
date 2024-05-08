import './Navbar.scss'
import logo from '@/assets/logo.png'
import Search from '@mui/icons-material/Search'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { GiCommercialAirplane } from 'react-icons/gi'
import { IoTicketOutline } from 'react-icons/io5'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { MdOutlineDashboard } from 'react-icons/md'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'

import { NavLink, useNavigate } from 'react-router-dom'

import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '@/Features/Auth/authSlice'
import { setNavSearch } from '@/Features/Tours/tourSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const [search, setSearch] = useState('')

  const maxQueryMatches = useMediaQuery('(max-width:600px)')
  const minQueryMatches = useMediaQuery('(min-width:1200px)')

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    setTimeout(() => {
      navigate('/login')
    }, 10)
  }

  return (
    <nav className='navbar navbar-expand-xl sticky-top navbar-white'>
      <div className='container-fluid'>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent'>
          <span className='navbar-toggler-icon' />
        </button>
        <NavLink className='navbar-brand navbar-brand-logo' to='/' onClick={() => setNavSearch('')}>
          <img src={logo} alt='Explorers Tours' className='d-inline-block align-text-top logo-nav' />
          <p className='navbar-agency-name'>Explorers Tours</p>
        </NavLink>
        <div className='navbar__input-group input-group'>
          <input
            type='text'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setSearch('')
                dispatch(setNavSearch(search))
                navigate('/search')
              }
            }}
            placeholder='¡Encuentra tu próxima aventura!'
            className='navbar__nav-search form-control nav-search-hide'
          />
          <div
            className='input-group-text navbar__input-group-text' onClick={() => {
              dispatch(setNavSearch(search))
              if (maxQueryMatches) {
                dispatch(setNavSearch(''))
              }
              setSearch('')
              navigate('/search')
            }}
          ><Search />
          </div>
        </div>
      </div>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <div className='navbar-nav me-auto mb-2 mb-lg-0'>
          <NavLink to='/search' className={!user?.isAdmin && !minQueryMatches ? 'navbar__advanced-search take-two-columns' : 'navbar__advanced-search'}>
            <p>Búsqueda avanzada</p>
            <LibraryBooksOutlinedIcon />
          </NavLink>
          {user && (
            <>
              <div className='dropdown navbar__dropdown'>
                <button className='btn btn-outline-primary dropdown-toggle' type='button' data-bs-toggle='dropdown'>
                  {user?.name}
                </button>
                <ul className='dropdown-menu dropdown-menu-end'>
                  <li className='dropdown-item-flex dropdown-item-flex--margin'>
                    <h5 className='dropdown-item-flex--center dropdown-item-flex__title'><strong>Tu cuenta</strong></h5>
                    <p className='dropdown-item-flex__p'><AccountBoxOutlinedIcon className='dropdown-item-flex__icon' /> {user?.name}</p>
                    <p className='dropdown-item-flex__p'><EmailOutlinedIcon className='dropdown-item-flex__icon' /> {user?.email}</p>
                    {(user?.isManager) && <p className='dropdown-item-flex__p'><SupervisedUserCircleIcon className='dropdown-item-flex__icon' /> Manager</p>}
                    {(user?.isAdmin && !user?.isManager) && <p className='dropdown-item-flex__p'><VerifiedUserOutlinedIcon className='dropdown-item-flex__icon' /> Administrador</p>}
                  </li>
                  <li><hr className='dropdown-divider' /></li>
                  <li className='dropdown-item'><NavLink to='/tours'><GiCommercialAirplane /> Tours</NavLink></li>
                  <li className='dropdown-item'><NavLink to='/reservations'><IoTicketOutline /> Reservaciones y clientes</NavLink></li>
                  {user?.isAdmin && <li className='dropdown-item'><NavLink to='/manager-tools'><MdOutlineDashboard /> Herramientas de {user?.isManager ? 'manager' : 'admin'}</NavLink></li>}
                  <li><hr className='dropdown-divider' /></li>
                  <li className='dropdown-item'><NavLink to='/me'><SettingsOutlinedIcon /> Configuración de la cuenta</NavLink></li>
                  <li className='dropdown-item'><span className='navbar-brand navbar-brand__logout' onClick={onLogout}><LogoutOutlinedIcon /> Cerrar Sesión</span></li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
