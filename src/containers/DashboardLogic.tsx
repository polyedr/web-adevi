import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import * as actions from '$redux/project/actions';
import Dashboard from '$components/Dashboard';
import { IProject } from '$constants/interface';

interface IDashboardProps {
  projects: IProject[],
  createProject(name: string): void,
  delProject(id: string): void,
}

const DashboardLogic: React.FunctionComponent<IDashboardProps> = (props) => {
  const { projects, createProject, delProject } = props;
  return (
    <Dashboard
      projects={projects}
      createProject={createProject}
      delProject={delProject}
    />
  );
};

const mapStateToProps = (state, props) => ({
  projects: state.project.projects,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(DashboardLogic));
