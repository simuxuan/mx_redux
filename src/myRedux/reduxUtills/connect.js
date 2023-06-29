/**
 * @description connect
 * @param 
 */

/*
const mapStateToProps = (state) => ({
  counter: state.counter.counter,
})

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(addNumberAction(num))
  }
})
*/
import { PureComponent } from "react";
// import { StoreContext } from "./StoreContext";
// import store from "../store" // 用context把store解耦出去

/**
 * 
 * @param {*} mapStateToProps 映射函数state-->props，返回对象
 * @param {*} mapDispatchToProps 映射函数dispatch-->props，返回对象
 * @param {*} store redux-store
 * @returns 
 */
export function connect(mapStateToProps, mapDispatchToProps, store) {
  // 高阶组件: 函数 HOC
  return function(WrapperComponent) {
    class NewComponent extends PureComponent {
      constructor(props) {
        super(props)
        // 1 获取初始的store里的数据 例如counter  用于给setState做对比
        this.state = mapStateToProps(store.getState()) 
      }
      // 监听store数据的改变，改变了重新执行render
      // context通过provider传递来store---- this.context == store
      componentDidMount() {
        // 实现redux数据更新就重新渲染组件
        this.unsubscribe = store.subscribe(() => {
          // this.forceUpdate()  // 强制刷新，所有数据都会刷新，性能不好
          // 2 再次获取store里的数据，与1之前的store数据比较（PureComponent），不一样就会刷新
          this.setState(mapStateToProps(store.getState()))
        })
      }

      componentWillUnmount() {
        this.unsubscribe() // 取消监听
      }

      render() {
        // 将从store里获取的state和dispatch用props传递给使用的组件
        const stateObj = mapStateToProps(store.getState())
        const dispatchObj = mapDispatchToProps(store.dispatch)
        return <WrapperComponent {...this.props} {...stateObj} {...dispatchObj}/>
      }
    }

    return NewComponent
  }
}
