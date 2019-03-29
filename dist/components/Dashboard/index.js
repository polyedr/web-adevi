"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classnames_1 = require("classnames");
const react_router_dom_1 = require("react-router-dom");
const Button_1 = require("$components/utilities/Button");
const Modal_1 = require("$components/utilities/Modal");
const styles = require("./styles.scss");
const projects = [
    {
        id: "a123",
        name: "project",
        select: false,
        type: "pending",
        countPages: 2,
    }
];
class Projects extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            search: "",
            projectName: "",
            selectAll: false,
            modalOpen: false,
        };
        this.handleClick = (e) => {
            e.preventDefault();
            console.log(e);
        };
        this.changeSearch = (e) => {
            this.setState({ search: e.target.value });
        };
        this.changeSelectAll = (e) => {
            this.setState({ selectAll: e.target.checked });
        };
        this.changeProjectName = (e) => {
            this.setState({ projectName: e.target.value });
        };
        this.openModal = () => {
            this.setState({ modalOpen: true });
        };
        this.cancelModal = () => {
            this.setState({ modalOpen: false });
        };
        this.createProject = () => {
            const { projectName } = this.state;
            if (projectName.length) {
                this.setState({ modalOpen: false });
            }
        };
    }
    render() {
        const { props: {}, state: { search, modalOpen, projectName }, } = this;
        return (React.createElement("main", { className: styles.main },
            React.createElement("div", { className: styles.wrapper },
                React.createElement("div", { className: styles.tools },
                    React.createElement("h4", null, "All Projects"),
                    React.createElement("div", null,
                        React.createElement(Button_1.default, { onClick: (e) => this.handleClick(e) },
                            React.createElement("i", { className: "material-icons" }, "shopping_cart"),
                            "Your Cart"),
                        React.createElement(Button_1.default, { onClick: this.openModal }, "Create a project"))),
                React.createElement("div", { className: styles.content },
                    React.createElement("div", { className: styles.search },
                        React.createElement("input", { type: "text", value: search, onChange: this.changeSearch, placeholder: "Search project..." }),
                        React.createElement(Button_1.default, { onClick: console.log }, "Go!")),
                    React.createElement("table", null,
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null,
                                    React.createElement("input", { type: "checkbox", onChange: this.changeSelectAll })),
                                React.createElement("th", null, "Project Status"),
                                React.createElement("th", null, "Project Name"),
                                React.createElement("th", null, "Total Pages"),
                                React.createElement("th", null, "All Pages"),
                                React.createElement("th", null, "Actions"))),
                        React.createElement("tbody", null, projects.map(item => (React.createElement("tr", { key: item.id },
                            React.createElement("td", null,
                                React.createElement("input", { type: "checkbox", checked: item.select, onChange: () => { } })),
                            React.createElement("td", { className: "text-green" }, item.type),
                            React.createElement("td", null,
                                React.createElement(react_router_dom_1.Link, { to: `/design/:${item.id}` }, item.name)),
                            React.createElement("td", null, item.countPages),
                            React.createElement("td", null,
                                React.createElement("a", null,
                                    React.createElement("img", { className: "img-circle", src: "" }))),
                            React.createElement("td", { className: "text-navy" },
                                React.createElement(Button_1.default, { type: "none", onClick: console.log },
                                    React.createElement("i", { className: classnames_1.default("material-icons", styles.payment) }, "payment")),
                                React.createElement(Button_1.default, { type: "none", onClick: console.log },
                                    React.createElement("i", { className: classnames_1.default("material-icons", styles.delete) }, "delete"))))))))),
                React.createElement("div", { className: styles.actions },
                    React.createElement(Button_1.default, { onClick: console.log }, "Checkout all selected projects"))),
            modalOpen &&
                React.createElement(Modal_1.default, { title: "Create Project", confirmText: "Create", onConfirm: this.createProject, cancelText: "Close", onClose: this.cancelModal },
                    React.createElement("div", { className: styles.modal__body },
                        React.createElement("input", { type: "text", value: projectName, placeholder: "Project name", onChange: this.changeProjectName }),
                        React.createElement("p", null, "This field is required.")))));
    }
}
;
exports.default = Projects;
//# sourceMappingURL=index.js.map