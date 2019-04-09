import * as React from 'react';
import { RENDERERS } from '$utils/renderDom';
import SortableGroup from '$components/SortableGroup';

interface IProps {
  el: {
    id: string,
    type: string
    children: any,
  }[],
  type: string,
  depth?: number,
  styles: any,
}

let ScreenElements = ({ el, depth = 0, styles }: IProps) => {
  if (!el) return null;

  return (
    <SortableGroup
      key={`sortable-${depth}`}
      name="groupR"
      styles={styles}
    >
      {
        el.map((child) => {
          const element = RENDERERS[child.type];
          if (element) {
            if (child.children && depth < 5) {
              return element({
                id: child.id,
                key: `${child.type}-${child.id}-${depth}`,
                children: <ScreenElements
                  el={child.children}
                  type={child.type}
                  depth={depth + 1}
                  styles={styles}
                />,
              });
            }

            return element({ id: child.id, key: `${child.type}-${child.id}-${depth}` });
          }

          return null;
        })
      }
    </SortableGroup>
  );
};

export default ScreenElements = React.memo(ScreenElements);
