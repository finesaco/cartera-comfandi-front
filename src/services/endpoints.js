import axios from 'axios'
import { adaptResponseError } from './adapters'
import { getQueryParams } from '@/app/const'

/* Server */
//export const SERVER_URL = 'https://apireportescomfandi.finesa.local'
export const SERVER_URL = 'http://localhost:8080'
export const SERVER_VERSION_URL = '/api/'

/* Base */


export const BASE_URL = SERVER_URL + SERVER_VERSION_URL

export const LOGIN_URL = BASE_URL + 'session'

export const GET_FONDEOS_URL = BASE_URL + 'fondeos'
export const GET_RECAUDOS_URL = BASE_URL + 'recaudos'
export const GET_RECAUDO_URL = BASE_URL + 'recaudo'
export const GET_COLECTIVA_AUTO_URL = BASE_URL + 'colectivaAuto'
export const GET_COLECTIVA_VIDA_URL = BASE_URL + 'colectivaVida'
export const GET_CONTROL_SEGUROS = BASE_URL + 'controlSeguros'
export const GET_FACTURAS_URL = BASE_URL + 'facturas'
export const GET_FACTURA_URL = BASE_URL + 'factura'
export const GET_REPORTES_URL = BASE_URL + 'reportes'
export const GET_REPORTES_FILTER_UTL = BASE_URL + 'reportesFiltros'

export const POST_PAGOS_FONDEO = BASE_URL + 'estadoFondeos'
export const POST_PAGOS_RECAUDOS = BASE_URL + 'estadoRecaudos'
export const POST_COBROS_RECAUDOS = BASE_URL + 'estadoCobro'
export const PATH_REPORT = BASE_URL + 'excel'

export const login = async (user, password) => {
  try {
    const response = await axios.post(LOGIN_URL + getQueryParams({ user, password }), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    return response
  } catch (error) {
    throw adaptResponseError(error)
  }
}

/**
 * Obtener datos
 * @param {*} url url + query params
 * @param {*} body
 * @returns {Promise<data>} datos + total datos existentes que corresponden al los query params
 */
export const getData = async (url, body) => {
  try {
    const response = await axios.post(url, body)

    const data = {
      content: response.data.content,
      totalElements: response.data.totalElements
    }
    return data
  } catch (error) {
    throw adaptResponseError(error)
  }
}

/**
 * Obtener datos
 * @param {*} body url + query params
 */

export const getReporte = async (params, body, url) => {
  try {
    const finalUrl = url + getQueryParams(params)
    const response = await axios.post(finalUrl, body, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response
  } catch (error) {
    throw adaptResponseError(error)
  }
}

/**
 * Obtener datos
 * @param {*} url url + query params
 */
export const UploadFile = async (files, url) => {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i])
  }
  try {
    const response = await axios.post(url, formData)
    return response
  } catch (error) {
    throw adaptResponseError(error.response.data)
  }
}

/**
 * @param {*} params parametros de la petición
 */
export const changeFactura = async (params) => {
  try {
    const response = await axios.put(GET_FACTURAS_URL + getQueryParams(params))
    return response
  } catch (error) {
    throw adaptResponseError(error)
  }
}

