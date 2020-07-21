import React from 'react'
import '../static/css/banner.css'

export default class MyBanner extends React.Component {

	constructor(props) {
		super(props)
		this.auto = true

		// 1. 解构属性进行状态初始化
		let { step, interval, speed } = this.props
		this.state = {
			step: step,
			interval: interval,
			speed: speed
		}
	}

	// 1. 第一次渲染前 => 进行首尾图片克隆
	UNSAFE_componentWillMount() {
		// 1. 进行首尾图片克隆
		let { data } = this.props
		let dataClone = Array.prototype.concat(data[data.length - 1], data, data[0])
		this.dataClone = dataClone
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.next()
		}, this.state.interval)
	}

	UNSAFE_componentWillUpdate(nextProps, nextState) {
		if (nextState.step === this.props.data.length + 1) {
			this.setState({
				step: 0,
				speed: 0
			})
		} else if (nextState.step === -2) {
			this.setState({
				step: this.props.data.length - 1,
				speed: 0
			})
		}
	}

	componentDidUpdate(oldProps, oldState) {
		if (oldState.step === this.props.data.length + 1) {
			setTimeout(() => {
				this.setState({
					step: 1,
					speed: this.props.speed
				})
			})
		}
		else if (oldState.step === -2) {
			setTimeout(() => {
				this.setState({
					step: this.props.data.length - 2,
					speed: this.props.speed
				})
			})
		}
	}


	render() {

		let { step, speed } = this.state
		let { data } = this.props
		let { dataClone } = this

		if (!data.length) { return '' }

		let spliderListSty = {
			left: -(step + 1) * 730 + 'px',
			transition: `left ${speed}ms linear`
		}

		return <div className='focus' onMouseOver={this.ifAuto} onMouseOut={this.ifAuto}>
			<ul className='splider_list' style={spliderListSty}>
				{dataClone.map((item, index) => {
					return <li key={index}>
						<a href="`"><img src={item.pic} alt={item.title} /></a>
					</li>
				})}
			</ul>
			<ul className="splider_dots" >
				{data.map((item, index) => {
					let dotIndex = step
					dotIndex = dotIndex === data.length ? 0 : dotIndex
					dotIndex = dotIndex === -1 ? data.length - 1 : dotIndex
					return <li className={
						dotIndex === index ? '.splider_dots current' : '.splider_dots'
					} key={item.id} ></li>
				})}
			</ul>
			<div className="arrow left" onClick={this.prev}> ← </div>
			<div className="arrow right" onClick={this.next}> → </div>
		</div>
	}

	// 右箭头
	next = () => {
		let { step } = this.state
		this.setState({
			step: step + 1
		})
	}

	// 左箭头
	prev = () => {
		let { step } = this.state
		this.setState({
			step: step - 1
		})
	}

	ifAuto = () => {
		if (this.auto) {
			clearTimeout(this.timer)
			this.auto = false
		} else {
			this.auto = true
			this.timer = setInterval(() => {
				this.next()
			}, this.state.interval)
		}
	}


}