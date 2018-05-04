/*图片开场动画队列*/
$(() => {
  var animateList = [
    () => {
      $(".move0").animate({opacity: 0}, 1000, queueList)
    },
    () => {
      $(".move2>.min1").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move2>.min2").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move2>.min3").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move2>.min4").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move3>.min1").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move3>.min2").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move3>.min3").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move3>.min4").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move4>.min1").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move4>.min2").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move4>.min3").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".move4>.min4").animate({opacity: 1}, 500, queueList)
    },
    () => {
      $(".start").animate({
        width: "40%",
        height: "40%",
        bottom: -100,
        right: 100
      }, 1000, queueList)
    },
    () => {
      $(".start").animate({opacity: 0}, 800, function () {
        $(".start").hide();
        queueList
      })
    },
    () => {
      $(".mobil1>img").animate({opacity: 1}, 500, queueList)
    }
  ]
  $(document).queue('_queueList', animateList);
  var queueList = function () {
    $(document).dequeue('_queueList');
  };
  queueList();
})
/*sec1手机动画*/
setTimeout(() => {
  $(".sec1>.sec1content>.mobil1>img").removeClass("mobil1start")
  $(".sec1>.sec1content>.mobil2>img").removeClass("mobil2start")
}, 9000);
/*sec1文字动画*/
setTimeout(() => {
  $(".sec1>.sec1content>.text>p").removeClass("pmove")
}, 12000);
/*滚轮事件*/
$(() => {
  $(window).scroll(() => {
    var scrollTop = $(window).scrollTop();
    var offsetTop = $(".sec2>img").offset().top - window.screen.availHeight / 2;
    if (offsetTop <= scrollTop) {
      $(".sec2>img").css("transform", "translateY(-50px)").css("opacity", "1");
    }
  });
})
// 第三部分出现
$(() => {
  $(window).scroll(() => {
    var scrollTop = $(window).scrollTop();
    var offsetTop = $(".sec3").offset().top - window.screen.availHeight / 2;
    if (offsetTop <= scrollTop) {
      $(".sec3>.showtext>p").removeClass("hidtext");
      setTimeout(() => {
        $(".sec3>.bgimg").css("opacity", "1");
      }, 1500)
      setTimeout(() => {
        $(".sec3>.mobile").css("opacity", "1");
      }, 2500)
    }
  });
})


// 鸟---移动背景图
$(() => {
  var x = 0, y = 0, width = 138 * (-1), height = 308 * (-1), movex = 0, movey = 0;
  var timer = setInterval(() => {
    if (x < 19 && y < 7) {
      x++;
    } else if (x >= 19 && y < 7) {
      y++;
      x = 0;
    } else {
      x = 0;
      y = 0;
    }
    ;
    movex = x * width + "px";
    movey = y * height + "px";
    $(".sec3>.bird").css("background-position", `${movex} ${movey}`);
  }, 100)
})
//第六部分数据文字出现动画
$(() => {
  $(window).scroll(() => {
    var scrollTop = $(window).scrollTop();
    var offsetTop = $(".sec6").offset().top - window.screen.availHeight / 2;
    if (offsetTop <= scrollTop) {
      setTimeout(() => {
        $(".sec6>.sec6_data>:first-child").css("transform", "translate(0px)");
      }, 1500)
      setTimeout(() => {
        $(".sec6>.sec6_data>:nth-child(2)").css("transform", "translate(0px)");
      }, 2000)
      setTimeout(() => {
        $(".sec6>.sec6_data>:nth-child(3)").css("transform", "translate(0px)");
      }, 2500)
    }
  });
})
$(window).scroll(() => {
  var scrollTop = $(window).scrollTop();
  var offsetTop = $(".sec7").offset().top - window.screen.availHeight / 2;
  if (offsetTop <= scrollTop) {
    setTimeout(() => {
      $(".sec7>.sec7bg").removeClass("hidpic")
    }, 2000)
    setTimeout(() => {
      $(".sec7>.sec7bg").css("border-radius", "0")
    }, 4000)
  }
});

// 统计图
$(window).scroll(() => {
  var scrollTop = $(window).scrollTop();
  var offsetTop = $(".sec9").offset().top - window.screen.availHeight / 2;
  if (offsetTop <= scrollTop) {
    $("section>.sec9>.sec9pic>.redline").removeClass("hidred");
    $("section>.sec9>.sec9pic>.blueline").removeClass("hidblue");
    $("section>.sec9>.sec9pic>.shadow").removeClass("hidshadow")

  }
});
//脚部悬停效果
$(() => {
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
      "top": 117,
    })
  });
})
//移除文字隐藏
$(() => {
  function showtext(sel) {
    $(window).scroll(() => {
      var scrollTop = $(window).scrollTop();
      var offsetTop = $(sel).offset().top - window.screen.availHeight / 2;
      if (offsetTop <= scrollTop) {
        $(sel).children().children().removeClass("hidtext");
      }
    });
  }

  showtext(".sec4");
  showtext(".sec5");
  showtext(".sec6");
  showtext(".sec7");
  showtext(".sec8");
  showtext(".sec9");
  showtext(".sec10");
})
