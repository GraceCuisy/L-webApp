// 实现无缝:
//  1.先图片复制一组
//  2.当点到第一组的第一张时 立马 跳到第二组的第一张
//  3.当点到第二组的最后一张时  立马 跳到第一组的最后一张
(function (w) {
    w.swiper = {};
    function init(wrap) {
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
    };
    function slide(arr){
        var swiperWrap = document.querySelector(".swiper-wrap");//滑屏区域
        var ulNode = document.createElement("ul");//滑屏元素
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

        //重新渲染滑屏区域的高度
        liNode = document.querySelector(".swiper-wrap .list li");
        //代码执行到第55行时 界面可能还没有渲染成功
        setTimeout(()=>{
            swiperWrap.style.height = liNode.offsetHeight + "px";
        },200)

        //开始滑屏
        move(swiperWrap,ulNode,ponitWrap,arr,needWF)
    };
    function move(wrap,node,pWrap,arr,needWF){
        var eleStartX = 0;
        var touchStartX = 0;
        var touchDisX = 0;
        var index = 0;
        wrap.addEventListener("touchstart",function (ev) {
            ev = ev || event;
            node.style.transition = "";

            var touchC = ev.changedTouches[0];
            touchStartX = touchC.clientX;


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
        })
        wrap.addEventListener("touchmove",function (ev) {
            ev = ev || event;
            var touchC = ev.changedTouches[0];
            var touchNowX = touchC.clientX;
            touchDisX = touchNowX - touchStartX;

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
            css(node,"translateX",index*document.documentElement.clientWidth)
        })
    }

    w.swiper.init =init
    w.swiper.slide=slide
})(window)

