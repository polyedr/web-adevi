import * as React from 'react';
import * as R from 'ramda';

import { TList, TListElement, getList, TListItem } from '$utils/parseListItems';
import Recursive from '$components/Recursive';


interface IProps {
  id: string,
  path?: string[],
  type: string,
  depth: number,
  items: TListElement[],
  styles: any,
}

interface IState {
  listItems: TList,
}

class ScreenElements extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      listItems: getList(props.items),
    };
  }

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
      props: { styles },
      state: { listItems },
    } = this;

    return (
      <Recursive
        listItems={listItems}
        item={listItems.root}
        styles={styles}
        onUpdate={this.onUpdate}
        onAdd={this.onAdd}
        onRemove={this.onRemove}
      />
    );
  }
}

export default ScreenElements;
