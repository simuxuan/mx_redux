import React, { PureComponent } from 'react'
// import { connect } from "react-redux"
import { addNumberAction, subNumberAction } from '../../store/counter'
import { connect } from '../../myRedux/reduxUtills/connect'
import store from '../../store'

export class About extends PureComponent {

  calcNumber(num, isAdd) {
    if (isAdd) {
      this.props.addNumber(num)
    } else {
      this.props.subNumber(num)
    }
  }

  render() {
    const { counter } = this.props

    return (
      <div>
        <h2>About Page: {counter}</h2>
        <div>
          <button onClick={e => this.calcNumber(6, true)}>+6</button>
          <button onClick={e => this.calcNumber(88, true)}>+88</button>
          <button onClick={e => this.calcNumber(6, false)}>-6</button>
          <button onClick={e => this.calcNumber(88, false)}>-88</button>
        </div>
      </div>
    )
  }
}

// connect
// connect()返回值是一个高阶组件
// 参数将state和action函数用props注入组件
const mapStateToProps = (state) => ({
  counter: state.counter.counter
});

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(addNumberAction(num))
  },
  subNumber(num) {
    dispatch(subNumberAction(num))
  }
});


export default connect(mapStateToProps,mapDispatchToProps,store)(About)
