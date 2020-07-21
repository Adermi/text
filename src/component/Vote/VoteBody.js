import React from 'react'
import PropsTypes from 'prop-types'

export default class Body extends React.Component {
  static contextTypes = {
    addTimes: PropsTypes.func,
    reduceTimes: PropsTypes.func
  }

  constructor(props, context) {
    super(props, context)
  }

  render() {
    let { addTimes, reduceTimes } = this.context
    return <div className='panel-body'>
      <button className='btn btn-success' onClick={addTimes}>增加</button>
      &emsp;
      <button className='btn btn-danger' onClick={reduceTimes}>减少</button>
    </div>
  }
}