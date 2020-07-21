import React from 'react'
import PropTypes from 'prop-types'

export default class Head extends React.Component {
	static contextTypes = {
		times: PropTypes.number
	}

	constructor(props, context) {
		super(props, context)
	}

	render() {
		let {times} = this.context
		return <div className='panel-heading'>
			<h3 className='panel-title'>
				点击次数: {times}次
        </h3>
		</div>
	}
}