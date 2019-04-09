import {
  fork, takeLatest, put, select, call,
} from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import * as R from 'ramda';

import TYPES from '$redux/constants';
import { setProjects, setScreenData } from '$redux/project/actions';
import { IProject, IProjectScreen } from '$redux/project/reducer';

const jsonValue = '[{\"type\": \"block\", \"id\": 3, \"children\": [{\"orientation\": \"vertical\", \"type\": \"group\", \"id\": 6, \"children\": [{\"props\": {\"width\": 120, \"buoyancy\": 100, \"html_type\": \"text_title\", \"height\": 50}, \"type\": \"elem\", \"id\": 7, \"children\": []}, {\"props\": {\"width\": 150, \"buoyancy\": 98, \"html_type\": \"text_description\", \"height\": 40}, \"type\": \"elem\", \"id\": 8, \"children\": []}]}, {\"orientation\": \"vertical\", \"type\": \"group\", \"id\": 7, \"children\": [{\"props\": {\"width\": 150, \"buoyancy\": 64, \"html_type\": \"input_firstname\", \"height\": 80}, \"type\": \"elem\", \"id\": 9, \"children\": []}, {\"props\": {\"width\": 150, \"buoyancy\": 61, \"html_type\": \"input_lastname\", \"height\": 80}, \"type\": \"elem\", \"id\": 10, \"children\": []}]}, {\"orientation\": \"horizontal\", \"type\": \"group\", \"id\": 8, \"children\": [{\"props\": {\"width\": 40, \"buoyancy\": 54, \"html_type\": \"select_day\", \"height\": 20}, \"type\": \"elem\", \"id\": 11, \"children\": []}, {\"props\": {\"width\": 40, \"buoyancy\": 54, \"html_type\": \"select_month\", \"height\": 20}, \"type\": \"elem\", \"id\": 12, \"children\": []}, {\"props\": {\"width\": 40, \"buoyancy\": 54, \"html_type\": \"select_year\", \"height\": 20}, \"type\": \"elem\", \"id\": 13, \"children\": []}]}, {\"orientation\": \"vertical\", \"type\": \"group\", \"id\": 2, \"children\": [{\"props\": {\"width\": 150, \"buoyancy\": 10, \"html_type\": \"input_password\", \"height\": 80}, \"type\": \"elem\", \"id\": 2, \"children\": []}, {\"props\": {\"width\": 150, \"buoyancy\": 10, \"html_type\": \"input_password\", \"height\": 80}, \"type\": \"elem\", \"id\": 3, \"children\": []}]}, {\"orientation\": \"vertical\", \"type\": \"group\", \"id\": 4, \"children\": [{\"props\": {\"width\": 150, \"buoyancy\": 1, \"html_type\": \"button_end_composite_scenario\", \"height\": 80}, \"type\": \"elem\", \"id\": 5, \"children\": []}]}]}, {\"type\": \"block\", \"id\": 1, \"children\": [{\"orientation\": \"vertical\", \"type\": \"group\", \"id\": 1, \"children\": [{\"props\": {\"width\": 150, \"buoyancy\": 86, \"html_type\": \"input_phone\", \"height\": 80}, \"type\": \"elem\", \"id\": 0, \"children\": []}, {\"props\": {\"width\": 150, \"buoyancy\": 10, \"html_type\": \"input_password\", \"height\": 80}, \"type\": \"elem\", \"id\": 1, \"children\": []}]}, {\"orientation\": \"vertical\", \"type\": \"group\", \"id\": 3, \"children\": [{\"props\": {\"width\": 150, \"buoyancy\": 1, \"html_type\": \"button_end_composite_scenario\", \"height\": 80}, \"type\": \"elem\", \"id\": 4, \"children\": []}]}]}, {\"type\": \"block\", \"id\": 2, \"children\": [{\"orientation\": \"vertical\", \"type\": \"group\", \"id\": 5, \"children\": [{\"props\": {\"width\": 100, \"buoyancy\": 2, \"html_type\": \"hyperlink_end simple_scenario\", \"height\": 80}, \"type\": \"elem\", \"id\": 6, \"children\": []}]}]}, {\"type\": \"block\", \"id\": 4, \"children\": [{\"orientation\": \"vertical\", \"type\": \"group\", \"id\": 9, \"children\": [{\"props\": {\"width\": 150, \"buoyancy\": 0, \"html_type\": \"button_end simple_scenario\", \"height\": 80}, \"type\": \"elem\", \"id\": 14, \"children\": []}]}]}]';
const idGenerator = () => (new Date().getTime());

