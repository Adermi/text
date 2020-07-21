import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'

let root = document.querySelector('#root')


class Head extends React.Component {
  constructor() {
    super()
  }

  render() {
    let { times } = this.props
    return <div className='panel-heading'>
      <h3 className='panel-title'>
        点击次数: {times}次
      </h3>
    </div>
  }
}

class Body extends React.Component {
  constructor() {
    super()
  }

  render() {
    let { addTimes, reduceTimes } = this.props.callback
    return <div className='panel-body'>
      <button className='btn btn-success' onClick={addTimes}>增加</button>
      &emsp;
      <button className='btn btn-danger' onClick={reduceTimes}>减少</button>
    </div>
  }
}

class Panel extends React.Component {
  constructor() {
    super()

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
    let { times } = this.state
    let myStyle = {
      width: '16%',
      margin: '50px auto'
    }
    return <section className='panel panel-default' style={myStyle}>
      <Head times={times}></Head>
      <Body callback={{ addTimes: this.addTimes, reduceTimes: this.reduceTimes }}></Body>
    </section>
  }

}

ReactDOM.render(
  <Panel></Panel>,
  root
);
