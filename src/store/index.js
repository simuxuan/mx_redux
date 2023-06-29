import { createStore, compose } from "redux"
import thunk from "redux-thunk"
import { logger } from "../myRedux/middleware/utills"
import combineReducers from "../myRedux/reduxUtills/combine.js"
import counterReducer from "./counter"
import applyMiddleware from "../myRedux/middleware"


// import homeReducer from "./home"

const reducer = combineReducers({
    counter: counterReducer,
    // home: homeReducer
})

// redux-devtools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
let store = createStore(reducer)
store = applyMiddleware(store,[logger])

export default store