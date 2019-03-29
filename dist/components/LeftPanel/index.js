"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const images_1 = require("$constants/images");
const styles = require("./styles.scss");
;
const LeftPanel = (props) => {
    const { username, userType, minLPanel } = props;
    return (React.createElement("aside", { className: `${styles.main} ${minLPanel && styles.minPanel}` },
        minLPanel ?
            React.createElement("div", { className: styles.logo },
                React.createElement("img", { src: images_1.IMAGES["logo"] }))
            :
                React.createElement("div", { className: styles.prof },
                    React.createElement("img", { src: images_1.IMAGES["prof"] }),
                    React.createElement("div", { className: styles.username },
                        React.createElement("span", null, username),
                        React.createElement("span", null, userType))),
        React.createElement("div", { className: styles.navigating },
            React.createElement(react_router_dom_1.NavLink, { exact: true, to: "/dashboard", activeClassName: "active" },
                React.createElement("i", { className: "material-icons" }, "dashboard"),
                React.createElement("span", null, "My Projects")),
            React.createElement(react_router_dom_1.NavLink, { to: "/library", activeClassName: "active" },
                React.createElement("i", { className: "material-icons" }, "drag_indicator"),
                React.createElement("span", null, "Storage Library")),
            React.createElement(react_router_dom_1.NavLink, { to: "/payments", activeClassName: "active" },
                React.createElement("i", { className: "material-icons" }, "payment"),
                React.createElement("span", null, "Payment Package")))));
};
exports.default = LeftPanel;
//# sourceMappingURL=index.js.map