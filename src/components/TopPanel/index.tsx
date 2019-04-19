import * as React from 'react';

const styles = require('./styles.scss');

interface IProps {
    onMinimiserLPanel(): void
}

interface IState {
    search: string
}

class TopPanel extends React.Component<IProps, IState> {
    state = {
      search: '',
    };

    handleChange = (e) => {
      this.setState({ search: e.target.value });
    };

    render() {
      const {
        state: { search },
        props: { onMinimiserLPanel },
      } = this;

      return (
        <header className={styles.main}>
          <div
            className={styles.btn_minLPanel}
            onClick={onMinimiserLPanel}
          >
            <i className="material-icons">menu</i>
          </div>
          <input
            type="text"
            value={search}
            onChange={this.handleChange}
            placeholder="Search..."
          />
        </header>
      );
    }
}

export default TopPanel;
