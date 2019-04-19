import * as React from 'react';
import { Prompt } from 'react-router';

import { uniqueId } from '$redux/sagas';
import { optionsUIMenu } from '$constants/menu';
import { PanelEditProps } from '$components/Editor/PanelEditProps';
import Recursive from '$containers/Recursive';
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
  TDellElement,
  TSetScreen,
  TSetListSortable,
} from '$redux/project/actions';

const styles = require('./styles.scss');


export interface IActiveItem {
  parentId: string,
  itemId: string,
}

interface IEditorProps {
  projectId: string,
  screen: IProjectScreen,
  dellScreen: TDelScreen,
  setScreen: TSetScreen,
  addElement: TAddElement,
  dellElement: TDellElement,
  setListSortable: TSetListSortable,
}

interface IEditorState {
  scenario: string,
  modalAddOpen: boolean,
  modalDellOpen: boolean,
  activeItem: IActiveItem,
}


class Editor extends React.Component<IEditorProps, IEditorState> {
  constructor(props) {
    super(props);
    this.state = {
      scenario: '',
      modalAddOpen: false,
      modalDellOpen: false,
      activeItem: {
        parentId: '-1',
        itemId: 'root',
      },
    };
  }

  openModalAdd = () => {
    this.setState({ modalAddOpen: true });
  };

  openModalDell = () => {
    this.setState({
      modalDellOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalAddOpen: false,
      modalDellOpen: false,
    });
  };

  onConfirmModalAdd = () => {
    const {
      props: { addElement },
      state: { scenario, activeItem },
    } = this;

    const id = `${scenario}${uniqueId()}`;

    const newElement: ISortableItem = {
      id,
      type: scenario,
      children: [],
    };

    addElement(activeItem.itemId, newElement);

    this.setState({
      modalAddOpen: false,
    });
  };

  onConfirmModalDell = () => {
    const { dellScreen, projectId, screen } = this.props;

    dellScreen(projectId, screen.id);
  };

  onSelectScenario = ({ target }) => {
    this.setState({ scenario: target.value });
  };

  onItemActive = (parentId, itemId) => {
    this.setState({ activeItem: { parentId, itemId } });
  };

  handleDellElement = () => {
    const {
      props: { dellElement },
      state: { activeItem },
    } = this;

    if (activeItem.parentId === '-1') return;

    dellElement(activeItem.parentId, activeItem.itemId);

    this.setState({ activeItem: { parentId: '-1', itemId: 'root' } });
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

  changeScenario = type => (event) => {
    console.log(type, event.target.checked);
  };

  render() {
    const {
      props: { screen },
      state: {
        activeItem,
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
                  onChoose={this.onItemActive}
                  onChange={this.updateSortableList}
                />
              )
            }
          </div>
          <PanelEditProps
            activeItem={activeItem}
            disablePanel={typeof screen === 'undefined'}
            addElement={this.openModalAdd}
            dellElement={this.handleDellElement}
          />
        </div>
        {modalDellOpen && (
          <Modal
            title=""
            confirmText="Delete"
            onConfirm={this.onConfirmModalDell}
            cancelText="Close"
            onClose={this.closeModal}
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
            onClose={this.closeModal}
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
