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

const tourService = {
  getAllTours,
  createTour
}

export default tourService
