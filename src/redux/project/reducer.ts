import { createReducer } from 'reduxsauce';

import * as ACTIONS from '$redux/project/actions';
import TYPES from '$redux/constants';


export interface IProjectScreen {
  id: string,
  name: string,
  screenData: any,
  previewUrl: string,
  imageUrl: string,
}

export interface IProject {
  id: string,
  status: string,
  name: string,
  countScreens: number,
  screens: IProjectScreen[],
  select: boolean,
}

export type IRootState = Readonly<{
    projects: IProject[],
}>;

type UnsafeReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

interface ActionHandler<T> {
    (state: IRootState, payload: UnsafeReturnType<T>): IRootState;
}

const addProject: ActionHandler<typeof ACTIONS.setProjects> = (state, { projects }) => ({
  ...state,
  projects,
});

const HANDLERS = {
  [TYPES.SET_PROJECTS]: addProject,
};

const INITIAL_STATE: IRootState = {
  projects: [{
    id: '299000ff43933',
    status: 'pending',
    name: 'test',
    countScreens: 0,
    screens: [{
      id: 's-1554270037862',
      name: 'asd',
      previewUrl: '',
      imageUrl: '',
      screenData: null,
    }],
    select: false,
  }],
};

export default createReducer(INITIAL_STATE, HANDLERS);
