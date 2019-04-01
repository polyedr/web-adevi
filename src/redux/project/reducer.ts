import { createReducer } from 'reduxsauce';

import * as ACTIONS from '$redux/project/actions';
import TYPES from '$redux/constants';
import { IProject } from '$constants/interface';

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
    id: '2990.00ff43933',
    status: 'pending',
    name: 'test',
    countScreens: 0,
    projectScreens: [],
    select: false,
  }],
};

export default createReducer(INITIAL_STATE, HANDLERS);
