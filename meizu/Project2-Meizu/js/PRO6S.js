$(() => {
  $(window).scroll(() => {
    var scrollTop = $(window).scrollTop();//滚动高度
    $.each($(".slider"), function (i, val) {
      if (!$(val).hasClass("actived")) {
        var offsetTop = $(val).offset().top;
        if (scrollTop >= offsetTop - 450) {//控制楼层
          $(".slider:nth-child(" + (i + 1) + ")").addClass("actived");
        }
      }
    });
  })
  $(".next_link").mouseover(function () {
    $(".next_link .next_bg").css({
      "opacity": 1,
      "height": 500,
      "top": -133
    })
    $(".foot-mask").css({
      "opacity": 0.4,
      "display": "block"
    })
    $(".next_link .next_more").css("background", "transparent")
    $(".next_link .next_more p").css("color", "#fff")
    $(".next_link .next_more h2").css("color", "#fff")

  })
  $(".next_link").mouseleave(function () {
    $(".foot-mask").css({
      "opacity": 0.4,
      "display": "none"
    })
    $(".next_link .next_more").css("background", "#f8f8f8")
    $(".next_link .next_more p").css("color", "#999")
    $(".next_link .next_more h2").css("color", "#32cef6")
    $(".next_link .next_bg").css({
      "opacity": 0,
      "height": 0,
      "top": 0
    })
  })
  ;
});
$(() => {
  var c3 = document.getElementById("soundCvs");
  var canWidth = c3.width;
  var canHeight = c3.height;
  var ctx = c3.getContext("2d");

  // function loop(){
  // 	var count=0;
  // 	for(var y=3;y<canHeight;y+=20){
  // 		var r=6;
  // 		for(var x=count%2==0?0:15;x<canWidth;x+=30){
  //
  // 			if(x<canWidth/2){
  // 				r-=0.5;
  // 				if(r<2){
  // 					r=2;
  // 				}
  // 			}else if(x>canWidth/2&&x<canWidth*3/4){
  // 				r=2;
  // 			}else{
  // 				r+=0.5;
  // 				if(r>4){
  // 					r=4;
  // 				}
  // 			}
  // 			ctx.save();
  // 			ctx.beginPath();
  // 			ctx.arc(x, y, r, 0, 2 * Math.PI);
  // 			ctx.fillStyle = "#ddd";
  // 			ctx.fill();
  // 			ctx.restore();
  // 		}
  // 		count++;
  // 	}
  //
  // }
  // loop();
});