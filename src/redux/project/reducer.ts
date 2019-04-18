import { createReducer } from 'reduxsauce';

import * as ACTIONS from '$redux/project/actions';
import TYPES from '$redux/constants';
import { IListSortable } from '$utils/parseListItems';


export interface IListProject {
  id: string,
  status: string,
  name: string,
  countScreens: number,
}

export interface IListScreen {
  id: number,
  type: string,
  children: IListScreen[],
}

export interface IProjectScreen {
  id: string,
  name: string,
  screenData: IListScreen[],
  listSortable?: IListSortable
  screenLoader?: boolean,
}

export interface IProjectListItem {
  id: string,
  name: string,
}

export interface IProject {
  id: string,
  name: string,
  listScreen: IProjectListItem[],
  projectLoader?: boolean,
}

export type IRootState = Readonly<{
  listProject: IListProject[],
  currentProject: IProject,
  currentScreen: IProjectScreen,
  listProjectLoader: boolean,
}>;

type UnsafeReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

interface ActionHandler<T> {
    (state: IRootState, payload: UnsafeReturnType<T>): IRootState;
}

const setListProject: ActionHandler<typeof ACTIONS.setListProjects> = (state, { listProject }) => ({
  ...state,
  listProject,
});

const setProject: ActionHandler<typeof ACTIONS.setProject> = (state, { project }) => ({
  ...state,
  currentProject: project,
});

const setLoaderListProject: ActionHandler<boolean> = (state, { active }) => ({
  ...state,
  listProjectLoader: active,
});

const setScreen: ActionHandler<typeof ACTIONS.setScreen> = (state, { screen }) => ({
  ...state,
  currentScreen: screen,
});

const setProjectLoader: ActionHandler<typeof ACTIONS.setProjectLoader> = (state, { active }) => ({
  ...state,
  currentProject: { ...state.currentProject, projectLoader: active },
});

const setScreenLoader: ActionHandler<typeof ACTIONS.setProjectLoader> = (state, { active }) => ({
  ...state,
  currentScreen: { ...state.currentScreen, screenLoader: active },
});

const HANDLERS = {
  [TYPES.SET_LIST_PROJECT]: setListProject,
  [TYPES.SET_LIST_PROJECT_LOADER]: setLoaderListProject,
  [TYPES.SET_PROJECT]: setProject,
  [TYPES.SET_SCREEN]: setScreen,
  [TYPES.SET_PROJECT_LOADER]: setProjectLoader,
  [TYPES.SET_SCREEN_LOADER]: setScreenLoader,
};

const INITIAL_STATE: IRootState = {
  listProject: null,
  currentProject: null,
  currentScreen: null,
  listProjectLoader: false,
};

export default createReducer(INITIAL_STATE, HANDLERS);
