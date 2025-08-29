import { put, takeEvery } from "redux-saga/effects"
import { CREATE_PAYMENT, CREATE_PAYMENT_RED,DELETE_PAYMENT, DELETE_PAYMENT_RED,GET_PAYMENT,GET_PAYMENT_RED,UPDATE_PAYMENT, UPDATE_PAYMENT_RED, } from "../Constent"
import { createmultipleRecord, createRecord, deleteRecord, getRecord, updatemultipleRecord, updateRecord } from "./Service/Index"


function* createSaga(action) {
    let responce = yield createRecord("payment", action.payload)
    yield put({ type: CREATE_PAYMENT_RED, payload: responce })

    // let responce = yield createmultipleRecord("payment")
    // yield put({ type: CREATE_PAYMENT_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield getRecord("payment", action.payload)
    yield put({ type: GET_PAYMENT_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield updateRecord("payment", action.payload)
    yield put({ type: UPDATE_PAYMENT_RED, payload: action.payload })

    // let responce = yield updatemultipleRecord("payment", action.payload)
    // yield put({ type: UPDATE_PAYMENT_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield deleteRecord("payment", action.payload)
    yield put({ type: DELETE_PAYMENT_RED, payload: action.payload })
}
export default function* paymentSagas() {
    yield takeEvery(CREATE_PAYMENT, createSaga)
    yield takeEvery(GET_PAYMENT, getSaga)
    yield takeEvery(UPDATE_PAYMENT, updateSaga)
    yield takeEvery(DELETE_PAYMENT, deleteSaga)

}
