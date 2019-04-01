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


export const addScreen = (name, fileData) => ({
  type: TYPES.ADD_SCREEN,
  payload: { name, fileData },
});
