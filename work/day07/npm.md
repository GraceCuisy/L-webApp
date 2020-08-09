### npm相关的知识
    npm root -g : 查看用户本地安装的全局包
        C:\Users\alienware\AppData\Roaming\npm\node_modules
        window + E : 打开我的电脑
        window + R : 打开dos窗口


    npm uninstall @vue/cli -g : 全局卸载

    npm cache clean -f : 强力清除npm的缓存

    npm脚本:
        只能运行在含义package.json文件的目录下
        运行start脚本 是不用加run; npm start
        运行其他脚本   都要加run; npm run 脚本名
        "scripts": {
            "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
            "start": "npm run dev",
            "lint": "eslint --ext .js,.vue src",
            "build": "node build/build.js"
          },

    早期npm不会对包的命名做规范;可是后来npm团队发现一个问题:
        包很混乱  本身不属于vue生态的包 为了蹭vue的热度 故意以vue-开头命名
        为了防止以上的情况;npm推出了一个叫域的概念:
            @npm域名 : @vue 只有vue官方团队才有资格使用@vue这个域

    下载一个npm包,下载回来的包的类型;分两种
        第三方库/框架: jQuery,vue,react
        第三方命令行工具: babel postcss less webpack

    为什么大多数第三方命令行工具在安装的时候需要全局安装一把 再 局部安装一把?
        全局安装是为了使用起来比较方便
            命令行才会被注册进环境变量;在任何目录下我们都可以执行 安装后的命令
        本地安装是为了统一版本
            一般命令行工具都会去分析 当前命令执行的目录下 有没有本地安装过同名的命令
            如果有则会使用本地的命令行工具
            webpack1.0 2.0 3.0 4.0
                打包出来的代码是不一样的

                a同事电脑上装的是 webpack1.0
                b同事电脑上装的是 webpack2.0
                c同事电脑上装的是 webpack3.0
                项目中要使用是    webpack4.0

        npm后期觉得 全局安装比较多余;也会占据开发者电脑的资源
            npx : 会在目录去寻找本地安装的命令行工具;使用了npx之后 全局就不用装了
            npm 脚本 : 也会去寻找本地安装的命令行工具


### 常用的npm命令
    包的安装 & 卸载(不用加包的版本)
        本地安装
            npm i 包名@x.y.z -D 等价于 npm i 包名 --save-dev
            npm i 包名@x.y.z    等价于 npm i 包名 --save
        全局安装
            npm i 包名@x.y.x -g
    npm info 包名  : 查阅包相关的信息


