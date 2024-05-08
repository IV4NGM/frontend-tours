import { Routes, Route } from 'react-router-dom'
import Home from '@/Pages/Home'
import Login from '@/Pages/Login'
import TourInfo from '@/Pages/TourInfo'
import PageNotFound from '@/Pages/PageNotFound'
import About from '@/Pages/About'
import AdvancedSearch from '@/Pages/AdvancedSearch'
import ManageTours from '@/Pages/ManageTours'
import ManageReservations from '@/Pages/ManageReservations'
import ManagerTools from '@/Pages/ManagerTools'
import UserInfo from '@/Pages/UserInfo'

const RouterIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about-us' element={<About />} />
      <Route path='/tour/:id' element={<TourInfo />} />
      <Route path='/search' element={<AdvancedSearch />} />
      <Route path='/login' element={<Login />} />

      {/* Proteger para users las siguientes rutas: */}
      <Route path='/tours' element={<ManageTours />} />
      <Route path='/reservations' element={<ManageReservations />} />
      <Route path='/me' element={<UserInfo />} />

      {/* Proteger para manager las siguientes rutas: */}
      <Route path='/manager-tools' element={<ManagerTools />} />

      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  )
}

export default RouterIndex
