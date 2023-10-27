import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { rootReducer, rootSaga } from './rootReducer'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
  }),
  sagaMiddleware
]

export const store = configureStore({
  reducer: rootReducer,
  middleware
})

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
