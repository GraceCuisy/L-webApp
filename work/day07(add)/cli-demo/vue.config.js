module.exports = {
    //在我们ctrl + s时才能启作用
    lintOnSave:false,
    devServer:{
        open:true
    },
    configureWebpack:{
        devServer:{
            port:6666
        }
    }
}