import {
  takeLatest, put, select, call,
} from 'redux-saga/effects';
import * as R from 'ramda';
// import { REHYDRATE } from 'redux-persist';
// import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
// import { delay } from 'redux-saga';

import TYPES from '$redux/constants';
import { IListProject, IProject, IProjectListItem, IProjectScreen } from "$redux/project/reducer";
import {
  setListProjects,
  setListProjectLoader,
  setProject,
  setScreen,
  setProjectLoader,
  setScreenLoader,
} from '$redux/project/actions';


const mockListProject = [{
  id: '299000ff43933',
  status: 'pending',
  name: 'test',
  countScreens: 0,
}];
const mockProject = {
  id: '299000ff43933',
  name: 'test',
  listScreen: [
    { id: 's-1554270037862', name: 'screen - 1' },
    { id: '2', name: 'test screen - 2' },
  ],
};
const mockScreenData = '[{"type":"block","id":3,"children":[{"orientation":"vertical","type":"group","id":6,"children":[{"props":{"width":120,"buoyancy":100,"html_type":"text_title","height":50},"type":"elem","id":7,"children":[]},{"props":{"width":150,"buoyancy":98,"html_type":"text_description","height":40},"type":"elem","id":8,"children":[]}]},{"orientation":"vertical","type":"group","id":7,"children":[{"props":{"width":150,"buoyancy":64,"html_type":"input_firstname","height":80},"type":"elem","id":9,"children":[]},{"props":{"width":150,"buoyancy":61,"html_type":"input_lastname","height":80},"type":"elem","id":10,"children":[]}]},{"orientation":"horizontal","type":"group","id":8,"children":[{"props":{"width":40,"buoyancy":54,"html_type":"select_day","height":20},"type":"elem","id":11,"children":[]},{"props":{"width":40,"buoyancy":54,"html_type":"select_month","height":20},"type":"elem","id":12,"children":[]},{"props":{"width":40,"buoyancy":54,"html_type":"select_year","height":20},"type":"elem","id":13,"children":[]}]},{"orientation":"vertical","type":"group","id":2,"children":[{"props":{"width":150,"buoyancy":10,"html_type":"input_password","height":80},"type":"elem","id":2,"children":[]},{"props":{"width":150,"buoyancy":10,"html_type":"input_password","height":80},"type":"elem","id":3,"children":[]}]},{"orientation":"vertical","type":"group","id":4,"children":[{"props":{"width":150,"buoyancy":1,"html_type":"button_end_composite_scenario","height":80},"type":"elem","id":5,"children":[]}]}]},{"type":"block","id":1,"children":[{"orientation":"vertical","type":"group","id":1,"children":[{"props":{"width":150,"buoyancy":86,"html_type":"input_phone","height":80},"type":"elem","id":0,"children":[]},{"props":{"width":150,"buoyancy":10,"html_type":"input_password","height":80},"type":"elem","id":1,"children":[]}]},{"orientation":"vertical","type":"group","id":3,"children":[{"props":{"width":150,"buoyancy":1,"html_type":"button_end_composite_scenario","height":80},"type":"elem","id":4,"children":[]}]}]},{"type":"block","id":2,"children":[{"orientation":"vertical","type":"group","id":5,"children":[{"props":{"width":100,"buoyancy":2,"html_type":"hyperlink_end simple_scenario","height":80},"type":"elem","id":6,"children":[]}]}]},{"type":"block","id":4,"children":[{"orientation":"vertical","type":"group","id":9,"children":[{"props":{"width":150,"buoyancy":0,"html_type":"button_end simple_scenario","height":80},"type":"elem","id":14,"children":[]}]}]}]';


export const idGenerator = () => (new Date().getTime());

// function* loadInitStart() {}
// function* authCheckSaga() {}
/*
function* openLastPage({ payload }: LocationChangeAction) {
  // if (payload.location.pathname.match('^(\\/project\\/)')) {
  // const id: string = payload.location.pathname.match(/[^\\/]+$/)[0];
}
*/

function* getListProject() {
  yield put(setListProjectLoader(true));
  // TODO: axios yield call(Requester.get, `/listProject`)
  const result: IListProject[] = mockListProject;

  yield put(setListProjects(result));
  yield put(setListProjectLoader(false));
}

function* addProject({ name }) {
  // TODO: axios yield call(Requester.put, `/project/${name}`)
  const result: IListProject = {
    id: `p-${idGenerator()}`,
    status: 'pending',
    name,
    countScreens: 0,
  };

  const { project: { listProject } } = yield select(state => state);

  yield put(setListProjects([...(listProject || mockListProject), result]));
}

