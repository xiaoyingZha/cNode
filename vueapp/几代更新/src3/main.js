import Vue from 'vue'

//关于element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//适配响应式的显示隐藏
import 'element-ui/lib/theme-chalk/display.css'
Vue.use(ElementUI)

//引入根组件
import App from './App'

//引入路由
import router from './router'
//引入数据
import store from './store'
//引入样式
import '@/assets/reset.css'

//引入解析样式
import 'github-markdown-css'



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
