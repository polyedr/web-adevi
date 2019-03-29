"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_persist_1 = require("redux-persist");
const storage_1 = require("redux-persist/lib/storage");
const redux_saga_1 = require("redux-saga");
const connected_react_router_1 = require("connected-react-router");
const reducer_1 = require("$redux/user/reducer");
const sagas_1 = require("$redux/user/sagas");
const history_1 = require("history");
const connected_react_router_2 = require("connected-react-router");
const userPersistConfig = {
    key: 'user',
    whitelist: ['user', 'logo', 'provider', 'speed'],
    storage: storage_1.default,
};
exports.sagaMiddleware = redux_saga_1.default();
exports.history = history_1.createBrowserHistory();
const composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : redux_1.compose;
exports.store = redux_1.createStore(redux_1.combineReducers({
    user: redux_persist_1.persistReducer(userPersistConfig, reducer_1.default),
    router: connected_react_router_1.connectRouter(exports.history),
}), composeEnhancers(redux_1.applyMiddleware(connected_react_router_2.routerMiddleware(exports.history), exports.sagaMiddleware)));
function configureStore() {
    exports.sagaMiddleware.run(sagas_1.default);
    const persistor = redux_persist_1.persistStore(exports.store);
    return { store: exports.store, persistor };
}
exports.configureStore = configureStore;
//# sourceMappingURL=store.js.map