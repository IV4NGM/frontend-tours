import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + 'templates/'

const getAllTemplates = async () => {
  const response = await axios.get(API_URL + 'all')

  return response.data
}

const getOneTemplate = async (id) => {
  const response = await axios.get(API_URL + `/${id}`)

  return response.data
}

// Crear plantilla
const createTemplate = async (templateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, templateData, config)

  return response.data
}

const getToursFromTemplate = async (id) => {
  const response = await axios.get(API_URL + `/tours/${id}`)

  return response.data
}

// Modificar plantilla
const updateTemplate = async (data, token) => {
  const { id, ...dataToUpdate } = data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + id, dataToUpdate, config)

  return response.data
}

// Eliminar plantilla
const deleteTemplate = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + id, config)

  return response.data
}

const tourTemplateService = {
  getAllTemplates,
  getOneTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getToursFromTemplate
}

export default tourTemplateService
