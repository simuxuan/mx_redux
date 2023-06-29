// 引入模块文件
// const utills = require('./utills');

/**
 * 实现applyMiddleware
 * @param {redux的store} store 
 * @param {中间件数组} middlewares 
 * @returns 新的store
 */
// 并 *不是* Redux API 真实的实现方法。
export default function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()
  let dispatch = store.dispatch
  middlewares.forEach(middleware => (dispatch = middleware(store)(dispatch)))
  return Object.assign({}, store, { dispatch })
}

// export {
//     logger
// }


// 统一导出方法
// module.exports = {
//   ...utills,
//   applyMiddleware
// };