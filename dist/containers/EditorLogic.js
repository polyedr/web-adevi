"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const react_hot_loader_1 = require("react-hot-loader");
const actions = require("$redux/user/actions");
const Editor_1 = require("$components/Editor");
class EditorLogic extends React.Component {
    render() {
        return (React.createElement(Editor_1.default, null));
    }
}
const mapStateToProps = (state, props) => ({
    minLPanel: state.user.minLPanel,
});
const mapDispatchToProps = (dispatch) => redux_1.bindActionCreators(Object.assign({}, actions), dispatch);
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(react_hot_loader_1.hot(module)(EditorLogic));
//# sourceMappingURL=EditorLogic.js.map