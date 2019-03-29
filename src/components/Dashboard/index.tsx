import * as React from 'react';
import classNames from "classnames";
import {Link} from 'react-router-dom';

import Button from "$components/utilities/Button";
import Modal from "$components/utilities/Modal";

const styles = require("./styles.scss");

interface IProjectsProps {
}

interface IProjectsState {
  search: string,
  projectName: string,
  selectAll: boolean,
  modalOpen: boolean,
}

const projects = [
  {
    id: "a123",
    name: "project",
    select: false,
    type: "pending",
    countPages: 2,
  }
];

class Projects extends React.Component<IProjectsProps, IProjectsState> {
  state = {
    search: "",
    projectName: "",
    selectAll: false,
    modalOpen: false,
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log(e);
  };

  changeSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  changeSelectAll = (e) => {
    this.setState({ selectAll: e.target.checked });
  };

  changeProjectName = (e) => {
    this.setState({ projectName: e.target.value });
  };

  openModal = () => {
    this.setState({modalOpen: true});
  };

  cancelModal = () => {
    this.setState({modalOpen: false});
  };

  createProject = () => {
    const { projectName } = this.state;
    if (projectName.length) {
      this.setState({modalOpen: false});
    }
  };

  render() {
    const {
      props: {},
      state: { search, modalOpen, projectName },
    } = this;

    return (
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.tools}>
            <h4>All Projects</h4>
            <div>
              <Button onClick={(e) => this.handleClick(e)}>
                <i className="material-icons">shopping_cart</i>
                Your Cart
              </Button>
              <Button onClick={this.openModal}>
                Create a project
              </Button>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.search}>
              <input
                type="text"
                value={ search }
                onChange={this.changeSearch}
                placeholder="Search project..."
              />
              <Button onClick={console.log}>
                Go!
              </Button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={this.changeSelectAll}
                    />
                  </th>
                  <th>Project Status</th>
                  <th>Project Name</th>
                  <th>Total Pages</th>
                  <th>All Pages</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { projects.map(item => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.select}
                        onChange={() => {}}
                      />
                    </td>
                    <td className="text-green">
                      {item.type}
                    </td>
                    <td>
                      <Link to={`/design/:${item.id}`}>
                        {item.name}
                      </Link>
                    </td>
                    <td>
                      {item.countPages}
                    </td>
                    <td>
                      <a>
                        <img className="img-circle" src="" />
                      </a>
                    </td>
                    <td className="text-navy">
                      <Button type="none" onClick={console.log}>
                        <i className={classNames("material-icons", styles.payment )}>
                          payment
                        </i>
                      </Button>
                      <Button type="none" onClick={console.log}>
                        <i className={classNames("material-icons", styles.delete )}>
                          delete
                        </i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.actions}>
            <Button onClick={console.log}>
              Checkout all selected projects
            </Button>
          </div>
        </div>
        { modalOpen &&
          <Modal
            title="Create Project"
            confirmText="Create"
            onConfirm={this.createProject}
            cancelText={"Close"}
            onClose={this.cancelModal}>
            <div className={styles.modal__body}>
              <input
                type="text"
                value={projectName}
                placeholder="Project name"
                onChange={this.changeProjectName}
              />
              <p>This field is required.</p>
            </div>
          </Modal>
        }
      </main>
    );
  }


};

export default Projects;
