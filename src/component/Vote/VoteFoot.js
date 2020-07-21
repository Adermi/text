import React from 'react'
import PropTypes from 'prop-types'

export default class VoteFoot extends React.Component {
  /**
   *  在子组件中使用上下文：
   *    1. 需要设置用到的上下文的值的类型
   *      类似自助餐：-父组件上下文有内容，不会自动给你
   *                 -你需要什么内容，就自己取
   *                 -只用出现contextTypes中的值的上下文才会被供给给该组件
   */
  static contextTypes = {
    title: PropTypes.string,
    // logContext: PropTypes.func  // 这一行被注释了，父组件的上下文的logContext值就不提供给该组件
  }

  constructor(props, context) {
    super(props, context)
    console.log('1', this.context)
    console.log(this)
  }

  render() {
    let { title } = this.context
    return <div className={'panel-footer'}>{title}</div>
  }
}


class Child extends React.Component {
  static contextTypes = {
    title: PropTypes.string,
    aa: PropTypes.number
  }

  constructor(props, context){
    super(props, context)
  }

  render() {
    let {title, aa} = this.context
    return <section>
      {[title, aa]}
    </section>
  }
}

