/*
示例：
const reducer = combineReducers({
  counter: counterReducer,
  home: homeReducer,
  user: userReducer
})

-----combineReducers实现原理(了解)---------------
// combineReducers实际上也是一个reducer----用这个reducer来维护各个reducer的状态
// 以counterReducer为例
// 1. 初始值，state传入空对象，这样state.counter就是undefined，然后执行counterReducer()就会拿到counter的初始值
// 2. 更新state，传入state = preState给counterReducer，执行，counterReducer如果有对应传入的action就返回新值，否则返回的是之前的默认值

function reducer(state = {}, action) {
  // 返回一个对象---作为这个reducer维护的状态, store的state
  return {
    counter: counterReducer(state.counter, action),
    home: homeReducer(state.home, action),
    user: userReducer(state.user, action)
  }
}
-------------------------------------------------
*/
/**
 * @description 合并reducers
 * @param {*} reducerObj 传入需要合并的reducer对象
 * @returns 返回合并后的reducer
 */
const combineReducers = function (reducerObj) {
    let keys = Object.keys(reducerObj)

    function reducer(preState = {}, action) {
        let newState = {}
        keys.forEach(key => {
            newState[key] = reducerObj[key](preState[key], action)
        });
        return newState
    }
    return reducer
}

export default combineReducers