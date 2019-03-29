"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Worker Saga for SET_EDITOR_LOCATION_INPUT reducer
/*
function* fetchSuggestions({ payload }) {
  const { value } = payload;

  yield delay(300);
  try {
    const results = yield call(someFunction, arguments);
    yield put({ type: TYPES.ANOTHER_ACTION, payload: { results } });
  } catch (e) {
    yield put({ type: TYPES.ANOTHER_ACTION, payload: { results } });
  }
}
*/
function* mySaga() {
    // fetch autocompletion on location input
    //yield takeLatest(TYPES.ACTION, function);
}
exports.default = mySaga;
//# sourceMappingURL=sagas.js.map