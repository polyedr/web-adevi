import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import classNames from 'classnames';

import { history } from '$redux/store';
import * as actions from '$redux/user/actions';
import LeftPanel from '$components/LeftPanel';
import TopPanel from '$components/TopPanel';
import DashboardLogic from '$containers/DashboardLogic';
import Design from '$containers/ProjectLogic';

const styles = require('$styles/global.scss');

interface IAppProps {
  minLPanel: boolean,

  changeMinLPanel(): void,
}

interface IAppState {
}

class Component extends React.Component<IAppProps, IAppState> {
  state = {};

  onMinimiserLPanel = () => {
    const { changeMinLPanel } = this.props;
    changeMinLPanel();
  };

  render() {
    const { minLPanel } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div className={styles.app}>
          <LeftPanel
            username="Test"
            userType="Web Developer"
            minLPanel={minLPanel}
          />
          <div className={classNames(styles.container, minLPanel && styles.minimiser)}>
            <TopPanel
              onMinimiserLPanel={this.onMinimiserLPanel}
            />
            <Switch>
              <Route
                path="/dashboard"
                component={DashboardLogic}
              />
              <Route
                path="/design/:projectId"
                component={Design}
              />
              <Redirect from="/*" to="/dashboard" />
            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state, props) => ({
  minLPanel: state.user.minLPanel,
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(Component));
