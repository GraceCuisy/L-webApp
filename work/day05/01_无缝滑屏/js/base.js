//实现防抖动
//判断用户上来的首次滑屏方向 如果是y轴方向 那以后不管怎么滑动都不会触发滑屏逻辑
//判断用户上来的首次滑屏方向 如果是x轴方向 那以后不管怎么滑动都会触发滑屏逻辑


//在工作区中改错了文件 不小心改了同事的文件 将你在工作区中的修改回退回去:
//git checkout -- 回退的文件名


(function (w) {
    w.swiper = {};
    function init(wrap,arr) {
        //挑选一个适配方案
        var styleNode = document.createElement("style");
        var w = document.documentElement.clientWidth/16;
        styleNode.innerHTML = `html{font-size:${w}px!important}`;
        document.head.appendChild(styleNode)
        //禁止移动端事件的默认行为
        wrap.addEventListener("touchstart",(ev)=>{
            ev = ev || event;
            ev.preventDefault();
        })

        //进行无缝滑屏的UI布局
        slide(arr)
    };
    function slide(arr){
        var swiperWrap = document.querySelector(".swiper-wrap");//滑屏区域
        var ulNode = document.createElement("ul");//滑屏元素
        //开启3d硬件加速  这边3d硬件加速开启失败了   原因待查!!!
        css(ulNode,"translateZ",0)

        var ponitWrap = document.querySelector(".swiper-wrap > .point-wrap");//小圆点
        var liNode = document.querySelector(".swiper-wrap .list li");
        var styleNode = document.createElement("style");//创建一个style标签
        if(!swiperWrap){
            throw new Error("页面上缺少swiper-wrap这个滑屏区域")
            return ;
        }

        //小圆点相关的逻辑
        if(ponitWrap){
            ponitWrap.size = arr.length;
            for(var i=0;i<arr.length;i++){
                if (i==0){
                    ponitWrap.innerHTML+="<span class='active'></span>"
                }else{
                    ponitWrap.innerHTML+="<span></span>"
                }
            }
        }

        //是否需要无缝
        var needWF = swiperWrap.getAttribute("needWF");
        if(needWF !== null){
            //先图片复制一组
            arr = arr.concat(arr)
        }

        //根据arr动态的去创建滑屏元素
        ulNode.classList.add("list"); // 给ulNode加class的
        for(var i=0;i<arr.length;i++){
            ulNode.innerHTML+="<li><img src="+(arr[i])+"></li>";
        }
        swiperWrap.appendChild(ulNode);
        styleNode.innerHTML=".swiper-wrap .list{width:"+(arr.length)+"00%}";
        styleNode.innerHTML+=".swiper-wrap .list li{width:"+(1/arr.length)*100+"%}";
        document.head.appendChild(styleNode);

        /*  整个滑屏元素的滑动使用的是2d变换来实现的 所以整个滑屏区域的高度可以由滑屏元素自动撑开
            不需要动态计算了

            //重新渲染滑屏区域的高度
            liNode = document.querySelector(".swiper-wrap .list li");
            //代码执行到第55行时 界面可能还没有渲染成功
            setTimeout(()=>{
                swiperWrap.style.height = liNode.offsetHeight + "px";
            },200)
        */

        var needAuto = swiperWrap.getAttribute("needAuto");
        //手动滑屏
        move(swiperWrap,ulNode,ponitWrap,arr,needWF,needAuto)
        //自动滑屏
        if(needAuto!== null && needWF!== null){
            autoMove(ulNode,ponitWrap,0,arr)
        }
    };
    function move(wrap,node,pWrap,arr,needWF,needAuto){
        var eleStartX = 0;
        var eleStartY = 0;
        var touchStartX = 0;
        var touchStartY = 0;
        var touchDisX = 0;
        var touchDisY = 0;
        var index = 0;

        //防抖动需要的变量
        var isFirst = true; //让一段逻辑只执行一次需要的变量
        var isX = true; //用户的滑屏方向是否是x轴

        wrap.addEventListener("touchstart",function (ev) {
            ev = ev || event;
            node.style.transition = "";

            //停掉自动滑屏
            clearInterval(node.timer)

            //获取手指一开始的位置
            var touchC = ev.changedTouches[0];
            touchStartX = touchC.clientX;
            touchStartY = touchC.clientY;

            //无缝的逻辑
            if(needWF !== null){
                //需要无缝的
                var whichPic = css(node,"translateX") / document.documentElement.clientWidth;
                if(whichPic === 0){
                    // 当点到第一组的第一张时 立马 跳到第二组的第一张
                    whichPic = -pWrap.size;
                }else if(whichPic === 1-arr.length){
                    // 当点到第二组的最后一张时  立马 跳到第一组的最后一张
                    whichPic = 1-pWrap.size;
                }
                css(node,"translateX",whichPic*document.documentElement.clientWidth)
            }

            //元素一开始的位置 一定要等无缝逻辑走完之后才能确定
            eleStartX = css(node,"translateX");
            eleStartY = css(node,"translateY");

            //防抖动的值得重新置回来
            isFirst = true;
            isX = true;
        })
        wrap.addEventListener("touchmove",function (ev) {

            //看门狗
            if(!isX){
                //咬住
                return;//防的是后续的抖动
            }

            ev = ev || event;
            var touchC = ev.changedTouches[0];
            var touchNowX = touchC.clientX;
            var touchNowY = touchC.clientY;

            //触发一次touchmove时 手指在x轴 和 y轴的上的位移(有正 有负)
            touchDisX = touchNowX - touchStartX;
            touchDisY = touchNowY - touchStartY;

            //判断用户上来的首次滑屏方向
            if(isFirst){
                isFirst = false
                //如果在手指的滑动方向是y轴 则需要停止整个滑屏逻辑
                if(Math.abs(touchDisY) > Math.abs(touchDisX)){
                    //说明滑动的方向 是偏向y轴的
                    isX=false;
                    return; //防的是首次抖动
                }
            }

            //真正让滑屏元素产生位移的代码!!!
            css(node,"translateX",eleStartX + touchDisX)
        })
        wrap.addEventListener("touchend",function () {


            index = Math.round(css(node,"translateX") / document.documentElement.clientWidth)

            if(index > 0){
                index =0
            }else if(index < (1-arr.length)){
                index = 1-arr.length
            }

            if(pWrap){
                var points = pWrap.querySelectorAll("span");
                for(var i=0;i<points.length;i++){
                    points[i].classList.remove("active");
                }
                //不管无缝有没有复制一组图片 小圆点的下标永远都是0到4
                points[-index%pWrap.size].classList.add("active");
            }

            node.style.transition = ".5s transform";
            css(node,"translateX",index*document.documentElement.clientWidth);

            //重新开启自动轮播
            if(needAuto!== null && needWF!== null){
                autoMove(node,pWrap,index)
            }
        })
    };

    function autoMove(node,pWrap,autoFlag,arr){
        clearInterval(node.timer);

        //var autoFlag = 0; //所有的下标都看成负值
        node.timer = setInterval(function () {
            node.style.transition = ".5s transform linear"
            //自动滑屏
            autoFlag--;
            css(node,"translateX",autoFlag*document.documentElement.clientWidth);

            //小圆点的逻辑
            if(pWrap){
                var points = pWrap.querySelectorAll("span");
                for(var i=0;i<points.length;i++){
                    points[i].classList.remove("active");
                }
                points[-autoFlag%pWrap.size].classList.add("active");
            }
        },2000);

        //代码的执行是非常快的 界面的渲染是滞后的
        node.addEventListener("transitionend",function () {
            //完成过渡动画后会触发的事件
            //无缝 当自动滑到第二组的最后一张时 立马跳到第一组的最后一张
            if(autoFlag  === 1-arr.length){
                autoFlag = 1-arr.length/2;
                node.style.transition = ""
                css(node,"translateX",autoFlag*document.documentElement.clientWidth)
            }
        })
    }

    w.swiper.init =init
})(window)

