import TYPES from '$redux/constants';
import {
  IListProject,
  IProject,
  IProjectScreen,
} from '$redux/project/reducer';


export type IGetListProject = () => void;
export type IGetProject = (id: string) => void;
export type ICreateProject = (name: string) => void;
export type IDelProject = (id: string) => void;
export type IGetScreen = (projectId: string, screenId: string) => void;
export type IAddScreen = (projectId: string, name: string) => void;
export type IDelScreen = (projectId: string, screenId: string) => void;
export type ISetScreenData = (screenData: IProjectScreen) => void;
export type ISetLoader = (active: boolean) => ({ type: string, active: boolean });


export const getListProject: IGetListProject = () => ({
  type: TYPES.GET_LIST_PROJECT,
});

export const setListProjects = (listProject: IListProject[]) => ({
  type: TYPES.SET_LIST_PROJECT,
  listProject,
});


export const createProject: ICreateProject = name => ({
  type: TYPES.CREATE_PROJECT,
  name,
});

export const delProject: IDelProject = id => ({
  type: TYPES.DEL_PROJECT,
  id,
});

export const getProject: IGetProject = id => ({
  type: TYPES.GET_PROJECT,
  id,
});

export const setProject = (project: IProject) => ({
  type: TYPES.SET_PROJECT,
  project,
});

export const setListProjectLoader: ISetLoader = active => ({
  type: TYPES.SET_LIST_PROJECT_LOADER,
  active,
});

export const setProjectLoader: ISetLoader = active => ({
  type: TYPES.SET_PROJECT_LOADER,
  active,
});

export const setScreenLoader: ISetLoader = active => ({
  type: TYPES.SET_SCREEN_LOADER,
  active,
});

export const dellScreen: IDelScreen = (projectId, screenId) => ({
  type: TYPES.DEL_SCREEN,
  payload: { projectId, screenId },
});

export const addScreen: IAddScreen = (projectId, name) => ({
  type: TYPES.ADD_SCREEN,
  payload: { projectId, name },
});

export const getScreen: IGetScreen = (projectId, screenId) => ({
  type: TYPES.GET_SCREEN,
  payload: { projectId, screenId },
});

export const setScreenData: ISetScreenData = screenData => ({
  type: TYPES.SET_SCREEN_DATA,
  payload: { screenData },
});

export const setScreen = (screen: IProjectScreen) => ({
  type: TYPES.SET_SCREEN,
  screen,
});