function* loadInitStart() {
//  TODO: load api data
}

function* createProject({ payload }) {
  const { name } = payload;
  // TODO: post new project
  const results = {
    id: `p-${idGenerator()}`,
    status: 'pending',
    name,
    countScreens: 0,
    screens: [],
    select: false,
  };

  const { project: { projects } } = yield select(state => state);

  yield put(setProjects([...projects, results]));
}

function* delProject({ payload }) {
  const { id } = payload;
  const { project: { projects } } = yield select(state => state);

  const newProjects = projects.filter(project => project.id !== id);

  yield put(setProjects(newProjects));
}

function* updateScreenOfProject({ payload }) {
  const { projectId, screenData } = payload;
  const { project: { projects } } = yield select(state => state);

  const hasIdOfProject = R.propEq('id', projectId);

  const indexProject = R.findIndex(hasIdOfProject, projects);

  if (indexProject === -1) return;

  const project: IProject = R.find(hasIdOfProject, projects);
  let updatedScreens: IProjectScreen[] = [];
  const indexScreen = R.findIndex(R.propEq('id', screenData.id))(R.propOr({}, 'screens', project));

  if (indexScreen !== -1) {
    updatedScreens = R.adjust(
      indexScreen,
      screen => ({ ...screen, ...screenData }),
      R.propOr({}, 'screens', project),
    );
  } else {
    updatedScreens = R.append(screenData, project.screens);
  }

  const updatedProjects: IProject[] = R.adjust(
    indexProject,
    R.assoc('screens', updatedScreens),
    projects,
  );

  yield put(setProjects(updatedProjects));
}

function* delScreen({ payload }) {
  const { projectId, screenId } = payload;
  const { project: { projects } } = yield select(state => state);

  const newProjects: IProject = projects.map((project) => {
    if (project.id === projectId) {
      const newScreens:IProjectScreen = project.screens.filter(s => s.id !== screenId);
      return { ...project, screens: newScreens };
    }

    return project;
  });

  // TODO: API - del screen
  yield put(setProjects(newProjects));
}

function* addScreenEmpty({ payload }) {
  const { projectId, name } = payload;

  const result = {
    id: `s-${idGenerator()}`,
    name,
    previewUrl: '',
    screenData: null,
  };
  // TODO: API - post screenData
  yield put(setScreenData(projectId, result));
}

function* addScreenImg({ payload }) {
  const { projectId, name, fileData } = payload;
  // TODO: post screen data
  console.log({ projectId, name, fileData });
}

function* getScreenData({ payload }) {
  const { projectId, screenId } = payload;
  // TODO: get screen data
  const result: string = jsonValue;
  yield put(setScreenData(`${projectId}`, { id: screenId, screenData: result }));
}

function* mySaga() {
  yield fork(loadInitStart);

  yield takeLatest(TYPES.CREATE_PROJECT, createProject);
  yield takeLatest(TYPES.DEL_PROJECT, delProject);

  yield takeLatest(TYPES.DEL_SCREEN, delScreen);
  yield takeLatest(TYPES.ADD_SCREEN_IMG, addScreenImg);
  yield takeLatest(TYPES.ADD_SCREEN_EMPTY, addScreenEmpty);

  yield takeLatest(TYPES.GET_SCREEN_DATA, getScreenData);
  yield takeLatest(TYPES.SET_SCREEN_DATA, updateScreenOfProject);
}

export default mySaga;
