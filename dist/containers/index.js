"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const styles = require("../components/Navbar/styles.scss");
;
exports.Navbar = (props) => {
    const {} = props;
    return (React.createElement("div", { className: styles.main },
        React.createElement("div", { className: "profile" },
            React.createElement("img", { alt: "image" })),
        React.createElement(react_router_dom_1.NavLink, { exact: true, to: "/", activeClassName: "active" }, "Root"),
        React.createElement(react_router_dom_1.NavLink, { to: "/projects", activeClassName: "active" }, "Projects")));
};
exports.default = exports.Navbar;
//# sourceMappingURL=index.js.map