import * as React from 'react';

import Modal from '$components/utility/Modal';
import { Icon } from '$components/utility/Icon';
import Button from '$components/utility/Button';
import Editor from '$components/Editor';
import { IProject, IProjectScreen } from '$redux/project/reducer';

const styles = require('./styles.scss');

interface IProjectProps {
  project: IProject,
  dellScreen(projectId: string, screenId: string): void,
  addScreenImg(projectId: string, name: string, fileData: File): void,
  addScreenEmpty(projectId: string, name: string): void,
}

interface IProjectState {
  screenName: string,
  modalOpen: boolean,
  modalMsgDanger: string,
  screenData: IProjectScreen,
}

class Project extends React.Component<IProjectProps, IProjectState> {
  state = {
    screenName: '',
    modalOpen: false,
    modalMsgDanger: '',
    screenData: null,
  };

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
    const { project } = this.props;
    const screenData:IProjectScreen = project.screens.find(screen => screen.id === id);

    if (screenData) {
      this.setState({ screenData });
    }
  }

  render() {
    const {
      props: { project },
      state: {
        modalOpen,
        screenName,
        modalMsgDanger,
        screenData,
      },
    } = this;

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
                <div className={styles.previewScreen}>
                  <img src={screen.previewUrl} alt="screen" />
                  <Button type="none" onClick={() => this.handleEditScreen(screen.id)}>
                    <Icon icon="edit" size={48} />
                  </Button>
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
          screenData={screenData}
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
