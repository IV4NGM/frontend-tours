import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tourTemplateService from './tourTemplateService'

import { completeTour, cancelTour, deleteTour } from '@/Features/Tours/tourSlice'

const initialState = {
  templates: [],
  templateInfo: {},
  isLoading: false,
  loadingType: '',
  isSuccess: false,
  successType: '',
  isError: false,
  errorType: '',
  message: '',
  navSearch: ''
}

export const getAllToursTemplates = createAsyncThunk('tourTemplates/get-all', async (_, thunkAPI) => {
  try {
    return await tourTemplateService.getAllTemplates()
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getOneTourTemplate = createAsyncThunk('tourTemplates/get-one', async (id, thunkAPI) => {
  try {
    return await tourTemplateService.getOneTemplate(id)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getToursFromTemplate = createAsyncThunk('tourTemplates/get-tours-from-template', async (id, thunkAPI) => {
  try {
    return await tourTemplateService.getToursFromTemplate(id)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createTemplate = createAsyncThunk('tourTemplates/create-template', async (templateData, thunkAPI) => {
  try {
    return await tourTemplateService.createTemplate(templateData, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Modificar plantilla
// data debe incluir un campo id
export const updateTemplate = createAsyncThunk('tourTemplates/update', async (data, thunkAPI) => {
  try {
    return await tourTemplateService.updateTemplate(data, thunkAPI.getState().auth.user.token)
  } catch (error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Eliminar plantilla
export const deleteTemplate = createAsyncThunk('tourTemplates/delete', async (id, thunkAPI) => {
  try {
    return await tourTemplateService.deleteTemplate(id, thunkAPI.getState().auth.user.token)
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

export const tourTemplateSlice = createSlice({
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
      .addCase(getAllToursTemplates.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllToursTemplates.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.templates = action.payload
      })
      .addCase(getAllToursTemplates.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorType = 'GET_TOURS_TEMPLATES'
        state.message = action.payload
      })
      .addCase(createTemplate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'CREATED_TEMPLATE'
        state.message = 'Plantilla creada exitosamente'
        state.templates.push(action.payload)
      })
      .addCase(createTemplate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'CREATE_TEMPLATE'
        handleError(state, action)
      })
      .addCase(getOneTourTemplate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOneTourTemplate.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'GET_ONE_TEMPLATE'
        const templatesIndex = state.templates.findIndex(template => template._id === action.payload._id)
        if (templatesIndex === -1) {
          state.templates.push(action.payload)
        } else {
          state.templates = state.templates.map((template, index) => {
            if (index === templatesIndex) {
              return action.payload
            }
            return template
          })
        }
      })
      .addCase(getOneTourTemplate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'GET_ONE_TEMPLATE'
      })
      .addCase(getToursFromTemplate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getToursFromTemplate.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'GET_TOURS_FROM_TEMPLATE'
        state.templateInfo.tours = action.payload
      })
      .addCase(getToursFromTemplate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'GET_TOURS_FROM_TEMPLATE'
      })
      .addCase(updateTemplate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'UPDATED_TEMPLATE'
        state.message = 'Plantilla modificada exitosamente'
        state.templates = state.templates.map((template) => {
          if (template._id === action.payload._id) {
            return action.payload
          }
          return template
        })
      })
      .addCase(updateTemplate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'UPDATE_TEMPLATE'
        handleError(state, action)
      })
      .addCase(deleteTemplate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.successType = 'DELETED_TEMPLATE'
        state.message = 'Plantilla eliminada exitosamente'
        state.templates = state.templates.filter((template) => template._id !== action.payload._id)
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.errorType = 'DELETE_TEMPLATE'
        handleError(state, action)
      })
      .addCase(completeTour.fulfilled, (state, action) => {
        state.templateInfo.tours = state.templateInfo.tours.map((tour) => {
          if (tour._id === action.payload._id) {
            return {
              ...tour,
              isActive: false,
              status: {
                status_code: 'Completed',
                description: 'Tour completo'
              },
              updated_reservations: action.payload.updated_reservations,
              reservations_with_devolutions: action.payload.reservations_with_devolutions
            }
          }
          return tour
        })
      })
      .addCase(cancelTour.fulfilled, (state, action) => {
        state.templateInfo.tours = state.templateInfo.tours.map((tour) => {
          if (tour._id === action.payload._id) {
            return {
              ...tour,
              isActive: false,
              status: {
                status_code: 'Canceled',
                description: 'Tour cancelado'
              },
              updated_reservations: action.payload.updated_reservations,
              reservations_with_devolutions: action.payload.reservations_with_devolutions
            }
          }
          return tour
        })
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.templateInfo.tours = state.templateInfo.tours.map((tour) => {
          if (tour._id === action.payload._id) {
            return {
              ...tour,
              isActive: false
            }
          }
          return tour
        })
      })
  }
})

export const { reset, resetApiState } = tourTemplateSlice.actions
export default tourTemplateSlice.reducer
