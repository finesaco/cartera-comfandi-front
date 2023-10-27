import * as authRedux from './../modules/Auth/_redux/authRedux'
import { errosCode } from './errors_code'

const baseErrors = (apiReponse) => {
  if (apiReponse.status === 500) {
    throw new Error(errosCode.internalServerError)
  }

  if (apiReponse.status === 502) {
    throw new Error(errosCode.serverOutOfService)
  }
}

export const checkRequestErrors = (dispatch, apiReponse) => {
  baseErrors(apiReponse)

  if (apiReponse.status === 440 || apiReponse.status === 403) {
    dispatch(authRedux.actions.setSessionExpired())
    throw new Error(errosCode.sessionExpired)
  }

  if (!apiReponse.ok) throw new Error(errosCode.unexpectedError)
}

export const checkLoginErrors = async (apiReponse) => {
  baseErrors(apiReponse)

  if (apiReponse.status === 401) {
    const data = await apiReponse.json()
    if (data.error === 'User is disabled') {
      throw new Error(errosCode.userLocked)
    } else if (data.error === 'User account is locked') {
      throw new Error(errosCode.userDisable)
    } else {
      throw new Error(errosCode.incorrectData)
    }
  }

  if (!apiReponse.ok) throw new Error(errosCode.unexpectedError)
}

export const checkInProcessErrors = (apiReponse) => {
  baseErrors(apiReponse)

  if (apiReponse.status >= 400) {
    throw new Error(errosCode.notCancel)
  }

  if (!apiReponse.ok) throw new Error(errosCode.unexpectedError)
}
