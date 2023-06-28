import React, { PureComponent } from 'react'
import { connect } from "react-redux"

import axios from "axios"
import { changeBannersAction, changeRecommendsAction } from '../../store/home/action'

export class Category extends PureComponent {

  componentDidMount() {
    // 请求数据的操作不妨到redux里处理
    axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      this.props.changeBanners(banners)
      this.props.changeRecommends(recommends)
    })
  }

  render() {
    return (
      <div>
        <h2>Category Page: {this.props.counter}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch) => ({
  changeBanners(banners) {
    dispatch(changeBannersAction(banners))
  },
  changeRecommends(recommends) {
    dispatch(changeRecommendsAction(recommends))
  }
})

export default connect(mapStateToProps, mapDispatchToProps )(Category)