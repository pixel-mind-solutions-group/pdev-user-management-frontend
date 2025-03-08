import axios from 'axios'
import { environment } from '../../../environments/environment'
const COMPONENT_API_URL = `${environment.baseUrl}` + '/authorize-party-profile/v1'

export const createOrUpdate = async (data) => {
  try {
    const response = await axios.post(`${COMPONENT_API_URL}/create-or-update`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAll = () => {
  try {
    const response = axios.get(`${COMPONENT_API_URL}/get-all`)
    return response
  } catch (error) {
    throw error
  }
}

export const getAuthProfileByAuthPartyId = (id) => {
  try {
    const response = axios.get(`${COMPONENT_API_URL}/get-by-auth-party`, {
      params: {
        id: id,
      },
    })
    return response
  } catch (error) {
    throw error
  }
}

export const deleteById = (id) => {
  try {
    const response = axios.get(`${COMPONENT_API_URL}/delete-by-id`, {
      params: {
        id: id,
      },
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getAllWithPagination = (currentPage, size) => {
  try {
    const response = axios.get(`${COMPONENT_API_URL}/get-all-page`, {
      params: {
        page: currentPage,
        size: size,
      },
    })
    return response
  } catch (error) {
    throw error
  }
}
