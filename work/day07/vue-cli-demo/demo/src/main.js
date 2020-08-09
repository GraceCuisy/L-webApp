import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint.md-disable no-new */

/*
  App:{
    name: 'App',
    render:function(h){
      return h("div")
    }
  }

  template:`<div id="app">
    <img src="./assets/logo.png">
  </div>`
*/
new Vue({
  el: '#app',
  render: h => h(App)
})
