"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reduxsauce_1 = require("reduxsauce");
const constants_1 = require("$redux/user/constants");
const someActionHandler = (state) => {
    return Object.assign({}, state);
};
const changeMinLPanel = (state) => {
    return Object.assign({}, state, { minLPanel: !state.minLPanel });
};
const HANDLERS = {
    [constants_1.USER_ACTIONS.SOME_ACTION]: someActionHandler,
    [constants_1.USER_ACTIONS.CHANGE_L_PANEL]: changeMinLPanel,
};
const INITIAL_STATE = {
    // key: val,
    minLPanel: false,
};
exports.default = reduxsauce_1.createReducer(INITIAL_STATE, HANDLERS);
//# sourceMappingURL=reducer.js.map