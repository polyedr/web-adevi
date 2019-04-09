import * as React from 'react';
import * as Sortable from 'react-sortablejs';
import classNames from 'classnames';
import { IElement } from '$utils/renderDom';

interface IProps {
  name:string,
  styles: any,
  // listItems: any,
  children?: any,
  // onChange: (items:any, sortable: any, evt: any) => void,
}

interface IState {
  items: IElement[],
}

class SortableGroup extends React.Component<IProps, IState> {
  sortable = null;

  state = {
    items: this.props.children,
  };

  onChange = (newList, sortable, evt) => {
    // console.log({ newList, sortable, evt });
  };

  render() {
    const { name, styles } = this.props;
    const { items } = this.state;

    return (
      <Sortable
        className={classNames(styles.groupItem, styles[name])}
        // tag="ul" Defaults to "div"
        options={{
          animation: 150, // ms
          group: {
            name, //  название группы;
            // pull: 'clone', //   возможность «вытаскивать» элементы при перемещении между списками, так же свойство может принимать значение `clone`
            put: true, //      возможность принять элемент из другой группы, либо массив разрешенных групп.
          },
          onAdd: console.log,
          // onRemove: console.log,
          // onChoose: console.log,
          // onMove: console.log,

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
        onChange={this.onChange}
      >
        {items || null}
      </Sortable>
    );
  }
}

export default SortableGroup;
