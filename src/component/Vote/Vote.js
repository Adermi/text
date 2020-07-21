import React from 'react';
import Head from './VoteHead'
import Body from './VoteBody'
import Foot from './VoteFoot'
import propTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'

export default class Panel extends React.Component {
  /**
   *  使用上下文：
   *    在父组件中：
   *      1. 设置子组件上下文属性值的类型
   *          static childContextTypes = {}
   *      2. 获取子组件的上下文（设置子组件的上下文属性信息）
   */

  // 1. 申明要父组件的上下文
  static childContextTypes = {
    times: propTypes.number,
    title: propTypes.string,
    addTimes: propTypes.func,
    reduceTimes: propTypes.func,
  }

  // 2. 在该函数中把上下文进行renturn
  getChildContext = () => {
    let { times } = this.state,
      { title } = this.props
    // return 什么内容，子组件的上下文context就是什么
    return {
      times,
      title,
      addTimes: this.addTimes,
      reduceTimes: this.reduceTimes
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      times: 0
    }
  }

  addTimes = (...args) => {
    this.setState({
      times: ++this.state.times
    })
  }

  reduceTimes = (...args) => {
    if (this.state.times > 0) {
      this.setState({
        times: --this.state.times
      })
    }
  }

  render() {
    // section的css
    let myStyle = {
      width: '16%',
      margin: '50px auto'
    }
    return <section className='panel panel-default' style={myStyle}>
      <Head/>
      <Body/>
      <Foot/>
    </section>
  }
}
