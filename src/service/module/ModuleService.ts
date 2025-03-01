import axios from 'axios'
import { environment } from '../../environments/environment'

const MODULE_API_URL = `${environment.baseUrl}` + '/module/v1'

export const getAll = async () => {
  try {
    const response = await axios.get(`${MODULE_API_URL}/get-all`)
    return response
  } catch (error) {
    throw error
  }
}

export const createOrUpdate = async (data) => {
  try {
    const response = await axios.post(`${MODULE_API_URL}/create-or-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.data
  } catch (error) {
    throw error
  }
}
