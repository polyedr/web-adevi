import * as React from 'react';

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
        {screen
          && <ScreenElements
            id="aa"
            items={JSON.parse(screen.screenData)}
            path={[]}
            depth={0}
            type="root"
            styles={styles}
          />
        }
      </div>
    );
  }
}

export default Editor;
