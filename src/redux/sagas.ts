import { takeLatest, put, select, call } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import TYPES from '$redux/constants';
import { setProjects } from '$redux/project/actions';
import { IProject, IProjectScreen } from '$redux/project/reducer';

// const idGenerator = () => (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1);
const idGenerator = () => (new Date().getTime());

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

function* setProjectScreens({ projectId, screenData }) {
  const { project: { projects } } = yield select(state => state);

  const newProjects: IProject = projects.map((project) => {
    if (project.id === projectId) {
      const newScreen:IProjectScreen = {
        ...project.screens.find(screen => screen.id === screenData.id),
        ...screenData,
      };

      const newScreens:IProjectScreen[] = [
        ...project.screens.filter(s => s.id !== screenData.id),
        newScreen,
      ];

      return { ...project, screens: newScreens };
    }

    return project;
  });

  yield put(setProjects(newProjects));
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
    // screenData
  };
  // TODO: API - post screenData
  yield call(setProjectScreens, { projectId, screenData: result });
}

function* addScreenImg({ payload }) {
  const { projectId, name, fileData } = payload;
  // TODO: post screen data
  console.log({ projectId, name, fileData });
}

function* mySaga() {
  yield takeLatest(TYPES.CREATE_PROJECT, createProject);
  yield takeLatest(TYPES.DEL_PROJECT, delProject);

  yield takeLatest(TYPES.DEL_SCREEN, delScreen);
  yield takeLatest(TYPES.ADD_SCREEN_IMG, addScreenImg);
  yield takeLatest(TYPES.ADD_SCREEN_EMPTY, addScreenEmpty);
}

export default mySaga;
