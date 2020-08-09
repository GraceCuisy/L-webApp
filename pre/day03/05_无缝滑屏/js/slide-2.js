(function (w) {
    // w.slide = Object.create(null);
    w.slide = {};
    function course(arr) {
        //无缝滑屏逻辑

        //生成html结构
        var wrapC = document.querySelector("#wrap .course-wrap");
        var ulNode = document.createElement("ul");
        var liNodes = document.querySelectorAll("#wrap .course-wrap > .list > li")

        ulNode.classList.add("list");
        for(var i=0;i<arr.length;i++){
            ulNode.innerHTML+="<li><img src= "+(arr[i])+"></li>";
        }
        wrapC.appendChild(ulNode);

        //动态化样式
        var styleNode = document.createElement("style");
        styleNode.innerHTML="#wrap .course-wrap > .list{width: "+arr.length+"00%}";
        styleNode.innerHTML+=" #wrap .course-wrap > .list > li{width: "+(100/arr.length)+"%;}";
        document.head.appendChild(styleNode);

            //querySelectorAll的坑  静态列表
        liNodes = document.querySelectorAll("#wrap .course-wrap > .list > li");
        setTimeout(function () {
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
        wrapC.addEventListener("touchstart",function (ev) {
            ev = ev || event;
            var touchC = ev.changedTouches[0];
            eleStartX = ulNode.offsetLeft;
            startX = touchC.clientX;
        })
        wrapC.addEventListener("touchmove",function (ev) {
            ev = ev || event;
            var touchC = ev.changedTouches[0];
            var nowX = touchC.clientX;
            var disX = nowX - startX;

            ulNode.style.left =  eleStartX + disX+"px";
        })
        wrapC.addEventListener("touchend",function () {

        })


    }
    w.slide.course = course;
})(window)