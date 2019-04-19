import * as React from 'react';
import * as Sortable from 'react-sortablejs';
import classNames from 'classnames';

export type IOnChange = (parent: string, items: any) => void;

interface IComponentProps {
  parent: string,
  group: string,
  styles: any,
  children?: any,
  onChange: IOnChange,
  onChoose: (itemIndex: string) => void,
}

const Component: React.FunctionComponent<IComponentProps> = ({
  parent,
  group,
  styles,
  children,
  onChoose,
  onChange,
}) => {
  const handleChoose = (ent) => {
    onChoose(ent.oldIndex);
  };

  const handleChange = (items: string[], sortable, evt) => {
    onChange(parent, items);
  };

  // if (!children) return null;

  return (
    <Sortable
      id={parent}
      className={classNames(styles.groupItem, styles[group])}
      // tag="ul" Defaults to "div"
      options={{
        swapThreshold: 1, // Threshold of the swap zone
        draggable: '.block, .group, .elem, .input, .button, .hyperLine', // which items inside the element should be draggable
        // animation: 150, // ms
        group: {
          group, // название группы;
          // pull: 'clone', // «вытаскивать» элементы при перемещении
          put: true, // принять элемент из другой группы, либо массив разрешенных групп.
        },
        onChoose: handleChoose,
        // onAdd: this.onUpdate,
        // onRemove: this.onUpdate,
        // onUpdate: this.onUpdate,
        // fallbackOnBody: true,
        // removeCloneOnHide: true,
        // scroll — включить авто-прокрутку;
        // scrollSensitivity — на сколько нужно приблизится к краю для активации прокрутки;
        // scrollSpeed — скорость прокрутки в `px`;
      }}
      // ref={(c) => {
      //   if (c) {
      //     this.sortable = c.sortable;
      //   }
      // }}
      onChange={handleChange}
    >
      {children}
    </Sortable>
  );
};

export const SortableGroup = Component;

/*
  onUpdate = ({
    type,
    to,
    from,
    newIndex,
    oldIndex,
  }) => {
    const { onAdd, onRemove, onUpdate } = this.props;

    switch (type) {
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
*/
