// ./src/store/index.js
import { legacy_createStore as createStore } from "redux";
import { combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import produceReducer from "./donation";

// ...
const rootReducer = combineReducers({
 donation: produceReducer,
});

// ...
let enhancer;

if (process.env.NODE_ENV !== "production") {
 const logger = require("redux-logger").default;
 //The logger variable is set to the default export of the imported redux-logger package using require instead of ES6 module imports. Why? ES6 module imports must be defined at the very top of the file in the outermost scope and will be loaded in all node environments. However, redux-logger is a development dependency and cannot be loaded in production. Loading it with require is needed if you only want it in a certain node environment.
 const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 enhancer = composeEnhancers(applyMiddleware(thunk, logger));
 //The composeEnhancers variable is set to the Redux dev tools extension's store enhancer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ or the compose function from redux if the extension fails to load or if you don't have the extension installed in your browser.
} else {
 enhancer = applyMiddleware(thunk);
}

// ./src/store/index.js
// ...
const configureStore = (preloadedState) => {
 return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
