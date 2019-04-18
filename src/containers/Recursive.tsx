import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '$redux/project/actions';
import { RENDERERS } from '$components/UI/RenderElements';
import { IListSortable, ISortableItem } from '$utils/parseListItems';
import { SortableGroup, IOnChange } from '$components/Editor/SortableGroup';

interface IComponentProps {
  item: ISortableItem,
  styles: any,
  onChoose: (parent: string) => void,
  listItems: IListSortable,
  listSortable: IListSortable,
  setListSortable: typeof actions.setListSortable,
}

const Component: React.FunctionComponent<IComponentProps> = ({
  item,
  styles,
  onChoose,
  listSortable,
  setListSortable,
}: IComponentProps) => {
  const updateSortableList: IOnChange = (parent, items) => {
    const newLS: IListSortable = {
      ...listSortable,
      [parent]: {
        ...listSortable[parent],
        children: items,
      },
    };

    setListSortable(newLS);
  };

  return (
    <SortableGroup
      parent={item.id}
      group="group"
      styles={styles}
      onChoose={onChoose}
      onChange={updateSortableList}
    >
      {
        item.children.map((itemId) => {
          const currentItem = listSortable[itemId];
          const element = RENDERERS[currentItem.type];

          if (element) {
            return element({
              key: itemId,
              id: itemId,
              children: <Recursive
                key={itemId}
                item={currentItem}
                styles={styles}
                onChoose={onChoose}
                onChange={updateSortableList}
              />,
            });
          }

          return null;
        })
      }
    </SortableGroup>
  );
};

const mapStateToProps = (state, props) => {
  const { currentScreen: { listSortable } } = state.project;
  const itemParent = listSortable[props.item.id];

  const curListSortable = itemParent.children.reduce((items, childId) => ({
    ...items,
    [childId]: listSortable[childId],
  }), { [itemParent.id]: itemParent });

  return {
    listSortable: curListSortable,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setListSortable: actions.setListSortable,
}, dispatch);

export const Recursive = connect(mapStateToProps, mapDispatchToProps)(Component);
