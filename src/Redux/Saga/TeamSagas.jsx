import { call, put, takeEvery } from "redux-saga/effects"
import { CREATE_TEAM, CREATE_TEAM_RED, DELETE_TEAM, DELETE_TEAM_RED, GET_TEAM, GET_TEAM_RED, UPDATE_TEAM, UPDATE_TEAM_RED, } from "../Constent"
import { createmultipleRecord, createRecord, deleteRecord, getRecord, updatemultipleRecord, updateRecord } from "./Service/Index"


function* createSaga(action) {
    let responce = yield call(createRecord, "team/create", action.payload);
    yield put({ type: CREATE_TEAM_RED, payload: responce })

    // let responce = yield createmultipleRecord("team")
    // yield put({ type: CREATE_TEAM_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield call(getRecord, "team/get", action.payload)
    yield put({ type: GET_TEAM_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield call(updateRecord, "team", action.payload,)
    yield put({ type: UPDATE_TEAM_RED, payload: responce })

    // let responce = yield updatemultipleRecord("team", action.payload)
    // yield put({ type: UPDATE_TEAM_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield call(deleteRecord, "team", action.payload._id);
    yield put({ type: DELETE_TEAM_RED, payload: action.payload })
}
export default function* teamSagas() {
    yield takeEvery(CREATE_TEAM, createSaga)
    yield takeEvery(GET_TEAM, getSaga)
    yield takeEvery(UPDATE_TEAM, updateSaga)
    yield takeEvery(DELETE_TEAM, deleteSaga)

}
