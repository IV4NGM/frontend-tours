import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/Features/Auth/authSlice'
import movieReducer from '@/Features/Movies/movieSlice'
import tourReducer from '@/Features/Tours/tourSlice'
import tourTemplateSlice from '@/Features/TourTemplates/tourTemplateSlice'
import clientSlice from '@/Features/Clients/clientSlice'
import reservationSlice from '@/Features/Reservations/reservationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
    tour: tourReducer,
    tourTemplate: tourTemplateSlice,
    client: clientSlice,
    reservation: reservationSlice
  }
})
