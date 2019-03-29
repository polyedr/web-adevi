import {createReducer} from 'reduxsauce';
import * as ACTIONS from "$redux/user/actions";
import {USER_ACTIONS} from "$redux/user/constants";

export type IRootState = Readonly<{
    // key: string
    minLPanel: boolean,
}>;

type UnsafeReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

interface ActionHandler<T> {
    (state: IRootState, payload: UnsafeReturnType<T>): IRootState;
}

const someActionHandler: ActionHandler<typeof ACTIONS.someAction> = (state) => {
    return {...state};
};

const changeMinLPanel: ActionHandler<typeof ACTIONS.changeMinLPanel> = (state) => {
    return {
      ...state,
      minLPanel: !state.minLPanel,
    };
};

const HANDLERS = {
    [USER_ACTIONS.SOME_ACTION]: someActionHandler,
    [USER_ACTIONS.CHANGE_L_PANEL]: changeMinLPanel,
};

const INITIAL_STATE: IRootState = {
    // key: val,
    minLPanel: false,
};

export default createReducer(INITIAL_STATE, HANDLERS);
