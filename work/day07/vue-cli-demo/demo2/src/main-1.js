/*
    当前这个import是webpack的语法!!!  只不过当前这个import兼容es6的语法规范
      在webpack中 天生只认识js文件
        import obj from js文件
      在webpck中 如果需要引入其他类型的文件 是需要对应的loader的支持的
        import App from "./App.vue"  需要vue-loader的支持
        vue-loader 会解析App.vue文件

     import xxx from "相对路径的文件"
     import xxx from "绝对路径的文件"
     import xxx from "包名"
          webpack的包查找机制 和 node的包查找机制很像!?
*/


/*
  webpack的包查找机制  本质上是在node包查找机制的基础上建立的
      1. 循环resolve.modules列出来所有路径! 查看这些路径中是否包含对应的包
            resolve.modules默认值./node_modules  ../node_modules  .......

      2. 找到第一步中对应的包 去查看包的描述文件(package.json)
            找对应的字段(这个字段由resolve.mainFields配置来指定要寻找的字段名)
              resolve.mainFields默认值 : ['browser', 'module', 'main']
              如果存在resolve.mainFields指定的字段;并且字段指向是一个js文件 那就使用该js文件
              如果不存在resolve.mainFields指定的字段;或者说resolve.mainFields指定的字段指向的
              不是一个js文件则走第三步
      3.
          node会把当前包底下的[resolve.mainFiles].js文件作为模块
                resolve.mainFiles 默认值:index

      4. 如果当前包底下 没有对应的[resolve.mainFiles].js文件
               那么node会选择报错

   如果webpack为对应的包配置了别名了 那不会走以上的规则 而是直接找到别名所对应的js文件
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }

*/


import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint.md-disable no-new */
new Vue({
  el:"#app",
  render:h =>h(App)
})









// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })

/*new Vue({
  el:"#app",
  components: { App },
  render:function (h) {
    return h("App")
  }
})*/
