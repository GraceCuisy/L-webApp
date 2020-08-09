var colors = require('colors');
console.log(colors);

var test = require('./src/test.js');
// console.log(test);


// console.log(module.paths)
    /*
        [
            'C:\\Users\\alienware\\Desktop\\bj_19_1121\\work\\day07\\vue-cli-demo\\node_package\\node_modules',
            'C:\\Users\\alienware\\Desktop\\bj_19_1121\\work\\day07\\vue-cli-demo\\node_modules',
            'C:\\Users\\alienware\\Desktop\\bj_19_1121\\work\\day07\\node_modules',
            'C:\\Users\\alienware\\Desktop\\bj_19_1121\\work\\node_modules',
            'C:\\Users\\alienware\\Desktop\\bj_19_1121\\node_modules',
            'C:\\Users\\alienware\\Desktop\\node_modules',
            'C:\\Users\\alienware\\node_modules',
            'C:\\Users\\node_modules',
            'C:\\node_modules'
        ]
    */




/*
    module.paths : 数组

    node 的包查找机制:
        1. 循环module.paths列出来所有路径! 查看这些路径中是否包含对应的包
        2. 找到第一步中对应的包 去查看包的描述文件(package.json.main字段)
                如果存在main字段;并且main字段是一个js文件 那就使用该js文件
                如果不存在main字段;或者说main字段指向的不是一个js文件则走第三步
        3. 如果不存在main字段;或者说main字段指向的不是一个js文件
            node会把当前包底下的index.js文件作为模块
        4. 如果当前包底下 没有对应的index.js文件
            那么node会选择报错
*/
