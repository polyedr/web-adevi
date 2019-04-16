import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { IMAGES } from '$constants/images';
import { Icon } from '$components/UI/Icon';

const styles = require('./styles.scss');

interface ILeftPanel {
  username: string,
  userType: string,
  minLPanel: boolean,
}

const LeftPanel: React.FunctionComponent<ILeftPanel> = (props) => {
  const { username, userType, minLPanel } = props;
  return (
    <aside className={`${styles.main} ${minLPanel && styles.minPanel}`}>
      {minLPanel
        ? (
          <div className={styles.logo}>
            <img src={IMAGES.logo} alt="logo" />
          </div>
        )
        : (
          <div className={styles.prof}>
            <img src={IMAGES.prof} alt="prof" />
            <div className={styles.username}>
              <span>{username}</span>
              <span>{userType}</span>
            </div>
          </div>
        )
      }
      <div className={styles.navigating}>
        <NavLink exact to="/projects" activeClassName="active">
          <Icon icon="dashboard" />
          <span>My Projects</span>
        </NavLink>
        <NavLink to="/library" activeClassName="active">
          <i className="material-icons">drag_indicator</i>
          <span>Storage Library</span>
        </NavLink>
        <NavLink to="/payments" activeClassName="active">
          <i className="material-icons">payment</i>
          <span>Payment Package</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default LeftPanel;
