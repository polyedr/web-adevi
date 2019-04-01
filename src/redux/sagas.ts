import { takeLatest, put, select } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import TYPES from '$redux/constants';
import { setProjects } from '$redux/project/actions';

const idGenerator = () => (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1);

function* createProject({ payload }) {
  const { name } = payload;
  // TODO: post new project
  const results = {
    id: idGenerator(),
    status: 'pending',
    name,
    countScreens: 0,
    projectScreens: [],
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

function* addScreen({ payload }) {
  const { name, fileData } = payload;
  // TODO: post screen data
  console.log({ name, fileData });
}


function* mySaga() {
  yield takeLatest(TYPES.CREATE_PROJECT, createProject);
  yield takeLatest(TYPES.DEL_PROJECT, delProject);
  yield takeLatest(TYPES.ADD_SCREEN, addScreen);
}

export default mySaga;
