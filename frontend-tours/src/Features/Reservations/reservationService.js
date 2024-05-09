import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + 'reservations/'

const createReservation = async (data, token) => {
  const { tour, phone, ...dataToPost } = data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL + `create/${tour}/${phone}`, dataToPost, config)

  return response.data
}

const reservationService = {
  createReservation
}

export default reservationService
