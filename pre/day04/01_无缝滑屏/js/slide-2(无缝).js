(function (w) {
    w.slide = {};
    function course(arr) {
        var wrapC = document.querySelector(".course-wrap");
        if(!wrapC){
            return;
        }

        //生成html结构
        var wrapC = document.querySelector(".course-wrap");
        var ulNode = document.createElement("ul");
        var liNodes = document.querySelectorAll(".course-wrap > .list > li")
        var wrapP = document.querySelector(".course-wrap > .course-point");


        //无缝
        var pointsLength = arr.length;
        var needWF = wrapC.getAttribute("needWF")
        if(needWF !== null){
            arr = arr.concat(arr);
            console.log(arr);
        }

        //生成图片列表
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


        var eleStartX = 0; // 元素一开始的位置
        var startX = 0;    // 手指一开始的位置
        var index = 0;    //  手指抬起时ul的位置

        wrapC.addEventListener("touchstart",function (ev) {
            ulNode.style.transition="";
            ev = ev || event;
            var touchC = ev.changedTouches[0];


            /*无缝逻辑
                点击第一组第一张时 跳到第二组的第一张
                点击第二组最后一张时 跳到第一组的最后一张*/
            if(needWF !== null){
                var whichPic = transform.css(ulNode,"translateX") / document.documentElement.clientWidth;
                if(whichPic === 0){
                    whichPic = -pointsLength;
                }else if (whichPic === 1-arr.length){
                    whichPic = 1-pointsLength;
                }
                transform.css(ulNode,"translateX",whichPic*document.documentElement.clientWidth)
            }

            //元素一开始位置的获取一定要等无缝位置初始化完毕
            eleStartX =transform.css(ulNode,"translateX");
            startX = touchC.clientX;
        })
        wrapC.addEventListener("touchmove",function (ev) {
            ev = ev || event;
            var touchC = ev.changedTouches[0];
            var nowX = touchC.clientX;

            var disX = nowX - startX;

           transform.css(ulNode,"translateX",eleStartX + disX);
        })
        wrapC.addEventListener("touchend",function () {
            ulNode.style.transition=".5s transform";
            index = Math.round(transform.css(ulNode,"translateX") / document.documentElement.clientWidth);

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
                points[-index%pointsLength].classList.add("active")
            }


            transform.css(ulNode,"translateX",index*document.documentElement.clientWidth);
        })

        //小圆点

        if(wrapP){
            for(var i=0;i<pointsLength;i++){
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