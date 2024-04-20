import { Routes, Route } from 'react-router-dom'
import Home from '@/Pages/Home'
import Login from '@/Pages/Login'
import TourInfo from '@/Pages/TourInfo'
import PageNotFound from '@/Pages/PageNotFound'

const RouterIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/tour/:id' element={<TourInfo />} />
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  )
}

export default RouterIndex
