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

//引入markdown解析样式
import 'github-markdown-css'

//引入cookie
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);//使用第三方插件就使用Vue.use()方法
/*关于cookie的用法
this.$cookie.set('test', 'Hello world!', 1);设置
this.$cookie.get('test');获取
this.$cookie.delete('test');删除
* */



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
