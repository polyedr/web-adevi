import TYPES from '$redux/constants';
import {
  IListProject,
  IProject,
  IProjectScreen,
} from '$redux/project/reducer';
import { IListSortable, ISortableItem } from '$utils/parseListItems';


export type TGetListProject = () => void;
export type TGetProject = (id: string) => void;
export type TCreateProject = (name: string) => void;
export type TDelProject = (id: string) => void;
export type TGetScreen = (projectId: string, screenId: string) => void;
export type TAddScreen = (projectId: string, name: string) => void;
export type TDelScreen = (projectId: string, screenId: string) => void;
export type TSetListSortable = (listSortable: IListSortable) => void;
export type TSetScreen = (screen: IProjectScreen) => ({ type: string, screen: IProjectScreen });
export type TSetLoader = (active: boolean) => ({ type: string, active: boolean });
export type TAddElement = (parentId: string, item: ISortableItem) => void;
// export type ISetScreenData = (screenData: ) => void;


export const getListProject: TGetListProject = () => ({
  type: TYPES.GET_LIST_PROJECT,
});

export const setListProjects = (listProject: IListProject[]) => ({
  type: TYPES.SET_LIST_PROJECT,
  listProject,
});


export const createProject: TCreateProject = name => ({
  type: TYPES.CREATE_PROJECT,
  name,
});

export const delProject: TDelProject = id => ({
  type: TYPES.DEL_PROJECT,
  id,
});

export const getProject: TGetProject = id => ({
  type: TYPES.GET_PROJECT,
  id,
});

export const setProject = (project: IProject) => ({
  type: TYPES.SET_PROJECT,
  project,
});

export const setListProjectLoader: TSetLoader = active => ({
  type: TYPES.SET_LIST_PROJECT_LOADER,
  active,
});

export const setProjectLoader: TSetLoader = active => ({
  type: TYPES.SET_PROJECT_LOADER,
  active,
});

export const setScreenLoader: TSetLoader = active => ({
  type: TYPES.SET_SCREEN_LOADER,
  active,
});

export const dellScreen: TDelScreen = (projectId, screenId) => ({
  type: TYPES.DEL_SCREEN,
  payload: { projectId, screenId },
});

export const addScreen: TAddScreen = (projectId, name) => ({
  type: TYPES.ADD_SCREEN,
  payload: { projectId, name },
});

export const getScreen: TGetScreen = (projectId, screenId) => ({
  type: TYPES.GET_SCREEN,
  payload: { projectId, screenId },
});

export const setListSortable: TSetListSortable = itemSortable => ({
  type: TYPES.SET_LIST_SORTABLE,
  itemSortable,
});

export const setScreen: TSetScreen = screen => ({
  type: TYPES.SET_SCREEN,
  screen,
});

export const addElement: TAddElement = (parentId, item) => ({
  type: TYPES.ADD_ELEMENT,
  payload: { parentId, item },
});

// export const setScreenData: ISetScreenData = screenData => ({
//   type: TYPES.SET_SCREEN_DATA,
//   screenData,
// });
