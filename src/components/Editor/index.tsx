import * as React from 'react';
import { Icon } from '$components/utility/Icon';
import { IProjectScreen } from '$redux/project/reducer';
import Button from '$components/utility/Button';

const styles = require('./styles.scss');

interface IEditorProps {
  screenData: IProjectScreen,
}

interface IEditorState {

}

class Editor extends React.Component<IEditorProps, IEditorState> {
  onDragEnter = (e) => {
    console.log(e);
  };

  onDragStart = (e) => {
    console.log(e);
  };

  render() {
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
        <div className={styles.boardWrapper}>
          <div className={styles.board}>
            {Array.from(Array(25)).map((item, idx) => (
              <div
                className={styles.item}
                onDragEnter={this.onDragEnter}
                onDragStart={this.onDragStart}
              >
                {idx}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
