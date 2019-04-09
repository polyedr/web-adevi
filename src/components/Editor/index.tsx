import * as React from 'react';
import classNames from 'classnames';

import { IProjectScreen } from '$redux/project/reducer';
import { Icon } from '$components/UI/Icon';
import Button from '$components/UI/Button';
import ScreenElements from '$components/ScreenElements';

const styles = require('./styles.scss');

interface IEditorProps {
  screen: IProjectScreen,
}

interface IEditorState {
  // items: any,
}

class Editor extends React.Component<IEditorProps, IEditorState> {
  sortable = null; // sortable instance

  state = {
    // items: [1, 2, 3, 4, 5, 6, ['Apple', 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry'], 7],
  };

  listItems(items, name) {
    return items.map(val => (
      <div
        key={val}
        data-id={val}
        className={classNames(styles.item, styles[name])}
      >
        {val}
      </div>
    ));
  }

  render() {
    const {
      props: {
        screen,
      },
    } = this;

    return (
      <div className={styles.main}>
        <div className={styles.navBar}>
          <div>
            left navPanel
          </div>
          <div className={styles.navBarTypeScreen}>
            <Button type="none" onClick={console.log}>
              <Icon icon="computer" size={32} />
            </Button>
            <Button type="none" onClick={console.log}>
              <Icon icon="table" />
            </Button>
            <Button type="none" onClick={console.log}>
              <Icon icon="phone" />
            </Button>
          </div>
          <div>
            right navPanel
          </div>
        </div>
        <ScreenElements
          el={screen && JSON.parse(screen.screenData)}
          type="as"
          styles={styles}
        />
      </div>
    );
  }
}

export default Editor;
