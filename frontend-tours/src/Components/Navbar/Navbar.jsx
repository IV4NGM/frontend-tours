import './Navbar.scss'
import logo from '@/assets/logo.png'
import Search from '@mui/icons-material/Search'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'

import { NavLink, useNavigate } from 'react-router-dom'
// import useAuthContext from '@/Context/AuthContext/useAuthContext'
// import useProductsContext from '@/Context/ProductsContext/useProductsContext'
// import useCartContext from '@/Context/CartContext/useCartContext'

import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'

const Navbar = () => {
  const navigate = useNavigate()

  // const { loginStatus, userInfo } = useAuthContext()
  // const { navSearch, setNavSearch, setAdvancedSearch } = useProductsContext()
  const [navSearch, setNavSearch] = useState('')
  // const { cart } = useCartContext()

  // let productsAmount = 0
  // for (const item of cart) {
  //   productsAmount += item.product_amount
  // }

  const maxQueryMatches = useMediaQuery('(max-width:600px)')
  const minQueryMatches = useMediaQuery('(min-width:1200px)')

  return (
    <nav className='navbar navbar-expand-xl sticky-top navbar-white'>
      <div className='container-fluid'>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent'>
          <span className='navbar-toggler-icon' />
        </button>
        <NavLink className='navbar-brand navbar-brand-logo' to='/' onClick={() => setNavSearch('')}>
          <img src={logo} alt='Explorers Tours' className='d-inline-block align-text-top logo-nav' />
          <p>Explorers Tours</p>
        </NavLink>
        <div className='navbar__input-group input-group'>
          <input
            type='text'
            value={navSearch}
            onChange={(event) => setNavSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                // setAdvancedSearch(navSearch)
                setNavSearch('')
                navigate('/search')
              }
            }}
            placeholder='¡Encuentra tu próxima aventura!'
            className='navbar__nav-search form-control nav-search-hide'
          />
          <div
            className='input-group-text navbar__input-group-text' onClick={() => {
              // setAdvancedSearch(navSearch)
              if (maxQueryMatches) {
                // setAdvancedSearch('')
              }
              setNavSearch('')
              navigate('/search')
            }}
          ><Search />
          </div>
        </div>
      </div>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <div className='navbar-nav me-auto mb-2 mb-lg-0'>
          <NavLink to='/search' className={'role' !== 'ADMIN' && !minQueryMatches ? 'navbar__advanced-search take-two-columns' : 'navbar__advanced-search'}>
            <p>Búsqueda avanzada</p>
            <LibraryBooksOutlinedIcon />
          </NavLink>
          {/* {loginStatus && userInfo?.role === 'ADMIN' ? <button className='btn btn-success btn-new-product' onClick={() => navigate('/new-product')}>Crear producto</button> : ''}
          {!loginStatus
            ? (
              <>
                <button className='btn btn-secondary btn-not-logged' onClick={() => navigate('/signup')}>Registrarse</button>
                <button className='btn btn-success btn-not-logged' onClick={() => navigate('/login')}>Iniciar sesión</button>
              </>
              )
            : (
              <>
                <NavLink to='/checkout' className='shopping-cart-icon'><ShoppingCartOutlinedIcon /><span className='shopping-cart-number'>{productsAmount}</span></NavLink>
                <div className='dropdown navbar__dropdown'>
                  <button className='btn btn-outline-success dropdown-toggle' type='button' data-bs-toggle='dropdown'>
                    {userInfo.first_name} {userInfo.last_name}
                  </button>
                  <ul className='dropdown-menu dropdown-menu-end'>
                    <li className='dropdown-item-flex dropdown-item-flex--margin'>
                      <h5 className='dropdown-item-flex--center dropdown-item-flex__title'><strong>Tu cuenta</strong></h5>
                      <p className='dropdown-item-flex__p'><AccountBoxOutlinedIcon className='dropdown-item-flex__icon' /> {userInfo.first_name} {userInfo.last_name}</p>
                      <p className='dropdown-item-flex__p'><EmailOutlinedIcon className='dropdown-item-flex__icon' /> {userInfo.email}</p>
                      {userInfo.role === 'ADMIN' ? <p className='dropdown-item-flex__p'><VerifiedUserOutlinedIcon className='dropdown-item-flex__icon' /> Administrador</p> : ''}
                    </li>
                    <li><hr className='dropdown-divider' /></li>
                    {userInfo.role === 'ADMIN' ? <li className='dropdown-item'><NavLink to='/new-product'><AddOutlinedIcon /> Crear producto</NavLink></li> : ''}
                    <li className='dropdown-item'><NavLink to='/checkout'><ShoppingCartOutlinedIcon /> Ver carrito</NavLink></li>
                    <li className='dropdown-item'><NavLink to='/my-orders'><ShoppingBagOutlinedIcon /> Mis compras</NavLink></li>
                    <li><hr className='dropdown-divider' /></li>
                    <li className='dropdown-item'><NavLink className='navbar-brand navbar-brand__logout' to='/logout'><LogoutOutlinedIcon /> Cerrar Sesión</NavLink></li>
                  </ul>
                </div>
              </>
              )} */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
