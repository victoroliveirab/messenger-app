import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";

import rootReducer from "./root.reducer";

// This line comes from [https://github.com/zalmoxisus/redux-devtools-extension]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [logger];

//Without composeEnhancers/redux devTools, use this below
//const store = createStore(rootReducer, applyMiddleware(...middlewares));

//With the devtools
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
