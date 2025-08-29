import { put, takeEvery } from "redux-saga/effects"
import { CREATE_LOAN, CREATE_LOAN_RED,DELETE_LOAN, DELETE_LOAN_RED,GET_LOAN,GET_LOAN_RED,UPDATE_LOAN, UPDATE_LOAN_RED, } from "../Constent"
import { createmultipleRecord, createRecord, deleteRecord, getRecord, updatemultipleRecord, updateRecord } from "./Service/Index"


function* createSaga(action) {
    let responce = yield createRecord("loan", action.payload)
    yield put({ type: CREATE_LOAN_RED, payload: responce })

    // let responce = yield createmultipleRecord("loan")
    // yield put({ type: CREATE_LOAN_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield getRecord("loan", action.payload)
    yield put({ type: GET_LOAN_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield updateRecord("loan", action.payload)
    yield put({ type: UPDATE_LOAN_RED, payload: action.payload })

    // let responce = yield updatemultipleRecord("loan", action.payload)
    // yield put({ type: UPDATE_LOAN_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield deleteRecord("loan", action.payload)
    yield put({ type: DELETE_LOAN_RED, payload: action.payload })
}
export default function* loanSagas() {
    yield takeEvery(CREATE_LOAN, createSaga)
    yield takeEvery(GET_LOAN, getSaga)
    yield takeEvery(UPDATE_LOAN, updateSaga)
    yield takeEvery(DELETE_LOAN, deleteSaga)

}
