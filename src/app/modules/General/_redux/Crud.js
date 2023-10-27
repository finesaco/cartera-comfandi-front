import { getQueryParams } from '@/app/const'
import makeRequestServer from './MakeRequestServer'

export const PATH_REPORT = '/api/excel'

export function downloadFiles(props, body) {
  console.log(body)
  return makeRequestServer({
    path: PATH_REPORT + getQueryParams(props),
    method: 'POST',
    headers: new Headers({ Accept: '/' }),
    body: JSON.stringify(body)
  })
}
export function uploadFiles(props) {
  return makeRequestServer({
    path: PATH_REPORT + getQueryParams(props),
    method: 'GET',
    headers: new Headers({ Accept: '/' })
  })
}