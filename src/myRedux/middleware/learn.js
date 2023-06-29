/**
 * @description 中间件
 * 实际上就是封装dispatch
 */

// 1. 代理模式--每次都需要使用这个函数，而不是调用store.dispatch
function dispatchAndLog(store, action) {
    console.log('dispatching', action);
    store.dispatch(action)
    console.log('next state', store.getState());
}

// 2. monkeypatch--改变原来的方法
const next = store.dispatch  // （1）获取原来方法
// （2）生成新的方法
dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    const result = next(action)
    console.log('next state', store.getState());
    return result
}

// 3. 封装---调用方法生成新dispatch
function patchStoreToAddLogging(store) {
    const next = store.dispatch
    store.dispatch = function (action) {
        console.log('dispatching', action);
        const result = next(action)
        console.log('next state', store.getState());
        return result
    }
}

// 4. 隐藏猴子补丁
function logger(store) {
    const next = store.dispatch

    // store.dispatch = xxx // 隐藏 
    // 返回新的dispatch，在applyMiddleware里去
    return function dispatchAndLog(action) {
        console.log('dispatching', action);
        next(action)
        console.log('next state', store.getState());
        return result
    }
}

function applyMiddlewareByMonkeypatching(store, middlewares) {
    middlewares = middlewares.slice()
    middlewares.reverse()

    // 依次调用每个 middleware 来增强 dispatch，实际上还是猴补丁
    middlewares.forEach(middleware => (store.dispatch = middleware(store)))
}

applyMiddlewareByMonkeypatching(store, [logger])

// 5. 移除猴子补丁
// Middlewares 来接受 next() 调度函数作为参数，而不是从 store 实例中读取它。
function logger(store) {
    return function wrapDispatchToAddLogging(next) {
        return function dispatchAndLog(action) {
            console.log('dispatching', action)
            let result = next(action)
            console.log('next state', store.getState())
            return result
        }
    }
}

// 等价于---这就是我们改写的中间件的样子(柯里化)
// 调用 logger(store)(dispatch)(action),logger(store)(dispatch)返回新的dispatch
const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

// 实现applyMiddleware
function applyMiddleware(store, middlewares) {
    middlewares = middlewares.slice()
    middlewares.reverse()
    let dispatch = store.dispatch
    middlewares.forEach(middleware => (dispatch = middleware(store)(dispatch)))
   
    return Object.assign({}, store, { dispatch }) // 返回一个store对象
}