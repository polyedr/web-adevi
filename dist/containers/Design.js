"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const actions = require("$redux/user/actions");
const react_hot_loader_1 = require("react-hot-loader");
const Project_1 = require("$components/Project");
class Design extends React.Component {
    render() {
        return (React.createElement(Project_1.default, null));
    }
}
const mapStateToProps = (state, props) => ({
    minLPanel: state.user.minLPanel,
});
const mapDispatchToProps = (dispatch) => redux_1.bindActionCreators(Object.assign({}, actions), dispatch);
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(react_hot_loader_1.hot(module)(Design));
//# sourceMappingURL=Design.js.map