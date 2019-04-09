import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { History } from 'history';

import * as actions from '$redux/project/actions';
import { IProject } from '$redux/project/reducer';
import Project from '$components/Project';

interface IDesignProps {
  match: {
    params: {
      projectId: string
    }
  },
  projects: IProject[],
  history : History,
  dellScreen(projectId: string, screenId: string): void,
  addScreenImg(projectId: string, name: string, fileData: File): void,
  addScreenEmpty(projectId: string, name: string): void,
  getScreenData(projectId: string, screenId: string): void,
}

interface IDesignState {
}

const ProjectLogic: React.FunctionComponent<IDesignProps> = (props) => {
  const {
    projects,
    history,
    dellScreen,
    addScreenEmpty,
    addScreenImg,
    getScreenData,
    match: { params: { projectId } },
  } = props;

  const currentProject = projects.find(project => projectId === project.id) || null;

  if (!currentProject) {
    history.push('/dashboard');
  }

  return (
    <Project
      project={currentProject}
      dellScreen={dellScreen}
      addScreenEmpty={addScreenEmpty}
      addScreenImg={addScreenImg}
      getScreenData={getScreenData}
    />
  );
};

const mapStateToProps = (state, props) => ({
  projects: state.project.projects,
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(ProjectLogic));
