import * as React from 'react';

import { TList, getList } from '$utils/parseListItems';
import { TListElement } from '$redux/project/reducer';
import { Recursive } from '$components/Recursive';


interface IProps {
  id: string,
  path?: string[],
  type: string,
  depth: number,
  items: TListElement[],
  styles: any,
  onActiveSection: (parent: string) => void,
  onUpdate: (parent: string, oldIndex: number, newIndex: number) => void,
  onAdd: (fromParent: string, toParent: string, oldIndex: number, newIndex: number) => void,
  onRemove: (fromParent: string, index: number) => void,
  onChoose: (parent: string) => void,
}

interface IState {
  listItems: TList,
}

class ScreenElements extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      listItems: getList(props.items || []),
    };
  }

  componentWillReceiveProps({ items }) {
    if (items) {
      this.setState(() => ({ listItems: getList(items || []) }));
    }
  }

  render() {
    const {
      props: {
        styles,
        onUpdate,
        onAdd,
        onRemove,
        onChoose,
      },
      state: { listItems },
    } = this;

    return (
      <Recursive
        listItems={listItems}
        item={listItems.root}
        styles={styles}
        onUpdate={onUpdate}
        onAdd={onAdd}
        onRemove={onRemove}
        onChoose={onChoose}
      />
    );
  }
}

export default ScreenElements;
