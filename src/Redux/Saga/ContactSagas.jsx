import { call, put, takeEvery } from "redux-saga/effects"
import { CREATE_CONTACT, CREATE_CONTACT_RED,DELETE_CONTACT, DELETE_CONTACT_RED,GET_CONTACT,GET_CONTACT_RED,UPDATE_CONTACT, UPDATE_CONTACT_RED, } from "../Constent"
import { createmultipleRecord, createRecord, deleteRecord, getRecord, updatemultipleRecord, updateRecord } from "./Service/Index"


function* createSaga(action) {
    let responce = yield call(createRecord,"contact/create",action.payload)
    yield put({ type: CREATE_CONTACT_RED, payload: responce })

    // let responce = yield createmultipleRecord("contactus")
    // yield put({ type: CREATE_CONTACT_RED, payload: responce })
}

function* getSaga(action) {
    let responce = yield call(getRecord,"contact/get",action.payload)
    yield put({ type: GET_CONTACT_RED, payload: responce })
}
function* updateSaga(action) {
    let responce = yield updateRecord("contactus", action.payload)
    yield put({ type: UPDATE_CONTACT_RED, payload: action.payload })

    // let responce = yield updatemultipleRecord("contactus", action.payload)
    // yield put({ type: UPDATE_CONTACT_RED, payload: action.payload })
}
function* deleteSaga(action) {
    let id = action.payload._id;
    let responce = yield call(deleteRecord,"contact",id)
    yield put({ type: DELETE_CONTACT_RED, payload: action.payload })
}
export default function* contactSagas() {
    yield takeEvery(CREATE_CONTACT, createSaga)
    yield takeEvery(GET_CONTACT, getSaga)
    yield takeEvery(UPDATE_CONTACT, updateSaga)
    yield takeEvery(DELETE_CONTACT, deleteSaga)

}
