import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + 'clients/'

const getClient = async (phone, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + phone.toString(), config)

  return response.data
}

const clientService = {
  getClient
}

export default clientService
