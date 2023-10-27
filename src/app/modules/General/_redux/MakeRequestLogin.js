import { API_PATH } from '../../../const'

function makeRequest({ path, method, headers, ...others }) {
  const config = {
    method,
    headers: headers || new Headers(),
    ...others
  }

  const myRequest = new Request(API_PATH + path, config)

  return fetch(myRequest)
}

export default makeRequest