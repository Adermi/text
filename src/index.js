import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import Vote from './component/Vote/Vote'

let root = document.querySelector('#root')

console.log('React',React.createElement("div", {
  style: {
    color: 'red'
  },
  children: ['1', 500]
}, "'\u6211\u662Fdiv'"));

ReactDOM.render(
  <section>
    <Vote title = {'点击有奖！！！'}></Vote>
  </section>,	
  root
)