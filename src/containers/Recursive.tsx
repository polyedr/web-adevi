import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '$redux/project/actions';
import { RENDERERS } from '$components/UI/RenderElements';
import { IListSortable, ISortableItem } from '$utils/parseListItems';
import { SortableGroup } from '$components/Editor/SortableGroup';

interface IRecursiveProps {
  item: ISortableItem,
  styles: any,
  onChoose: (parentId: string, itemId) => void,
  onChange: (parent, items) => void,
  listItems: IListSortable,
  listSortable: IListSortable,
  setListSortable: typeof actions.setListSortable,
}

class Recursive extends React.Component<IRecursiveProps> {
  handleChoose = (itemIndex) => {
    const { item, onChoose } = this.props;
    const itemId: string = item.children[itemIndex];

    onChoose(item.id, itemId);
  };

  render() {
    const {
      item,
      styles,
      onChoose,
      onChange,
      listSortable,
    } = this.props;

    return (
      <SortableGroup
        parent={item.id}
        group="group"
        styles={styles}
        onChoose={this.handleChoose}
        onChange={onChange}
      >
        {
          item.children.map((itemId) => {
            const currentItem = listSortable[itemId];
            const element = RENDERERS[currentItem.type];

            if (element) {
              return element({
                key: itemId,
                id: itemId,
                children: <RecursiveConnected
                  key={itemId}
                  item={currentItem}
                  styles={styles}
                  onChoose={onChoose}
                  onChange={onChange}
                />,
              });
            }

            return null;
          })
        }
      </SortableGroup>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { currentScreen: { listSortable } } = state.project;
  const itemParent = listSortable[props.item.id];

  const curListSortable = itemParent.children.reduce((items, childId) => ({
    ...items,
    [childId]: listSortable[childId],
  }), {});

  return {
    listSortable: curListSortable,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setListSortable: actions.setListSortable,
}, dispatch);

const RecursiveConnected = connect(mapStateToProps, mapDispatchToProps)(Recursive);
export default RecursiveConnected;