function* delProject({ id }) {
// TODO: axios yield call(Requester.delete,`/project/${projectId}`)
  const { project: { listProject } } = yield select(state => state);
  const newListProject: IListProject[] = listProject.filter(project => project.id !== id);

  yield put(setListProjects(newListProject));
}

function* getScreen({ payload }) {
  const { projectId, screenId } = payload;

  if (!projectId || !screenId) {
  // show error
    return;
  }

  yield put(setScreenLoader(true));
  // TODO: axios yield call(Requester.get, `/project/${id)/screen/${screenId}`)

  const { project: { currentProject: { listScreen } } } = yield select(state => state);
  const result: IProjectScreen = {
    id: screenId,
    name: R.prop('name', listScreen.find(p => p.id === screenId)) || 'newScreen',
    screenData: screenId === 's-1554270037862' ? JSON.parse(mockScreenData) : [],
  };

  yield put(setScreenLoader(false));

  if (result) {
    yield put(setScreen(result));
  }
}

function* getProject({ id }) {
  const { project: { listProject, currentProject } } = yield select(state => state);

  if (!currentProject || currentProject.id !== id) {
    yield put(setProjectLoader(true));
    // TODO: axios yield call(Requester.get, `/project/${id)`)
    const result: IProject = mockProject;

    if (result) {
      yield put(setProject(result));
      yield put(setProjectLoader(false));

      const screenId: string = result.listScreen.length && result.listScreen[0].id;

      if (screenId) {
        yield call(getScreen, { payload: { projectId: id, screenId } });
      } else {
        yield put(setScreen(null));
      }
    } else {
      // msg Error
      yield put(setProjectLoader(false));
    }
  }
}

function* addScreen({ payload }) {
  const { projectId, name } = payload;
  // TODO: axios yield call(Requester.put,`/project/${projectId}/screen/${name}`)
  const result: IProjectScreen = {
    id: `s-${idGenerator()}`,
    name,
    screenData: [],
  };

  yield put(setScreen(result));

  const { project: { currentProject } } = yield select(state => state);

  const newProject: IProject = R.assoc(
    'listScreen',
    [...currentProject.listScreen, { id: result.id, name: result.name }],
    currentProject,
  );

  yield put(setProject(newProject));
}

function* delScreen({ payload }) {
  const { projectId, screenId } = payload;
  const { project: { currentProject } } = yield select(state => state);
  // TODO: axios yield call(Requester.delete,`/project/${projectId}/screen/${screenId}`)
  const result: IProject = R.assoc(
    'listScreen',
    currentProject.listScreen.filter(s => s.id !== screenId),
    currentProject,
  );

  yield put(setProject(result));

  const lastScreenId: string = R.prop('id', R.last(result.listScreen));

  yield call(getScreen, { payload: { projectId, screenId: lastScreenId } });
}

/*
function* updateScreenOfProject({ payload }) {
  const { projectId, screenData } = payload;
  const { project: { listProject } } = yield select(state => state);

  const hasIdOfProject = R.propEq('id', projectId);

  const indexProject = R.findIndex(hasIdOfProject, listProject);

  if (indexProject === -1) return;

  const project: IProject = R.find(hasIdOfProject, listProject);
  let updatedScreens: IProjectScreen[] = [];
  const indexScreen = R.findIndex(R.propEq('id', screenData.id))(R.propOr({}, 'screens', project));

  if (indexScreen !== -1) {
    updatedScreens = R.adjust(
      indexScreen,
      screen => ({ ...screen, ...screenData }),
      R.propOr({}, 'screens', project),
    );
  } else {
    updatedScreens = R.append(screenData, project.listScreen);
  }

  const updatedProjects: IProject[] = R.adjust(
    indexProject,
    R.assoc('screens', updatedScreens),
    listProject,
  );

  yield put(setProjects(updatedProjects));
}
*/

function* mySaga() {
  // yield fork(loadInitStart);
  // yield takeLatest(REHYDRATE, authCheckSaga);
  // yield takeLatest(LOCATION_CHANGE, openLastPage);

  yield takeLatest(TYPES.GET_LIST_PROJECT, getListProject);
  yield takeLatest(TYPES.CREATE_PROJECT, addProject);
  yield takeLatest(TYPES.DEL_PROJECT, delProject);

  yield takeLatest(TYPES.GET_PROJECT, getProject);

  yield takeLatest(TYPES.GET_SCREEN, getScreen);
  yield takeLatest(TYPES.DEL_SCREEN, delScreen);
  yield takeLatest(TYPES.ADD_SCREEN, addScreen);
  // yield takeLatest(TYPES.SET_SCREEN_DATA, updateScreenOfProject);
}

export default mySaga;
