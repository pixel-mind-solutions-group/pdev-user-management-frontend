import axios from 'axios'
import { environment } from '../../environments/environment'

const MODULE_API_URL = `${environment.baseUrl}` + '/module/v1'

export const getAll = (currentPage, size) => {
  try {
    const response = axios.get(`${MODULE_API_URL}/get-all`, {
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

export const createOrUpdate = async (data) => {
  try {
    const response = await axios.post(`${MODULE_API_URL}/create-or-update`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
