import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import logger from "redux-logger";

import rootReducer from "./root.reducer";

export const history = createBrowserHistory();

// This line comes from [https://github.com/zalmoxisus/redux-devtools-extension]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [logger];

//Without composeEnhancers/redux devTools, use this below
//const store = createStore(rootReducer, applyMiddleware(...middlewares));

//With the devtools
const store = createStore(
    rootReducer(history),
    composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
