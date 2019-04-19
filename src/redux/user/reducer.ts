import { createReducer } from 'reduxsauce';

import * as ACTIONS from '$redux/user/actions';
import TYPES from '$redux/constants';

export type IRootState = Readonly<{
    minLPanel: boolean,
}>;

type UnsafeReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

interface ActionHandler<T> {
    (state: IRootState, payload: UnsafeReturnType<T>): IRootState;
}

const changeMinLPanel: ActionHandler<typeof ACTIONS.changeMinLPanel> = state => ({
  ...state,
  minLPanel: !state.minLPanel,
});

const HANDLERS = {
  [TYPES.CHANGE_L_PANEL]: changeMinLPanel,
};

const INITIAL_STATE: IRootState = {
  minLPanel: false,
};

export default createReducer(INITIAL_STATE, HANDLERS);
