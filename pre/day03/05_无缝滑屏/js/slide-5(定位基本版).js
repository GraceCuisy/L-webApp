(function (w) {
    w.slide = {};
    function course(arr) {
        //无缝滑屏逻辑
        var wrapC = document.querySelector(".course-wrap");
        if(!wrapC){
            return;
        }


        //生成html结构
        var wrapC = document.querySelector(".course-wrap");
        var ulNode = document.createElement("ul");
        var liNodes = document.querySelectorAll(".course-wrap > .list > li")
        var wrapP = document.querySelector(".course-wrap > .course-point");

        ulNode.classList.add("list");
        for(var i=0;i<arr.length;i++){
            ulNode.innerHTML+="<li><img src= "+(arr[i])+"></li>";
        }
        wrapC.appendChild(ulNode);

        //动态化样式
        var styleNode = document.createElement("style");
        styleNode.innerHTML=".course-wrap > .list{width: "+arr.length+"00%}";
        styleNode.innerHTML+=".course-wrap > .list > li{width: "+(100/arr.length)+"%;}";
        document.head.appendChild(styleNode);

        //querySelectorAll的坑  静态列表
        setTimeout(function () {
            liNodes = document.querySelectorAll(".course-wrap > .list > li");
            wrapC.style.height =liNodes[0].offsetHeight+"px";
        },200)


        /*
           *滑屏逻辑
           *    第一步: 获取list一开始的位置
           *    第二步: 拿到手指滑动的距离
           *    第三步: 将手指滑动的距离给元素加上
        * */
        var eleStartX = 0; // 元素一开始的位置
        var startX = 0;    // 手指一开始的位置
        var index = 0;    //  手指抬起时ul的位置
        var disX =0;      //  手指滑动一次的距离
        wrapC.addEventListener("touchstart",function (ev) {
            ulNode.style.transition="";
            ev = ev || event;
            var touchC = ev.changedTouches[0];
            eleStartX = ulNode.offsetLeft;
            startX = touchC.clientX;
        })
        wrapC.addEventListener("touchmove",function (ev) {
            ev = ev || event;
            var touchC = ev.changedTouches[0];
            var nowX = touchC.clientX;
            disX = nowX - startX; // nowX的值一直在被同步  除非手指抬起来

            ulNode.style.left =  eleStartX + disX+"px";
        })
        wrapC.addEventListener("touchend",function () {
            ulNode.style.transition=".5s left";
            index = Math.round(ulNode.offsetLeft / document.documentElement.clientWidth);

            if(index>0){
                index=0;
            }else if(index < 1-arr.length){
                index =  1-arr.length;
            }


            if(wrapP){
                var points = wrapP.querySelectorAll("span");
                for(var i=0;i<points.length;i++){
                    points[i].classList.remove("active");
                }
                points[-index].classList.add("active")
            }


            ulNode.style.left =  index*document.documentElement.clientWidth+"px";
        })

        //小圆点

        if(wrapP){
            for(var i=0;i<arr.length;i++){
                if(i==0){
                    wrapP.innerHTML+="<span class='active'></span>";
                }else {
                    wrapP.innerHTML+="<span></span>";
                }
            }
        }
    }
    w.slide.course = course;
})(window)