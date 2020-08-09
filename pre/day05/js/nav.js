/*
手动橡皮筋效果:
    在手指滑屏时,让滑屏元素滑动的距离越来越大 但是增幅越来越小

    第一次的方案
        css(list,"translateX",translateX)
        translateX = eleStartX + szDisX*scale;


        eleStartX: 手指点击到屏幕上时,元素一开始的位置
        szDisX:  (var szDisX = szNowX - szStartX)
            ?? 是不是一次touchMove 手指滑动的距离???????
             不是

        translateX = touchstart时元素的位置 + 整组touchmove手指滑动的距离 * 一个越来越小的比例

    第二次的方案
        css(list,"translateX",translateX)
        translateX = 上一次touchmove结束时元素的位置 + 本次touchmove手指滑动的距离 * 一个越来越小的比例
*/

;(function (w) {
    w.nav = {};
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
        layout(arr)
    };
    function layout(arr) {
        //滑屏区域
        var nav = document.querySelector(".nav");

        var ulNode = document.createElement("ul");
        ulNode.classList.add("list");
        for(var i=0;i<arr.length;i++){
            ulNode.innerHTML+="<li><a href='javascript:;'>"+(arr[i])+"</a></li>";
        }
        nav.appendChild(ulNode)
        move(nav,ulNode,arr)
    }
    function move(nav,list,arr) {
        var eleStartX = 0;
        var szStartX = 0;
        var minX = nav.clientWidth - list.offsetWidth;


        // 手动橡皮筋效果
        var lastPoint = 0; //手指上一次的位置
        var lastTime = 0;  //上一次touchmove触发的时间
        var disTime =1;
        var disPoint =0;


        nav.addEventListener("touchstart",function (ev) {
            ev = ev || event;
            list.style.transition = "none";
            var touchC = ev.changedTouches[0];
            eleStartX = transform.css(list,"translateX");
            szStartX =touchC.clientX;

            lastPoint =touchC.clientX;
            lastTime = new Date().getTime();

            // 解决速度的残留
            list.handMove = false;
            disPoint =0;
            disTime =1;
        })
        nav.addEventListener("touchmove",function (ev) {
            ev = ev || event;
            //基本滑屏逻辑
            var touchC = ev.changedTouches[0];
            var szNowX = touchC.clientX;
            var szDisX = szNowX - szStartX;
            var translateX = eleStartX+szDisX;


            // 手动橡皮筋效果
            var nowPoint = touchC.clientX; // 手指当前的位置
            var nowTime = new Date().getTime();
            disTime = nowTime - lastTime;
            disPoint = nowPoint - lastPoint; // 手指一次touchmove的距离
            lastPoint = nowPoint;
            lastTime = nowTime;

            // 让每一次手指滑动的有效距离越来越小
            var scale = 0;
            if(translateX > 0 ){
                list.handMove = true;
                scale = document.documentElement.clientWidth / ((document.documentElement.clientWidth + translateX)*2);
                translateX = transform.css(list,"translateX")+ disPoint*scale;
            }else if(translateX < minX){
                list.handMove = true;
                var over = minX - translateX;
                scale = document.documentElement.clientWidth / ((document.documentElement.clientWidth + over)*2);
                translateX = transform.css(list,"translateX") + disPoint*scale;
            }

            transform.css(list,"translateX",translateX);
        })
        nav.addEventListener("touchend",function (ev) {
            ev = ev || event;

            if(!list.handMove){
                fast(disPoint,disTime,list,)
            }else{
                var translateX = transform.css(list,"translateX");
                if(translateX > 0 ){
                    translateX =0;
                }else if(translateX < minX){
                    translateX =minX;
                }
                list.style.transition = "1s transform";
                transform.css(list,"translateX",translateX);
            }
        })
        function fast(disPoint,disTime,list,) {
            var speed = disPoint / disTime;
            var time = 0;
            speed = Math.abs(speed) < 0.3 ? 0 : speed;
            time = Math.abs(speed)*0.2;
            time = time>2?2:time;
            time = time<0.4?0.5:time;
            console.log(speed)

            var translateX = transform.css(list,"translateX");
            var targetX =  translateX + speed*200;

            //快速滑屏的橡皮筋效果
            var bsr = "";
            if(targetX > 0 ){
                targetX =0;
                bsr = "cubic-bezier(.09,1.51,.65,1.73)";
            }else if(targetX < minX){
                targetX = minX;
                bsr = "cubic-bezier(.09,1.51,.65,1.73)";
            }

            list.style.transition = time+"s "+bsr+" transform";
            transform.css(list,"translateX",targetX);
        }
    }

    w.nav.init =init
})(window)