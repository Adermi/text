import React from 'react'
import ReactDOM from 'react-dom'
import MyBanner from './component/MyBanner'
// import ReactSwipe from 'react-swipe'
// import './static/css/banner.css'


let root = document.querySelector('#root')

// 在React中使用图片等资源的时候，不能使用相对路径，应为经过webpack编译后
// 的代码，文件路径已经该改变了，可以用(ES6Module导入图片|CommonJS导入图片)或者 路径都是(网络地址http://xx.xx.xx/1.jpg)
let data = []
for (let i = 1; i < 5; i++) {
  data.push({
    id: i,
    title: '',
    pic: require(`./static/images/banner${i}.jpg`)
  })
}


// data:图片信息  index:默认展示第几张图片  interval:隔多少时间轮播 speed:轮播速度
ReactDOM.render(
  <main>
    <MyBanner data={data} step={0} interval={3000} speed={600} />
  </main>,
  root
)

// ReactDOM.render(
//   <main>
//     <ReactSwipe className='focus' swipeOptions={{
//       startSlide: 0,
//       speed: 400,
//       widthOfSiblingSlidePreview: 0,
//       auto: 3000,
//       continuous: true,
//       disableScroll: false,
//       stopPropagation: false
//     }}>
//         {data.map((item, index) => {
//           return <div key={index}><a href=""><img src={item.pic} alt={item.title} /></a></div>
//         })}
//     </ReactSwipe>
//   </main>,
//   root
// )

// ReactDOM.render(
//     <main>
//         {/* 
//           * data: 轮播图展示的数据
//           * interval: 自动轮播的时间(3000ms),图片间隔多长时间轮播一次
//           * step: 默认展示的图片的索引(无缝轮播图前后各有一张克隆)
//           * speed: 每一张图片切换所需的时间(300ms)
//           *
//           */}
//         <Banner data={data} interval={2000} step={1} speed={300} />
//         <Banner data={data} interval={3000} step={1} speed={300} />
//     </main>,
//     root
// )
