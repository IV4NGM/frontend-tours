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
  }
})

export const { reset, resetApiState, resetNavSearch, setNavSearch } = tourSlice.actions
export default tourSlice.reducer
