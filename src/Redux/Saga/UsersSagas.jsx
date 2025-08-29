import { put, takeEvery } from "redux-saga/effects"
import { CREATE_USERS, CREATE_USERS_RED,DELETE_USERS, DELETE_USERS_RED,GET_USERS,GET_USERS_RED,UPDATE_USERS, UPDATE_USERS_RED, } from "../Constent"
import { createmultipleRecord, createRecord, deleteRecord, getRecord, updatemultipleRecord, updateRecord } from "./Service/Index"


function* createSaga(action) {
    let responce = yield createRecord("users", action.payload)
    yield put({ type: CREATE_USERS_RED, payload: responce })

    // let responce = yield createmultipleRecord("users")
    // yield put({ type: CREATE_USERS_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield getRecord("users", action.payload)
    yield put({ type: GET_USERS_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield updateRecord("users", action.payload)
    yield put({ type: UPDATE_USERS_RED, payload: action.payload })

    // let responce = yield updatemultipleRecord("users", action.payload)
    // yield put({ type: UPDATE_USERS_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield deleteRecord("users", action.payload)
    yield put({ type: DELETE_USERS_RED, payload: action.payload })
}
export default function* usersSagas() {
    yield takeEvery(CREATE_USERS, createSaga)
    yield takeEvery(GET_USERS, getSaga)
    yield takeEvery(UPDATE_USERS, updateSaga)
    yield takeEvery(DELETE_USERS, deleteSaga)

}
