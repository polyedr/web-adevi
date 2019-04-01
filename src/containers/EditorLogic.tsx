import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { History } from 'history';

import * as actions from '$redux/project/actions';
import Editor from '$components/Editor';
import { IProject } from "$constants/interface";

interface IDesignProps {
  match: {
    params: {
      projectId: string
    }
  },
  projects: IProject[],
  history : History,
  addScreen(name: string, fileData: File): void,
}

interface IDesignState {
}

const EditorLogic: React.FunctionComponent<IDesignProps> = (props) => {

  const {
    projects, history, addScreen, match: { params: { projectId } },
  } = props;

  const currentProject = projects.find(project => projectId === `:${project.id}`) || null;

  if (!currentProject) {
    history.push('/dashboard');
  }

  return (
    <Editor
      project={currentProject}
      addScreen={addScreen}
    />
  );
};

const mapStateToProps = (state, props) => ({
  projects: state.project.projects,
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(EditorLogic));
