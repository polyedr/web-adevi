"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles = require("./styles.scss");
const valid_types = [
    "none",
    "primary",
    "confirm",
    "secondary",
];
const Button = ({ children, type, disabled, onClick }) => {
    let props = {
        onClick,
    };
    if (!type || valid_types.indexOf(type) == -1)
        type = "confirm";
    props.className = `${styles.button} ${styles[type]}`;
    if (disabled)
        props.disabled = "disabled";
    return (React.createElement("button", Object.assign({}, props),
        React.createElement("span", null, children)));
};
exports.default = Button;
//# sourceMappingURL=Button.js.map