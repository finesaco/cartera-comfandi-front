import axios from 'axios'
import makeRequest from '../../General/_redux/MakeRequestLogin'
import { getQueryParams } from '@/app/const'

export const LOGIN_URL = '/api/session'

export const ME_URL = 'api/me'

function login(user, password) {
  return makeRequest({
    path: LOGIN_URL + getQueryParams({ user, password }),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  })
}

export function getUserByToken() {
  return axios.get(ME_URL)
}
