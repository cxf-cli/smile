// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//在babel中引入了，为了按需引入,减小打包体积
import {Button,Row,Col,Swipe,SwipeItem,Lazyload,List,Field,NavBar} from 'vant'
//导入移动端适配的js文件
import './assets/js/flexible'
import graphql from './graphql';


Vue.use(NavBar).use(Field).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  graphql,
  render:h=>h(App)
})
