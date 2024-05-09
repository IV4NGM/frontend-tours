import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reservationService from './reservationService'

const initialState = {
  reservations: [],
  reservationInfo: {},
  isLoading: false,
  loadingType: '',
  isSuccess: false,
  successType: '',
  isError: false,
  errorType: '',
  message: ''
}

export const createReservation = createAsyncThunk('reservations/create', async (data, thunkAPI) => {
  try {
    return await reservationService.createReservation(data, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const handleError = (state, action) => {
  const sessionExpiredMessages = ['El usuario no se encuentra en la base de datos', 'Acceso no autorizado', 'No se proporcionó un token']
  if (sessionExpiredMessages.includes(action.payload)) {
    state.errorType = 'AUTH'
  }
}

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetApiState: (state) => {
      state.isError = false
      state.errorType = ''
      state.isSuccess = false
      state.successType = ''
      state.isLoading = false
      state.loadingType = ''
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'CREATED_RESERVATION'
        state.message = 'Reservación creada exitosamente'
        state.reservationInfo = action.payload
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorType = 'CREATE_RESERVATION'
        state.message = action.payload
      })
  }
})

export const { reset, resetApiState } = reservationSlice.actions
export default reservationSlice.reducer
