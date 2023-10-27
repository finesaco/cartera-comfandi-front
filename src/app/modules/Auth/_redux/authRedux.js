/* eslint-disable generator-star-spacing */
import { getUserByToken } from './authCrud'
import { persistReducer } from 'redux-persist'
import { put, takeLatest } from 'redux-saga/effects'
import storage from 'redux-persist/lib/storage'

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] Auth API',
  SetUser: '[Set User] Action',
  setSessionExpired: 'SET_SESSION_EXPIRED',
  setMainService: 'SET_MAIN_SERVICE'
}

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  sessionExpired: false,
  mainService: undefined
}

export const reducer = persistReducer(
  {
    storage,
    key: 'v713-demo1-auth',
    whitelist: ['user', 'authToken', 'mainService']
  },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload

        return { authToken, user: undefined }
      }

      case actionTypes.Register: {
        const { authToken } = action.payload

        return { authToken, user: undefined }
      }

      case actionTypes.Logout: {
        return initialAuthState
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload
        return { ...state, user }
      }

      case actionTypes.SetUser: {
        const { user } = action.payload
        return { ...state, user }
      }

      case actionTypes.setSessionExpired: {
        return { ...state, sessionExpired: true }
      }

      case actionTypes.setMainService: {
        const { mainService } = action.payload
        return { ...state, mainService }
      }

      default:
        return state
    }
  }
)

export const actions = {
  login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user }
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setSessionExpired: () => ({ type: actionTypes.setSessionExpired }),
  setMainService: (mainService) => ({
    type: actionTypes.setMainService,
    payload: { mainService }
  })
}

export function* saga() {
  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken()

    yield put(actions.fulfillUser(user))
  })
}
