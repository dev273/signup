import axios from 'axios'
import * as APIPaths from '../utils/apiPaths'

const baseUrl = 'http://localhost:4000'

export const login = async payload => {
  return axios
    .post(baseUrl + APIPaths.login, payload)
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        },
    )
}

export const signup = async payload => {
  return axios
    .post(baseUrl + APIPaths.signup, payload)
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        },
    )
}

export const me = async () => {
  const token = localStorage.getItem('authToken')
  return axios
    .get(baseUrl + APIPaths.me, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        },
    )
}
