import { environment } from '../../environments/environment'

const APPLICATION_SCOPE_API_URL = `${environment.baseUrl}` + '/application-scope/v1'

export const getAll = async () => {
  try {
    const response = await fetch(`${APPLICATION_SCOPE_API_URL}/get-all`)
    return await response.json()
  } catch (error) {
    throw error
  }
}

export const createOrUpdate = (data) => {
  try {
    const response = fetch(`${APPLICATION_SCOPE_API_URL}/create-or-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  } catch (error) {
    throw error
  }
}
