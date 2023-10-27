import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import * as auth from '../app/modules/Auth/_redux/authRedux'

export const rootReducer = combineReducers({
  auth: auth.reducer
})

// eslint-disable-next-line generator-star-spacing
export function* rootSaga() {
  yield all([auth.saga()])
}
