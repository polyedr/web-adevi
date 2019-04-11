import {
  createStore, applyMiddleware, combineReducers, compose, Store,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { PersistConfig, Persistor } from 'redux-persist/es/types';

import userSaga from '$redux/sagas';
import userReducer from '$redux/user/reducer';
import projectReducer from '$redux/project/reducer';

const userPersistConfig: PersistConfig = {
  key: 'user',
  whitelist: ['user', 'logo'],
  storage,
};

const projectPersistConfig: PersistConfig = {
  key: 'project',
  whitelist: ['user', 'logo'],
  storage,
};

export const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const composeEnhancers = typeof window === 'object'
  && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

export const store = createStore(
  combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    project: persistReducer(projectPersistConfig, projectReducer),
    router: connectRouter(history),
  }),
  composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
  )),
);

export function configureStore(): { store: Store<any>, persistor: Persistor } {
  sagaMiddleware.run(userSaga);

  const persistor = persistStore(store);

  return { store, persistor };
}
