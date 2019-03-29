"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Button_1 = require("$components/utilities/Button");
const classnames_1 = require("classnames");
const styles = require("./styles.scss");
;
const Modal = ({ title, confirmText, cancelText, onConfirm, onClose, children, confirmDisabled }) => {
    return (React.createElement("div", { className: styles.modal__wrapper },
        React.createElement("div", { className: styles.modal__backdrop, onClick: () => onConfirm ? null : onClose() }),
        React.createElement("div", { className: classnames_1.default(styles.modal__inner, cancelText || (confirmText && onConfirm) ? styles.hasActions : "") },
            React.createElement("div", { className: styles.modal__header },
                React.createElement("h3", { className: styles.title }, title),
                React.createElement(Button_1.default, { type: "none", onClick: () => onClose() },
                    React.createElement("i", { className: "material-icons" }, "close"))),
            React.createElement("div", { className: styles.modal__body }, children),
            React.createElement("div", { className: styles.modal__actions },
                cancelText && (React.createElement(Button_1.default, { type: "cancel", onClick: () => {
                        onClose();
                        return true;
                    } }, cancelText)),
                confirmText && onConfirm && (React.createElement(Button_1.default, { type: cancelText ? `confirm` : `primary`, disabled: !!confirmDisabled, onClick: () => {
                        onConfirm && onConfirm();
                        return true;
                    } }, confirmText))))));
};
exports.default = Modal;
//# sourceMappingURL=Modal.js.map