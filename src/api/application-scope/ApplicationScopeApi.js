import { environment } from '../../environments/environment'

/**
 * I used fetch api here to fetch and persist data from back-end
 */

const APPLICATION_SCOPE_API_URL = `${environment.baseUrl}` + '/application-scope/v1'

export const getAll = async () => {
  try {
    const response = await fetch(`${APPLICATION_SCOPE_API_URL}/get-all`)
    return await response.json()
  } catch (error) {
    throw error
  }
}
