import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Button from '$components/UI/Button';
import Modal from '$components/UI/Modal';
import { IListProject } from '$redux/project/reducer';
import * as actions from '$redux/project/actions';

const styles = require('./styles.scss');

interface IDashboardProps {
  listProject: IListProject[],
  getListProject: actions.TGetListProject,
  createProject: actions.TCreateProject,
  delProject: actions.TDelProject,
  getProject: actions.TGetProject,
}

interface IDashboardState {
  search: string,
  projectName: string,
  selectAll: boolean,
  modalOpen: boolean,
  newProjectDanger: boolean,
}

class Projects extends React.Component<IDashboardProps, IDashboardState> {
  state = {
    search: '',
    projectName: '',
    modalOpen: false,
    newProjectDanger: false,
    selectAll: false,
  };

  componentDidMount() {
    const { listProject, getListProject } = this.props;
    if (getListProject && !listProject) {
      getListProject();
    }
  }

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
    this.setState({ modalOpen: true });
  };

  cancelModal = () => {
    this.setState({
      modalOpen: false,
      newProjectDanger: false,
    });
  };

  createProject = () => {
    const {
      props: { createProject },
      state: { projectName },
    } = this;
    if (projectName.length) {
      createProject(projectName);
      this.setState({
        modalOpen: false,
        projectName: '',
      });
    } else {
      this.setState({ newProjectDanger: true });
    }
  };

  paymentProjectAll = () => {
    console.log('payment all');
  };

  paymentProject(id: string) {
    console.log('payment', id);
  }

  dowloadProject(id) {
    console.log('download', id);
  }

  deleteProject(id) {
    const { delProject } = this.props;
    delProject(id);
    console.log('delete', id);
  }

  render() {
    const {
      props: { listProject, getProject },
      state: {
        search, modalOpen, projectName, newProjectDanger,
      },
    } = this;

    return (
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.tools}>
            <h4>All Projects</h4>
            <div>
              <Button onClick={this.handleClick}>
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
                value={search}
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  listProject && listProject.map(item => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={false}
                          onChange={() => {}}
                        />
                      </td>
                      <td className="text-green">
                        {item.status}
                      </td>
                      <td>
                        <Link to={`/project/${item.id}`}>
                          {item.name}
                        </Link>
                      </td>
                      <td>
                        {item.countScreens}
                      </td>
                      <td className={styles.textNavy}>
                        <Button type="none" onClick={() => this.dowloadProject(item.id)}>
                          <i className="material-icons">
                            cloud_download
                          </i>
                        </Button>
                        <Button type="none" onClick={() => this.paymentProject(item.id)}>
                          <i className={classNames('material-icons', styles.payment)}>
                            payment
                          </i>
                        </Button>
                        <Button type="none" onClick={() => this.deleteProject(item.id)}>
                          <i className={classNames('material-icons', styles.delete)}>
                            delete
                          </i>
                        </Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className={styles.actions}>
            <Button onClick={this.paymentProjectAll}>
              Checkout all selected projects
            </Button>
          </div>
        </div>
        { modalOpen
          && (
          <Modal
            title=""
            confirmText="Create"
            onConfirm={this.createProject}
            cancelText="Close"
            onClose={this.cancelModal}
          >
            <div className={styles.modal__body}>
              <i className="material-icons">
                laptop_mac
              </i>
              <h6>Create Project</h6>
              <input
                type="text"
                value={projectName}
                placeholder="Project name"
                onChange={this.changeProjectName}
              />
              { newProjectDanger
                && <p>This field is required.</p>
              }
            </div>
          </Modal>
          )
        }
      </main>
    );
  }
}

export default Projects;
