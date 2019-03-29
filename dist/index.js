"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const react_redux_1 = require("react-redux");
const react_1 = require("redux-persist/integration/react");
const store_1 = require("$redux/store");
const App_1 = require("$containers/App");
require('./styles/main.scss');
const { store, persistor } = store_1.configureStore();
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_1.PersistGate, { loading: null, persistor: persistor },
        React.createElement(App_1.default, null))), document.getElementById('app'));
//# sourceMappingURL=index.js.map