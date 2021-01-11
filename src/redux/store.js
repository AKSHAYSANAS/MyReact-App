import { createStore, combineReducers, applyMiddleware } from 'redux';
import loginReducer from "./reducers/reducer";
import logger from "redux-logger"
const store = createStore(loginReducer, applyMiddleware(logger))

export default store