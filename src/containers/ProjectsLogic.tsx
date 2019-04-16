import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import * as actions from '$redux/project/actions';
import Projects from '$components/Projects';
import { IListProject } from '$redux/project/reducer';

interface IDashboardProps {
  listProject: IListProject[],
  getListProject: actions.IGetListProject,
  createProject: actions.ICreateProject,
  delProject: actions.IDelProject,
  getProject: actions.IGetProject,
}

const ProjectsLogic: React.FunctionComponent<IDashboardProps> = ({
  listProject,
  getListProject,
  createProject,
  delProject,
  getProject,
}) => (
  <Projects
    listProject={listProject}
    getListProject={getListProject}
    createProject={createProject}
    delProject={delProject}
    getProject={getProject}
  />
);

const mapStateToProps = (state, props) => ({
  listProject: state.project.listProject,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(ProjectsLogic));
