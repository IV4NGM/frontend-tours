import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tourService from './tourService'

const initialState = {
  tours: [],
  isLoading: false,
  loadingType: '',
  isSuccess: false,
  successType: '',
  isError: false,
  errorType: '',
  message: '',
  navSearch: ''
}

export const getAllTours = createAsyncThunk('tours/get-all', async (toursFilter, thunkAPI) => {
  try {
    return await tourService.getAllTours(toursFilter)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createTour = createAsyncThunk('tours/create-tour', async (data, thunkAPI) => {
  try {
    return await tourService.createTour(data, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const completeTour = createAsyncThunk('tours/complete-tour', async (id, thunkAPI) => {
  try {
    return await tourService.completeTour(id, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const cancelTour = createAsyncThunk('tours/cancel-tour', async (id, thunkAPI) => {
  try {
    return await tourService.cancelTour(id, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteTour = createAsyncThunk('tours/delete-tour', async (id, thunkAPI) => {
  try {
    return await tourService.deleteTour(id, thunkAPI.getState().auth.user.token)
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

export const tourSlice = createSlice({
  name: 'tour',
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
    },
    resetNavSearch: (state) => {
      state.navSearch = ''
    },
    setNavSearch: (state, action) => {
      state.navSearch = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTours.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTours.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tours = action.payload
      })
      .addCase(getAllTours.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorType = 'GET_TOURS'
        state.message = action.payload
      })
      .addCase(createTour.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'CREATED_TOUR'
        state.message = 'Tour creado exitosamente'
        state.tours = state.tours.map((template) => {
          if (template._id === action.payload.tourTemplate) {
            const newTemplate = { ...template }
            newTemplate.tours.push(action.payload)
            return newTemplate
          }
          return template
        })
      })
      .addCase(createTour.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'CREATE_TOUR'
        handleError(state, action)
      })
      .addCase(completeTour.pending, (state) => {
        state.isLoading = true
      })
      .addCase(completeTour.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'COMPLETED_TOUR'
        state.message = `Reservas actualizadas: ${action.payload.updated_reservations || 0}.\n Devoluciones: ${action.payload.reservations_with_devolutions}`
      })
      .addCase(completeTour.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'COMPLETE_TOUR'
        handleError(state, action)
      })
      .addCase(cancelTour.pending, (state) => {
        state.isLoading = true
      })
      .addCase(cancelTour.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'CANCELED_TOUR'
        state.message = `Reservas actualizadas: ${action.payload.updated_reservations || 0}.\n Devoluciones: ${action.payload.reservations_with_devolutions}`
      })
      .addCase(cancelTour.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'CANCEL_TOUR'
        handleError(state, action)
      })
      .addCase(deleteTour.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'DELETED_TOUR'
        state.message = 'Tour eliminado exitosamente'
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'DELETE_TOUR'
        handleError(state, action)
      })
  }
})

export const { reset, resetApiState, resetNavSearch, setNavSearch } = tourSlice.actions
export default tourSlice.reducer
