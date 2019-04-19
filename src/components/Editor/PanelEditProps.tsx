import * as React from 'react';
import Button from '$components/UI/Button';
import { Icon } from '$components/UI/Icon';
import { IActiveItem } from '$components/Editor';

const styles = require('./styles.scss');

interface IComponentProps {
  activeItem: IActiveItem,
  disablePanel: boolean,
  addElement: () => void,
  dellElement: () => void,
}

const Component: React.FunctionComponent<IComponentProps> = ({
  activeItem,
  disablePanel,
  addElement,
  dellElement,
}) => {
  return (
    <div className={styles.propsPanel}>
      <div className={styles.grid}>
        Grid
      </div>
      <div>
        <Button
          className={styles.addElement}
          type="none"
          onClick={addElement}
          disabled={disablePanel}
        >
          <Icon icon="addCircle" size={28} />
        </Button>
      </div>
      <div>
        Panel Edit Props
        <div className={styles.activeElement}>
          <p>{`active: ${activeItem.itemId}`}</p>
          { activeItem.parentId !== '-1' && (
            <Button type="none" onClick={dellElement}>
              <Icon icon="delete" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const PanelEditProps = Component;
