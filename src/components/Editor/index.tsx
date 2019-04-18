import * as React from 'react';
import { Prompt } from 'react-router';

import { uniqueId } from '$redux/sagas';
import { optionsUIMenu } from '$constants/menu';
import { Recursive } from '$containers/Recursive';
import { Icon } from '$components/UI/Icon';
import Button from '$components/UI/Button';
import Modal from '$components/UI/Modal';
import Checkbox from '$components/UI/Checkbox';
import { IProjectScreen } from '$redux/project/reducer';
import { IOnChange } from '$components/Editor/SortableGroup';
import { IListSortable, ISortableItem } from '$utils/parseListItems';
import {
  TDelScreen,
  TAddElement,
  TSetScreen,
  TSetListSortable,
} from '$redux/project/actions';


const styles = require('./styles.scss');

interface IEditorProps {
  projectId: string,
  screen: IProjectScreen,
  dellScreen: TDelScreen,
  setScreen: TSetScreen,
  addElement: TAddElement,
  setListSortable: TSetListSortable,
}

interface IEditorState {
  scenario: string,
  modalAddOpen: boolean,
  modalDellOpen: boolean,
  activeSection: string,
}

class Editor extends React.Component<IEditorProps, IEditorState> {
  constructor(props) {
    super(props);
    this.state = {
      scenario: '',
      modalAddOpen: false,
      modalDellOpen: false,
      // listItems: props.screen && getList(props.screen.screenData),
      activeSection: 'root',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.screen) {
      // this.setState(() => ({ listItems: getList(nextProps.screen.screenData) }));
    }
  }

  addElements = () => {
    this.setState({ modalAddOpen: true });
  };

  cancelModal = () => {
    this.setState({
      modalAddOpen: false,
      modalDellOpen: false,
    });
  };

  changeScenario = type => (event) => {
    console.log(type, event.target.checked);
  };

  onSelectScenario = ({ target }) => {
    this.setState({ scenario: target.value });
  };

  onActiveSection = (activeSection) => {
    this.setState({ activeSection });
  };

  openModalDell = () => {
    this.setState({
      modalDellOpen: true,
    });
  };

  onConfirmModalAdd = () => {
    const {
      props: { addElement },
      state: { scenario, activeSection },
    } = this;

    const id = `${scenario}${uniqueId()}`;

    const newElement: ISortableItem = {
      id,
      type: scenario,
      children: [],
    };

    addElement(activeSection, newElement);

    this.setState({
      modalAddOpen: false,
    });
  };


  onConfirmModalDell = () => {
    const { dellScreen, projectId, screen } = this.props;

    dellScreen(projectId, screen.id);
  };

  updateSortableList: IOnChange = (parent, items) => {
    const { screen: { listSortable }, setListSortable } = this.props;
    const newLS: IListSortable = {
      ...listSortable,
      [parent]: {
        ...listSortable[parent],
        children: items,
      },
    };

    setListSortable(newLS);
  };

  saveScreen = () => {

  };

  render() {
    const {
      props: { screen },
      state: {
        scenario,
        modalAddOpen,
        modalDellOpen,
      },
    } = this;

    return (
      <div className={styles.main}>
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
              onClick={this.openModalDell}
              disabled={!screen}
            >
              <Icon icon="delete" size={28} />
            </Button>
            <Button
              type="none"
              onClick={this.saveScreen}
              disabled={!screen}
            >
              <Icon icon="save" size={28} />
            </Button>
          </div>
        </div>
        <div className={styles.contain}>
          <div className={styles.wrapper}>
            {
              screen && (
                <Recursive
                  item={screen.listSortable.root}
                  styles={styles}
                  onChoose={this.onActiveSection}
                  onChange={this.updateSortableList}
                />
              )
            }
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
        {modalDellOpen && (
          <Modal
            title=""
            confirmText="Delete"
            onConfirm={this.onConfirmModalDell}
            cancelText="Close"
            onClose={this.cancelModal}
          >
            <div className={styles.modal__body}>
              {`Delete Screen: ${screen.name}`}
            </div>
          </Modal>
        )}
        {modalAddOpen && (
          <Modal
            title=""
            confirmText="Add"
            onConfirm={this.onConfirmModalAdd}
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
                  {optionsUIMenu.map(item => (
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

/*
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
    const newItems: ISortableItem = { ...listItems[to], parent: to, children: newList };
    const newListItems: IListSortable = R.assoc(to, newItems, listItems);

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

  onChange = (parent, children) => {
    this.setState(state => ({
      ...state,
      listItems: {
        ...state.listItems,
        [parent]: {
          ...state.listItems[parent],
          children,
        },
      },
    }));
  };
*/
