### flex的两组核心概念
    主轴 侧轴
    容器 项目

### flex的一条核心规则
    项目永远排列在主轴的正方向上

### flex容器上的属性
    1. 主侧轴是哪一根 以及 主侧轴的方向有关
            flex-direction
            flex-wrap
            flex-flow
    2. 主轴的富余空间管理
            justify-content
    3. 侧轴的富余空间管理
            align-items
            align-content

### flex项目上的属性
    order: 控制了项目的排列顺序 order越高排的越靠后
    align-self:单个项目侧轴的富余空间管理
        algin-items    : 优先级最低
        algin-self     : 优先级中等
        algin-content  : 优先级最高(必须配合 flex-wrap来使用  侧轴上必须得有堆砌)
    弹性空间管理:
        flex
            相当于是flex-grow &  flex-basis简写
            flex:1  flex-grow:1 flex-basis:0%
            flex这个属性适合 等分 等比例布局!!!
                flex-grow  : 弹性因子 默认值为0
                flex-basis : 如果没有指定flex则 使用width/height代替
                    可用空间 = (容器大小 - 所有相邻项目flex-basis的总和)
                      100   =    400 - (50*6)
                      400   =    400 - 0
                    可扩展空间 = (可用空间/所有相邻项目flex-grow的总和)
                      16.666 =  100 / 6
                      66.666 =  400 / 6
                    每项伸缩大小 = (flex-basis + (可扩展空间 x flex-grow值))
                      50 + 16.666
                      0  + 66.666

        flex-shrink: 收缩因子 默认值为1
            当项目在主轴上占据的空间超过整个容器时(在进行布局设计的时候 最好不好出现当前这种情况)
                flex-shrink才有意义
