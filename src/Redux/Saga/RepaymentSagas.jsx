import { put, takeEvery } from "redux-saga/effects"
import { CREATE_REPAYMENT, CREATE_REPAYMENT_RED,DELETE_REPAYMENT, DELETE_REPAYMENT_RED,GET_REPAYMENT,GET_REPAYMENT_RED,UPDATE_REPAYMENT, UPDATE_REPAYMENT_RED, } from "../Constent"
import { createmultipleRecord, createRecord, deleteRecord, getRecord, updatemultipleRecord, updateRecord } from "./Service/Index"


function* createSaga(action) {
    let responce = yield createRecord("payment", action.payload)
    yield put({ type: CREATE_REPAYMENT_RED, payload: responce })

    // let responce = yield createmultipleRecord("payment")
    // yield put({ type: CREATE_REPAYMENT_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield getRecord("payment", action.payload)
    yield put({ type: GET_REPAYMENT_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield updateRecord("payment", action.payload)
    yield put({ type: UPDATE_REPAYMENT_RED, payload: action.payload })

    // let responce = yield updatemultipleRecord("payment", action.payload)
    // yield put({ type: UPDATE_REPAYMENT_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield deleteRecord("payment", action.payload)
    yield put({ type: DELETE_REPAYMENT_RED, payload: action.payload })
}
export default function* paymentSagas() {
    yield takeEvery(CREATE_REPAYMENT, createSaga)
    yield takeEvery(GET_REPAYMENT, getSaga)
    yield takeEvery(UPDATE_REPAYMENT, updateSaga)
    yield takeEvery(DELETE_REPAYMENT, deleteSaga)

}
