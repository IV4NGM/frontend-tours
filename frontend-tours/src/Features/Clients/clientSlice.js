import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import clientService from './clientService'

const initialState = {
  clients: [],
  clientInfo: {},
  isLoading: false,
  loadingType: '',
  isSuccess: false,
  successType: '',
  isError: false,
  errorType: '',
  message: ''
}

export const getClient = createAsyncThunk('clients/get-one', async (phone, thunkAPI) => {
  try {
    return await clientService.getClient(phone, thunkAPI.getState().auth.user.token)
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

export const clientSlice = createSlice({
  name: 'tourTemplate',
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
      .addCase(getClient.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.clientInfo = action.payload
      })
      .addCase(getClient.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorType = 'GET_CLIENT'
        state.message = action.payload
      })
  }
})

export const { reset, resetApiState } = clientSlice.actions
export default clientSlice.reducer
