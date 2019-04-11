import * as React from 'react';

import Modal from '$components/UI/Modal';
import { Icon } from '$components/UI/Icon';
import Button from '$components/UI/Button';
import Editor from '$components/Editor';
import { IProject, IProjectScreen } from '$redux/project/reducer';

const styles = require('./styles.scss');

interface IProjectProps {
  project: IProject,
  dellScreen(projectId: string, screenId: string): void,
  addScreenImg(projectId: string, name: string, fileData: File): void,
  addScreenEmpty(projectId: string, name: string): void,
  getScreenData(projectId: string, screenId: string): void,
}

interface IProjectState {
  screenName: string,
  modalOpen: boolean,
  modalMsgDanger: string,
  screenId: string,
  // screenData: IProjectScreen,
}

class Project extends React.Component<IProjectProps, IProjectState> {
  state = {
    screenName: '',
    modalOpen: false,
    modalMsgDanger: '',
    screenId: null,
    // screenData: null,
  };

  // componentWillReceiveProps({ project }) {
  //   const { screenId } = this.state;
  //
  //   if (screenId) {
  //     const screenData: IProjectScreen = project.screens.find(screen => screen.id === screenId);
  //     if (screenData) {
  //       this.setState({ screenData });
  //     }
  //   }
  // }

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  cancelModal = () => {
    this.setState({
      screenName: '',
      modalMsgDanger: '',
      modalOpen: false,
    });
  };

  handleAddScreen = () => {
    const {
      props: { project: { id }, addScreenEmpty },
      state: { screenName },
    } = this;

    if (screenName === '') {
      this.setState({ modalMsgDanger: 'Name not specified' });
    } else {
      addScreenEmpty(id, screenName);
      this.cancelModal();
    }
  };

  changeScreenName = (e) => {
    this.setState({
      screenName: e.target.value,
      modalMsgDanger: '',
    });
  };

  handleDelScreen(screenId) {
    const { dellScreen, project: { id } } = this.props;
    dellScreen(id, screenId);
  }

  handleEditScreen(id) {
    const { project, getScreenData } = this.props;

    getScreenData(project.id, id);
    this.setState({ screenId: id });
  }

  render() {
    const {
      props: { project },
      state: {
        modalOpen,
        screenName,
        modalMsgDanger,
        screenId,
      },
    } = this;

    const selectScreen:IProjectScreen = project.screens.find(s => s.id === screenId);

    return (
      <React.Fragment>
        <div className={styles.main}>
          <div className={styles.titleProject}>
            <p>{project.name}</p>
          </div>
          <div className={styles.screensSection}>
            {project.screens.map(screen => (
              <div key={screen.id} className={styles.screensBlock}>
                <div className={styles.titleScreen}>
                  <p>{screen.name}</p>
                  <Button type="none" onClick={() => this.handleDelScreen(screen.id)}>
                    <Icon icon="del" size={24} />
                  </Button>
                </div>
                <div
                  className={styles.previewScreen}
                  onClick={() => this.handleEditScreen(screen.id)}
                >
                  <img src={screen.previewUrl} alt="screen" />
                  <Icon icon="edit" size={48} />
                </div>
              </div>
            ))}
            <div className={styles.addScreen}>
              <button className={styles.btnAddScreen} onClick={this.openModal} type="button">
                <Icon icon="addScreen" size={48} />
              </button>
            </div>
          </div>
        </div>
        <Editor
          screen={selectScreen}
        />
        { modalOpen
        && (
          <Modal
            title="Add Screen"
            confirmText="Add"
            onConfirm={this.handleAddScreen}
            cancelText="Close"
            onClose={this.cancelModal}
          >
            <div className={styles.modal__body}>
              <input
                type="text"
                className={styles.screenName}
                value={screenName}
                placeholder="Screen name"
                onChange={this.changeScreenName}
              />
              {modalMsgDanger
                && <p>{modalMsgDanger}</p>
              }
            </div>
          </Modal>
        )
        }
      </React.Fragment>
    );
  }
}

export default Project;
