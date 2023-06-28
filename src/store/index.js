import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import combineReducers from "../myRedux/reduxUtills/combine.js"
import counterReducer from "./counter"
// import homeReducer from "./home"

const reducer = combineReducers({
    counter: counterReducer,
    // home: homeReducer
})

// redux-devtools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
const store = createStore(reducer)

export default store