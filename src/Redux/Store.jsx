import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import Rootreducer from "../Redux/Reducer/Rootreducer"
import Rootsagas from "./Saga/RootSaga";


const Saga = createSagaMiddleware();

const Store = configureStore({
  reducer: Rootreducer,
  middleware: () => [Saga]
})

export default Store
Saga.run(Rootsagas); 