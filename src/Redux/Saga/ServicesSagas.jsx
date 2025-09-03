import { call, put, takeEvery } from "redux-saga/effects"
import { CREATE_SERVICES, CREATE_SERVICES_RED, DELETE_SERVICES, UPDATE_SERVICES, DELETE_SERVICES_RED, UPDATE_SERVICES_RED, GET_SERVICES_RED, GET_SERVICES, } from "../Constent"
import { createmultipleRecord, createRecord, deleteRecord, getRecord, updatemultipleRecord, updateRecord } from "./Service/Index"


function* createSaga(action) {
    let responce = yield call(createRecord, "service/create", action.payload);
    yield put({ type: CREATE_SERVICES_RED, payload: responce })

    // let responce = yield createmultipleRecord("service")
    // yield put({ type: CREATE_SERVICES_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield call(getRecord, "service/get", action.payload)
    yield put({ type: GET_SERVICES_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield call(updateRecord,"service",action.payload);
    yield put({ type: UPDATE_SERVICES_RED, payload: responce })

    // let responce = yield updatemultipleRecord("service", action.payload)
    // yield put({ type: UPDATE_SERVICES_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield deleteRecord("service", action.payload)
    yield put({ type: DELETE_SERVICES_RED, payload: action.payload })
}
export default function* serviceSagas() {
    yield takeEvery(CREATE_SERVICES, createSaga)
    yield takeEvery(GET_SERVICES, getSaga)
    yield takeEvery(UPDATE_SERVICES, updateSaga)
    yield takeEvery(DELETE_SERVICES, deleteSaga)

}
