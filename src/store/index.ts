import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import counterReducer from './features/counter/reducer'
import siteReducer, { SiteState } from './features/site/reducer'

const persistConfig = {
  key: 'site',
  version: 1,
  storage,
}

export function makeStore() {
  return configureStore({
    reducer: {
      // 使该模块数据持久化
      site: persistReducer<SiteState>(persistConfig, siteReducer),
      counter: counterReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

const store = makeStore()

export const persistor = persistStore(store)

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch

export default store
