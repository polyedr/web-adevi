import * as React from 'react';
import { TList, TListItem } from '$utils/parseListItems';
import SortableGroup from '$components/SortableGroup';
import { RENDERERS } from '$utils/renderDom';

interface IRecursiveProps {
  item: TListItem,
  listItems: TList,
  styles: any,
  onUpdate: (parent: string, oldIndex: number, newIndex: number) => void,
  onAdd: (fromParent: string, toParent: string, oldIndex: number, newIndex: number) => void,
  onRemove: (fromParent: string, index: number) => void,
  onChoose: (parent: string) => void,
}

export const Recursive: React.FunctionComponent<IRecursiveProps> = ({
  item: { children, parent, id },
  listItems,
  styles,
  onUpdate,
  onAdd,
  onRemove,
  onChoose,
}: IRecursiveProps) => (
  <SortableGroup
    id={id}
    name={parent}
    styles={styles}
    onUpdate={onUpdate}
    onAdd={onAdd}
    onRemove={onRemove}
    onChoose={onChoose}
  >
    {
      children.map((el) => {
        const child = listItems[el];
        const element = RENDERERS[child.type];

        if (element) {
          return element({
            id: el,
            key: el,
            children: <Recursive
              key={`${parent}-${el}`}
              item={listItems[el]}
              listItems={listItems}
              styles={styles}
              onUpdate={onUpdate}
              onAdd={onAdd}
              onRemove={onRemove}
              onChoose={onChoose}
            />,
          });
        }

        return element({ id: el, key: el });
      })
    }
  </SortableGroup>
);
