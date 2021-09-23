
const registerDirectives = (app:any) => {
  // 注册一个全局自定义指令 `v-focus`
  app.directive('focus', {
  // 当被绑定的元素挂载到 DOM 中时……
    mounted (el: any) {
    // 聚焦元素
      console.log('聚焦元素')
      el.focus()
      el.children[0].focus()
      // 元素有变化，如show或者父元素变化可以加延时或判断
      setTimeout(() => {
        el.children[0].focus()
      })
    }
    // updated (el: any) {
    //   // 聚焦元素
    //   console.log('聚焦元素2')
    //   el.focus()
    // }
  })
}

export default registerDirectives
