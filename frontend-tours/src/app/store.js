import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/Features/Auth/authSlice'
import movieReducer from '@/Features/Movies/movieSlice'
import tourReducer from '@/Features/Tours/tourSlice'
import tourTemplateSlice from '@/Features/TourTemplates/tourTemplateSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
    tour: tourReducer,
    tourTemplate: tourTemplateSlice
  }
})
