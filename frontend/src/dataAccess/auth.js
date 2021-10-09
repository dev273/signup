import axios from 'axios'
import * as APIPaths from '../utils/apiPaths'

const baseUrl = 'http://localhost:3003'

export const login = payload => {
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

export const signup = payload => {
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

export const me = () => {
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
