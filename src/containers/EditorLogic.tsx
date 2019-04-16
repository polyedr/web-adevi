import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Editor from '$components/Editor';
import NavPanelScreen from '$components/NavPanelScreen';
import { IProject, IProjectScreen } from '$redux/project/reducer';
import * as actions from '$redux/project/actions';


export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

interface MatchParams {
  projectId: string;
}

interface IEditorProps {
  project: IProject,
  screen: IProjectScreen,
  match: match<MatchParams>,
  getProject: typeof actions.getProject,
  getScreen: typeof actions.getScreen,
  addScreen: typeof actions.addScreen,
  dellScreen: typeof actions.dellScreen,
  setScreenData: typeof actions.setScreenData,
}

const EditorLogic: React.FunctionComponent<IEditorProps> = ({
  match: { params: { projectId } },
  project,
  screen,
  getProject,
  getScreen,
  addScreen,
  dellScreen,
  setScreenData,
}: IEditorProps) => (
  <React.Fragment>
    <NavPanelScreen
      projectId={projectId}
      project={project}
      screen={screen}
      getProject={getProject}
      getScreen={getScreen}
      addScreen={addScreen}
    />
    <Editor
      projectId={projectId}
      screen={screen}
      dellScreen={dellScreen}
      setScreenData={setScreenData}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  project: state.project.currentProject,
  screen: state.project.currentScreen,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getProject: actions.getProject,
  getScreen: actions.getScreen,
  addScreen: actions.addScreen,
  dellScreen: actions.dellScreen,
  setScreenData: actions.setScreenData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditorLogic);
