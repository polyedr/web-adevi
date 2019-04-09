import TYPES from '$redux/constants';

export const createProject = name => ({
  type: TYPES.CREATE_PROJECT,
  payload: { name },
});

export const delProject = id => ({
  type: TYPES.DEL_PROJECT,
  payload: { id },
});

export const setProjects = projects => ({
  type: TYPES.SET_PROJECTS,
  projects,
});

export const dellScreen = (projectId, screenId) => ({
  type: TYPES.DEL_SCREEN,
  payload: { projectId, screenId },
});

export const addScreenImg = (projectId, name, fileData) => ({
  type: TYPES.ADD_SCREEN_IMG,
  payload: { name, fileData },
});

export const addScreenEmpty = (projectId, name) => ({
  type: TYPES.ADD_SCREEN_EMPTY,
  payload: { projectId, name },
});

export const getScreenData = (projectId, screenId) => ({
  type: TYPES.GET_SCREEN_DATA,
  payload: { projectId, screenId },
});

export const setScreenData = (projectId, screenData) => ({
  type: TYPES.SET_SCREEN_DATA,
  payload: { projectId, screenData },
});
