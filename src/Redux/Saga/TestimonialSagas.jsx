import { put, takeEvery } from "redux-saga/effects"
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED,DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED,GET_TESTIMONIAL,GET_TESTIMONIAL_RED,UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED, } from "../Constent"
import { createmultipleRecord, createRecord, deleteRecord, getRecord, updatemultipleRecord, updateRecord } from "./Service/Index"


function* createSaga(action) {
    let responce = yield createRecord("testimonial", action.payload)
    yield put({ type: CREATE_TESTIMONIAL_RED, payload: responce })

    // let responce = yield createmultipleRecord("testimonial")
    // yield put({ type: CREATE_TESTIMONIAL_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield getRecord("testimonial", action.payload)
    yield put({ type: GET_TESTIMONIAL_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield updateRecord("testimonial", action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })

    // let responce = yield updatemultipleRecord("testimonial", action.payload)
    // yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let responce = yield deleteRecord("testimonial", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}
export default function* testimonialSagas() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)
    yield takeEvery(GET_TESTIMONIAL, getSaga)
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)

}
