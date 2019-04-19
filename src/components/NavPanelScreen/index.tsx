import * as React from 'react';
import classNames from 'classnames';

import { IProject, IProjectScreen } from '$redux/project/reducer';
import Modal from '$components/UI/Modal';
import { Icon } from '$components/UI/Icon';
import Button from '$components/UI/Button';
import { TAddScreen, TGetProject, TGetScreen } from '$redux/project/actions';

const styles = require('./styles.scss');

interface IProps {
  projectId: string,
  project: IProject,
  screen: IProjectScreen,
  getProject: TGetProject,
  getScreen: TGetScreen,
  addScreen: TAddScreen,
}

interface IState {
  screenName: string,
  modalOpen: boolean,
  modalMsgDanger: string,
}

class NavPanelScreen extends React.Component<IProps, IState> {
  state = {
    screenName: '',
    modalOpen: false,
    modalMsgDanger: '',
  };

  componentDidMount() {
    const { getProject, projectId } = this.props;

    if (getProject) {
      getProject(projectId);
    }
  }

  openScreen = (id: string) => {
    const { getScreen, projectId } = this.props;
    getScreen(projectId, id);
  };

  changeScreenName = (e) => {
    this.setState({
      screenName: e.target.value,
      modalMsgDanger: '',
    });
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
      props: { projectId, addScreen },
      state: { screenName },
    } = this;

    if (screenName === '') {
      this.setState({ modalMsgDanger: 'Name not specified' });
    } else {
      addScreen(projectId, screenName);
      this.cancelModal();
    }
  };

  render() {
    const {
      props: { project, screen },
      state: { modalOpen, screenName, modalMsgDanger },
    } = this;

    return (
      <div className={styles.main}>
        <div className={classNames(styles.addScreen, styles.tabs)}>
          <Button onClick={this.openModal} type="none">
            <Icon icon="addScreen" size={28} />
          </Button>
        </div>
        {project && project.listScreen && project.listScreen.map(s => (
          <Button
            key={s.id}
            type="none"
            className={classNames(styles.tabs, screen && s.id === screen.id ? styles.active : '')}
            onClick={() => this.openScreen(s.id)}
          >
            {s.name}
          </Button>
        ))}
        {modalOpen
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
        )}
      </div>
    );
  }
}

export default NavPanelScreen;
