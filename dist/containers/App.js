"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_hot_loader_1 = require("react-hot-loader");
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const connected_react_router_1 = require("connected-react-router");
const react_router_dom_1 = require("react-router-dom");
const classnames_1 = require("classnames");
const store_1 = require("$redux/store");
const actions = require("$redux/user/actions");
const LeftPanel_1 = require("$components/LeftPanel");
const TopPanel_1 = require("$components/TopPanel");
const Dashboard_1 = require("$components/Dashboard");
const EditorLogic_1 = require("$containers/EditorLogic");
const styles = require("$styles/global.scss");
class Component extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onMinimiserLPanel = () => {
            this.props.changeMinLPanel();
        };
    }
    render() {
        const { minLPanel } = this.props;
        return (React.createElement(connected_react_router_1.ConnectedRouter, { history: store_1.history },
            React.createElement("div", { className: styles.app },
                React.createElement(LeftPanel_1.default, { username: "Test", userType: "Web Developer", minLPanel: minLPanel }),
                React.createElement("div", { className: classnames_1.default(styles.container, minLPanel && styles.minimiser) },
                    React.createElement(TopPanel_1.default, { onMinimiserLPanel: this.onMinimiserLPanel }),
                    React.createElement(react_router_dom_1.Switch, null,
                        React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Dashboard_1.default }),
                        React.createElement(react_router_dom_1.Route, { path: "/dashboard", component: Dashboard_1.default }),
                        React.createElement(react_router_dom_1.Route, { path: "/design/:projectId", component: EditorLogic_1.default }))))));
    }
}
const mapStateToProps = (state, props) => ({
    minLPanel: state.user.minLPanel,
});
const mapDispatchToProps = (dispatch) => redux_1.bindActionCreators(Object.assign({}, actions), dispatch);
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(react_hot_loader_1.hot(module)(Component));
//# sourceMappingURL=App.js.map