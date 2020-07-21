import React from 'react'
import ReactDOM from 'react-dom'
// import propTypes from 'prop-types'
import ReactSwipe from 'react-swipe'
import './static/css/banner.css'

let root = document.querySelector('#root')

let data = []
for (let i = 1; i < 5; i++) {
	data.push({
		id: i,
		title: '',
		pic: require(`./static/images/banner${i}.jpg`)
	})
}

class Banner extends React.Component {
  static defaultProps = {
    data: [],
    interval: 3000,
    step: 0,
    speed: 3000
  }

	constructor(props) {
		super(props)

		let {step} = this.props
		this.state = {
			step: step
		}
	}

	render() {
		let { data } = this.props

		let swipeOptions = {
			startSlide: this.state.step,
			auto : 3000,
			speed : 1000,
		}

		return <div className="focus">
			<ReactSwipe swipeOptions={swipeOptions}>
				{data.map((item) => {
					return <div key={item.id}><a href=""><img src={item.pic} alt={item.title} /></a></div>
				})}
			</ReactSwipe>
		</div>
	}
}

ReactDOM.render(
	<Banner data={data} step={0} interval={3000} speed={300} />,
	root
)