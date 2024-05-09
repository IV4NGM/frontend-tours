import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
import CreateTemplate from '@/Pages/CreateTemplate'
import EditTemplate from '@/Pages/EditTemplate'
import CreateTour from '@/Pages/CreateTour'
import EditTour from '@/Pages/EditTour'
import TemplateInfo from '@/Pages/TemplateInfo'

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children || <Outlet />
}

const RouterIndex = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about-us' element={<About />} />
      <Route path='/tour/:id' element={<TourInfo />} />
      <Route path='/search' element={<AdvancedSearch />} />
      <Route path='/login' element={<Login />} />

      <Route element={<ProtectedRoute isAllowed={!!user} />}>
        <Route path='/tours' element={<ManageTours />} />
        <Route path='/new-tour' element={<CreateTour />} />
        <Route path='/edit-tour/:id' element={<EditTour />} />
        <Route path='/template/:id' element={<TemplateInfo />} />
        <Route path='/reservations' element={<ManageReservations />} />
        <Route path='/me' element={<UserInfo />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={!!user && user?.isAdmin} />}>
        <Route path='/new-template' element={<CreateTemplate />} />
        <Route path='/edit-template/:id' element={<EditTemplate />} />
        <Route path='/manager-tools' element={<ManagerTools />} />
      </Route>

      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  )
}

export default RouterIndex
