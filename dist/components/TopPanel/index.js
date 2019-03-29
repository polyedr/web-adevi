"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles = require("./styles.scss");
class TopPanel extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            search: "",
        };
        this.handleChange = (e) => {
            this.setState({ search: e.target.value });
        };
    }
    render() {
        const { state: { search }, props: { onMinimiserLPanel }, } = this;
        return (React.createElement("header", { className: styles.main },
            React.createElement("div", { className: styles.btn_minLPanel, onClick: onMinimiserLPanel },
                React.createElement("i", { className: "material-icons" }, "menu")),
            React.createElement("input", { type: "text", value: search, onChange: this.handleChange, placeholder: "Search..." })));
    }
}
;
exports.default = TopPanel;
//# sourceMappingURL=index.js.map