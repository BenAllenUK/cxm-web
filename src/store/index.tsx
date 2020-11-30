import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import reducer from 'reducers'
import sagas from 'sagas'

const persistConfig = {
  key: 'root',
  storage: storage,
}

const customLogger = (store: any) => (next: any) => (action: any) => {
  console.log(action)
  next({ n: 'ACTION', ...action })
}

const composeEnhancers = compose
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware, customLogger]
const enhancer = composeEnhancers(applyMiddleware(...middleware))
const persistedReducer = persistReducer(persistConfig, reducer)
const appStore = createStore(persistedReducer, enhancer)
// @ts-ignore
let persistor = persistStore(appStore)

sagaMiddleware.run(sagas)

const store = ({ children }: { children: any }) => (
  <>
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  </>
)

export default store
