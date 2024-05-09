import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + 'tours/'

const getAllTours = async (toursFilter) => {
  const response = await axios.post(API_URL + 'all', toursFilter)

  return response.data
}

const createTour = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, data, config)

  return response.data
}

const completeTour = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `complete/${id}`, config)

  return response.data
}

const cancelTour = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `cancel/${id}`, config)

  return response.data
}

const deleteTour = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + id.toString(), config)

  return response.data
}

const tourService = {
  getAllTours,
  createTour,
  completeTour,
  cancelTour,
  deleteTour
}

export default tourService
