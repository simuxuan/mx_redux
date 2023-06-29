/**
 * @description 打印每个dispatch的action调用后状态日志
 */
export const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

/**
 * 一个定时器，使用 { meta: { delay: N } } 令 action 延迟 N 毫秒后调用。
 * 让 `dispatch` 返回一个取消定时器的函数。
 */
export const timeoutScheduler = store => next => action => {
    if (!action.meta || !action.meta.delay) {
        return next(action)
    }

    const timeoutId = setTimeout(() => next(action), action.meta.delay)

    return function cancel() {
        clearTimeout(timeoutId)
    }
}

/**
 * 在rAF里不断执行
 * 另一个定时器，使用 { meta: { raf: true } } 让 action 在 rAF 循环内调用。
 * 让 `dispatch` 返回一个删除 action 的函数
 */
export const rafScheduler = store => next => {
    const queuedActions = []
    let frame = null

    function loop() {
        frame = null
        try {
            // 不断执行
            if (queuedActions.length) {
                next(queuedActions.shift())
            }
        } finally {
            maybeRaf()  // 循环执行
        }
    }

    function maybeRaf() {
        if (queuedActions.length && !frame) {
            frame = requestAnimationFrame(loop) // raf 
        }
    }

    return action => {
        if (!action.meta || !action.meta.raf) {
            return next(action)
        }

        queuedActions.push(action)
        maybeRaf()

        return function cancel() {
            queuedActions = queuedActions.filter(a => a !== action)
        }
    }
}

/**
 * 让你可以直接 dispatch promise 作为 action。
 * 如果 promise 执行成功，它的结果将作为一个 action 发送。
 * `dispatch` 返回的也是 promise，这样如果出错也能处理。
 */
export const vanillaPromise = store => next => action => {
    if (typeof action.then !== 'function') {
        return next(action)
    }
    // 经典写法：类似promise.reject
    // Promise.resolve(原本要处理的参数).then(原本的函数) --- 让原本的函数返回一个promise
    return Promise.resolve(action).then(store.dispatch) // 相当于将action传给了store.dispatch
}

/**
 * 让你 dispatch 函数而不是 action 对象。
 * 此函数将接收 `dispatch` 和 `getState` 作为参数。
 *
 * 用于提前退出（使用 `getState()` 的条件判断），以及
 * 用于异步控制流（它可以 `dispatch()` 别的东西）。
 *
 * `dispatch` 将返回被调度函数的返回值。
 */
export const thunk = store => next => action =>
    typeof action === 'function'
        ? action(store.dispatch, store.getState)  // action是函数，直接执行，并把dispath和getState传进去
        : next(action)