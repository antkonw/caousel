"use strict";
(function($){
    //头部轮播图
    var biggerImg = $(".header-carousel-img");
    var flagImg = $(".bottom-flag");
    var imgWidth = biggerImg.find("li").width();
    var pre = $(".direction-left");
    var next = $(".direction-right");
    var index = 0;
    var timestamp = 0;
    flagImg.on("click",function(){
        index = $(this).index();
        move(index);
    });

    pre.on("click",function(){
        var current = new Date().getTime();
        if (current - timestamp < 500) {
            return;
        } else {
            timestamp = current;
        }

        index--;
        if(index<0){
            index = flagImg.length-1;
            move(index);
        }else{
            move(index);
        }
    });
    
    next.on("click",function(){
        var current = new Date().getTime();
        if (current - timestamp < 500) {
            return;
        } else {
            timestamp = current;
        }

        index++;
        if(index > flagImg.length-1){
            index = 0;
            move(index);
        }else{
           move(index);
        }
    });

    //自动轮播
    var setTime = setInterval(play,1500);

    function play(){
        var len = biggerImg.find("li").length;
        console.log(index);
        move(index);
        ++index;
        if(index > len-1){
            index = 0;
        }    }

    //停止轮播
    $(".header-carousel").hover(function(){
        clearInterval(setTime);
    },function(){
        setTime = setInterval(play,1500);
    });

    function move(num){
        biggerImg.animate({left: -index*imgWidth},500);
        flagImg.eq(num).siblings(".bottom-flag").removeClass("on").addClass("off");
        flagImg.eq(num).removeClass("off").addClass("on");
    }

})(jQuery);