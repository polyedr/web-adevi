import * as React from 'react';
import * as Sortable from 'react-sortablejs';
import classNames from 'classnames';

interface IProps {
  name:string,
  styles: any,
  children?: any,
  onUpdate: (parent: string, oldIndex: number, newIndex: number) => void,
  onAdd: (fromParent: string, toParent: string, oldIndex: number, newIndex: number) => void,
  onRemove: (parent: string, index: number) => void,
  id: string,
}

class SortableGroup extends React.Component<IProps> {
  sortable = null;

  onUpdate = (event) => {
    const { onAdd, onRemove, onUpdate } = this.props;
    const { to, from, newIndex, oldIndex } = event;

    switch (event.type) {
      case 'add':
        onAdd(from.id, to.id, oldIndex, newIndex);
        break;

      case 'remove':
        onRemove(from.id, oldIndex);
        break;

      case 'update':
        onUpdate(from.id, oldIndex, newIndex);
        break;

      default: break;
    }
  };

  render() {
    const {
      id,
      children,
      name,
      styles,
    } = this.props;

    if (!children) return null;

    return (
      <Sortable
        id={id}
        className={classNames(styles.groupItem, styles[name])}
        // tag="ul" Defaults to "div"
        options={{
          animation: 150, // ms
          group: {
            name, //  название группы;
            // pull: 'clone', //   возможность «вытаскивать» элементы при перемещении между списками, так же свойство может принимать значение `clone`
            put: true, //      возможность принять элемент из другой группы, либо массив разрешенных групп.
          },
          onAdd: this.onUpdate,
          onRemove: this.onUpdate,
          onUpdate: this.onUpdate,
          // fallbackOnBody: true,
          // removeCloneOnHide: true,
          // scroll — включить авто-прокрутку;
          // scrollSensitivity — на сколько нужно приблизится к краю для активации прокрутки;
          // scrollSpeed — скорость прокрутки в `px`;
        }}
        ref={(c) => {
          if (c) {
            this.sortable = c.sortable;
          }
        }}
        // onChange={console.log}
      >
        {children || null}
      </Sortable>
    );
  }
}

export default SortableGroup;
