import { Routes, Route } from 'react-router-dom'
import Home from '@/Pages/Home'
import Login from '@/Pages/Login'
import TourInfo from '@/Pages/TourInfo'
import PageNotFound from '@/Pages/PageNotFound'
import About from '@/Pages/About'
import AdvancedSearch from '@/Pages/AdvancedSearch'

const RouterIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about-us' element={<About />} />
      <Route path='/tour/:id' element={<TourInfo />} />
      <Route path='/search' element={<AdvancedSearch />} />
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  )
}

export default RouterIndex
