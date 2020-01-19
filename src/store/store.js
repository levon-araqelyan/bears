import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import middleware from "./middlewares/middleware";
import reducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(middleware);

export default store;
