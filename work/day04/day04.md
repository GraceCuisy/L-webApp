### 手机如何访问自己写的webapp
    1. 电脑防火墙要关
    2. 电脑要和手机处于同一个网段(电脑开一个共享wifi 让手机连接)
    3. 通过fis3启动服务
            fis3 server open : 打开fis3的静态资源服务器的根目录
            将自己的页面放进去 index.html
            fis3 server start : 启动fis3的静态资源服务器
    4. 打开cmd窗口 输入ipconfig命令 查看自己的ip

### day04 下午的任务
    无缝
    自动轮播
    防抖动