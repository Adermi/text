import React from 'react'
import PropTypes from 'prop-types'
import '../static/css/banner.css'

export default class Banner extends React.Component {
  static defaultProps = {
    data: [],
    interval: 3000,
    step: 1,
    speed: 3000
  }

  static propTypes = {
    data: PropTypes.array,
    interval: PropTypes.number,
    tep: PropTypes.number,
    speed: PropTypes.number
  }

  constructor(props) {
    super(props)

    let { step, speed } = this.props
    this.state = {
      hovered: 'none',
      step: step,
      speed: speed
    }
  }

  // 实现首尾图片克隆
  UNSAFE_componentWillMount() {
    // 1. 获取数据
    let { data } = this.props

    // 2. 克隆首尾图片
    if (data.length) {
      // 3. 挂载到实例上
      let cloneData = Array.prototype.concat(data[data.length - 1], data, data[0])
      this.cloneData = cloneData
      this.data = data
    }
  }

  // 第一次加载完成， 开始自动轮播
  componentDidMount() {
    // 把定时器挂载到实例上，方便清除
    this.autoTimer = setInterval(this.autoMove, this.props.interval)
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // 判断最新修改索引的值，如果大于最大索引，说明已经轮播到最后一张,我们让他立刻回到索引为1的位置
    if (nextState.step > (this.cloneData.length - 1)) {
      this.setState({
        step: 1,
        speed: 0
      })
    }
  }

  componentDidUpdate() {
    // => 只有是从克隆第一张立即切换到真实的第一张才会触发这个，让当前第一张运动到第二张
    let { step, speed } = this.state
    if (step === 1 && speed === 0) {
      // 加定时器的原因：CSS3的trasition有一个问题，主栈执行的时候如果在短时间内遇到第二次要修改transition的设置，以第二次的值为主
      console.log((step + 1));

      let delayTimer = setTimeout(() => {
        clearTimeout(delayTimer)
        this.setState({
          step: (step + 1),
          speed: this.props.speed
        })
      }, 0)
    }
  }



  render() {
    // 解构状态
    let { step, speed } = this.state

    // 解构数据
    let { cloneData, data } = this

    // 如果没传入图片，不渲染轮播图
    if (!data) { return '' }

    // 控制左右按钮hover的状态
    let { hovered } = this.state

    // 控制轮播图的图片ul的left值
    let left = (step * -730) + 'px'
    let spliderListSty
    spliderListSty = {
      width: `${cloneData.length * 100}%`,
      left: left,
      transition: `left ${speed}ms linear 0ms`
    }

    return <section>
      <div className="focus" onMouseOver={this.hover} onMouseOut={this.hover}>
        <ul className="splider_list" style={spliderListSty}>
          {cloneData.map((item, index) => {
            return <li key={index}>
              <a href="`"><img src={item.pic} alt={item.title} /></a>
            </li>
          })}
        </ul>
        <ul className="splider_dots" >
          {data.map((item, index) => {
            let dotStep = step - 1
            dotStep =  step === 0 ? data.length - 1 : dotStep
            dotStep = step === (cloneData.length - 1) ? 0 : dotStep
            return <li className={dotStep === index ? 'data-index current':'data-index'} key={item.id}></li>
          })}
        </ul>
        <div className="arrow left" style={{ display: hovered }} onClick={this.prev}> ← </div>
        <div className="arrow right" style={{ display: hovered }} onClick={this.next}> → </div>
      </div>
    </section>
  }

  // 鼠标经过轮播图出现两个按钮
  hover = (e) => {
    if (this.state.hovered === 'block') {
      this.setState({
        hovered: 'none'
      })
    } else {
      this.setState({
        hovered: 'block'
      })
    }

    if (this.autoTimer) {
      clearInterval(this.autoTimer)
      this.autoTimer = null
    } else {
      this.autoTimer = setInterval(this.autoMove, this.props.interval)
    }
  }

  // 下一张
  next = (e) => {
    this.setState({
      step: ++this.state.step
    })
  }

  // 上一张
  prev = (e) => {
    this.setState({
      step: --this.state.step
    })
  }

  // 实现自动轮播功能
  autoMove = () => {
    this.setState({
      step: ++this.state.step
    })
  }
}


