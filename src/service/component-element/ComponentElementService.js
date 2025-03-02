import axios from 'axios'
import { environment } from '../../environments/environment'

const COMPONENT_ELEMENT_API_URL = `${environment.baseUrl}` + '/component-element/v1'

const api = axios.create({
  baseURL: COMPONENT_ELEMENT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createOrUpdate = async (data) => {
  try {
    const response = await api.post('/create-or-update', data)
    return response
  } catch (error) {
    throw error
  }
}

export const getAllWithPagination = (currentPage, size) => {
  try {
    const response = api.get('/get-all-page', {
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
