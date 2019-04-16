import * as React from 'react';
import { Prompt } from 'react-router';
import * as R from 'ramda';

import { IProjectScreen, TListElement } from '$redux/project/reducer';
import ScreenElements from '$components/ScreenElements';
import { IDelScreen, ISetScreenData } from '$redux/project/actions';
import { Icon } from '$components/UI/Icon';
import Button from '$components/UI/Button';
import Modal from '$components/UI/Modal';
import Checkbox from '$components/UI/Checkbox';
import { idGenerator } from '$redux/sagas';
import {
  TList,
  TListItem,
  getListRevers,
  getList,
} from '$utils/parseListItems';

const styles = require('./styles.scss');

type TOptions = {
  label: string,
  value: string,
}

interface IEditorProps {
  projectId: string,
  screen: IProjectScreen,
  dellScreen: IDelScreen,
  setScreenData: ISetScreenData,
}

interface IEditorState {
  scenario: string,
  modalOpen: boolean,
  activeSection: string,
  listItems: TList,
}

const options: TOptions[] = [
  { label: 'Text', value: 'text' },
  { label: 'Input', value: 'input' },
  { label: 'Button', value: 'button' },
  { label: 'HyperLine', value: 'hyperLine' },
  { label: 'RadioButton', value: 'radioButton' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Sign in', value: 'signIn' },
  { label: 'Sign up', value: 'signUp' },
  { label: '+Custom', value: 'custom' },
];

class Editor extends React.Component<IEditorProps, IEditorState> {
  constructor(props) {
    super(props);
    this.state = {
      scenario: '',
      modalOpen: false,
      listItems: getList(props.screen.screenData || []),
      activeSection: 'root',
    };
  }

  addElements = () => {
    this.setState({ modalOpen: true });
  };

  cancelModal = () => {
    this.setState({ modalOpen: false });
  };

  changeScenario = type => (event) => {
    console.log(type, event.target.checked);
  };

  onSelectScenario = ({ target }) => {
    console.log(target.value);
    this.setState({ scenario: target.value });
  };

  onActiveSection = (activeSection) => {
    this.setState({ activeSection });
  };

  onConfirmModal = () => {
    const {
      props: { screen },
      state: { scenario, activeSection },
    } = this;

    const id = `${scenario}${idGenerator()}`;

    const newElement: TListItem = {
      id,
      type: scenario,
      parent: activeSection,
      children: [],
    };

    const listItems:TList = R.assoc(id, newElement, getList(screen.screenData));
    const listChildren:string[] = R.append(id, R.path([activeSection, 'children'], listItems));
    const result = R.assocPath([activeSection, 'children'], listChildren, listItems);

    // this.saveScreenData(result);
    console.log(result);

    this.setState({ modalOpen: false });
  };

  saveScreenData = () => {
    const {
      props: { screen, setScreenData },
      state: { listItems },
    } = this;

    const screenData: TListElement[] = getListRevers(listItems);

    console.log(screenData);

    setScreenData({ ...screen, screenData });
  };

  removeScreen = () => {
    const { dellScreen, projectId, screen } = this.props;

    dellScreen(projectId, screen.id);
  };

  onUpdate = (parent: string, oldIndex: number, newIndex: number) => {
    const { listItems } = this.state;
    const el: string = listItems[parent].children[oldIndex];
    const newList: string[] = R.insert(newIndex, el, R.without([el], listItems[parent].children));

    this.setState(state => ({
      ...state,
      listItems: {
        ...state.listItems,
        [parent]: {
          ...state.listItems[parent],
          children: newList,
        },
      },
    }));
  };

  onAdd = (from, to, oldIndex, newIndex) => {
    const { listItems } = this.state;
    const el: string = listItems[from].children[oldIndex];
    const newList: string[] = R.insert(newIndex, el, listItems[to].children);
    const newItems: TListItem = { ...listItems[to], parent: to, children: newList };
    const newListItems: TList = R.assoc(to, newItems, listItems);

    this.setState(() => ({ listItems: newListItems }));
  };

  onRemove = (parent, index) => {
    const { listItems } = this.state;
    const newList: string[] = R.remove(index, 1, listItems[parent].children);

    this.setState(state => ({
      ...state,
      listItems: {
        ...state.listItems,
        [parent]: {
          ...state.listItems[parent],
          children: newList,
        },
      },
    }));
  };


  render() {
    const {
      props: { screen },
      state: {
        scenario,
        modalOpen,
      },
    } = this;

    return (
      <div className={styles.main} key={screen.id}>
        <div className={styles.navBar}>
          <div>
            left navPanel
          </div>
          <div className={styles.navBarTypeScreen}>
            <Button type="none" onClick={console.log}>
              <Icon icon="computer" size={32} />
            </Button>
            <Button type="none" onClick={console.log}>
              <Icon icon="table" />
            </Button>
            <Button type="none" onClick={console.log}>
              <Icon icon="phone" />
            </Button>
          </div>
          <div className={styles.navBarRight}>
            <Button
              type="none"
              onClick={this.removeScreen}
              disabled={!screen}
            >
              <Icon icon="delete" size={28} />
            </Button>
            <Button
              type="none"
              onClick={this.saveScreenData}
              disabled={!screen}
            >
              <Icon icon="save" size={28} />
            </Button>
          </div>
        </div>
        <div className={styles.contain}>
          <div className={styles.wrapper}>
            {screen && (
              <ScreenElements
                id="aa"
                items={screen.screenData}
                path={[]}
                depth={0}
                type="root"
                styles={styles}
                onActiveSection={this.onActiveSection}
                onUpdate={this.onUpdate}
                onAdd={this.onAdd}
                onRemove={this.onRemove}
                onChoose={this.onActiveSection}
              />
            )}
          </div>
          <div className={styles.leftPanel}>
            <div className={styles.grid}>
              Grid
            </div>
            <div>
              <Button
                className={styles.addElements}
                type="none"
                onClick={this.addElements}
                disabled={!screen}
              >
                <Icon icon="addCircle" size={36} />
              </Button>
            </div>
            Panel Edit Props
          </div>
        </div>
        {modalOpen && (
          <Modal
            title=""
            confirmText="Add"
            onConfirm={this.onConfirmModal}
            cancelText="Close"
            onClose={this.cancelModal}
          >
            <div className={styles.modal__body}>
              <div className={styles.section}>
                <h5>Scenario</h5>
                <Checkbox
                  name="oneClick"
                  label="one click scenario"
                  onChange={this.changeScenario('oneClick')}
                />
                <Checkbox
                  name="combined"
                  label="combined scenario"
                  onChange={this.changeScenario('combined')}
                />
                <select onChange={this.onSelectScenario} value={scenario}>
                  <option value="">Scenario type</option>
                  {options.map(item => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
              <div className={styles.section}>
                <h5>UI element</h5>
                <Checkbox
                  name="picture"
                  label="picture"
                  onChange={this.changeScenario('picture')}
                />
                <Checkbox
                  name="text"
                  label="text"
                  onChange={this.changeScenario('text')}
                />
                <Checkbox
                  name="widget"
                  label="widget"
                  onChange={this.changeScenario('widget')}
                />
                <select>
                  <option value="">Widget type</option>
                  <option value="maps">Google maps</option>
                  <option value="calendar">Calendar</option>
                  <option value="pictureDay">Picture of the day</option>
                </select>
              </div>
            </div>
          </Modal>
        )}
        <Prompt
          when={false}
          message="You have unsaved changes, are you sure you want to leave?"
        />
      </div>
    );
  }
}

export default Editor;
