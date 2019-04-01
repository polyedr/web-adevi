import * as React from 'react';
import classNames from 'classnames';

import { IProject } from '$constants/interface';
import Modal from '$components/utility/Modal';

const styles = require('./styles.scss');

interface IProjectProps {
  project: IProject,
  addScreen(name: string, fileData: File): void,
}

interface IProjectState {
  screenName: string,
  modalOpen: boolean,
  modalMsgDanger: string,
  imgData: File,
}

class Project extends React.Component<IProjectProps, IProjectState> {
  state = {
    screenName: '',
    modalOpen: false,
    modalMsgDanger: '',
    imgData: null,
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  cancelModal = () => {
    this.setState({
      screenName: '',
      modalMsgDanger: '',
      imgData: null,
      modalOpen: false,
    });
  };

  handleAddScreen = () => {
    const {
      props: { addScreen },
      state: { screenName, imgData },
    } = this;

    if (screenName === '') {
      this.setState({ modalMsgDanger: 'Name not specified' });
    } else if (!imgData) {
      this.setState({ modalMsgDanger: 'image not selected' });
    } else {
      addScreen(screenName, imgData);

      this.cancelModal();
    }
  };

  changeScreenName = (e) => {
    this.setState({
      screenName: e.target.value,
      modalMsgDanger: '',
    });
  };

  uploadImages = (event) => {
    event.preventDefault();
    const file: File = (event.target.files)[0];

    // changeScreenImages(file);

    this.setState({
      imgData: file,
      modalMsgDanger: '',
    });
  };

  render() {
    const {
      props: { project },
      state: { modalOpen, screenName, modalMsgDanger },
    } = this;

    return (
      <div className={styles.main}>
        <div className={styles.projectSection}>
          <div className={styles.titleProject}>
            <p>{project.name}</p>
          </div>
          <div className={styles.screenProject}>
            {project.projectScreens.map(screen => (
              <div key={screen.id}>
                <p>screen.name</p>
                <img src={screen.previewUrl} alt="screen" />
              </div>
            ))}
            <div className={styles.addScreen}>
              <button onClick={this.openModal} type="button">
                <i className={classNames('material-icons', styles.icoAddScreen)}>
                add_to_queue
                </i>
              </button>
            </div>
          </div>

        </div>
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
              <input
                className={styles.browseImg}
                type="file"
                onChange={this.uploadImages}
              />
            </div>
          </Modal>
        )
        }
      </div>
    );
  }
}

export default Project;
