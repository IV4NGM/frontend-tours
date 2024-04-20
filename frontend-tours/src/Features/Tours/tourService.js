import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + 'tours/'

const getAllTours = async (toursFilter) => {
  const response = await axios.get(API_URL + 'all', toursFilter)

  return response.data
}

const tourService = {
  getAllTours
}

export default tourService
