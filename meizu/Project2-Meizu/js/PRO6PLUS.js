$(() => {
  $(window).scroll(() => {
    var scrollTop = $(window).scrollTop();//滚动高度
    $.each($(".con1"), function (i, val) {
      var offsetTop = $(val).offset().top;
      if (scrollTop >= offsetTop && scrollTop <= offsetTop + $(".con1").height()) {
        $(".con-center-img").addClass("con-am");
        $(".con-center-logo>img").addClass("con-am1");
        $(".con-center-title").addClass("con-am2");
        $(".conbg").addClass("con-bgam");
      } else {
        $(".con-center-img").removeClass("con-am");
        $(".con-center-logo>img").removeClass("con-am1");
        $(".con-center-title").removeClass("con-am2");
        $(".conbg").removeClass("con-bgam");
      }
    });
    $.each($(".con2"), function (i, val) {
      var offsetTop = $(val).offset().top;
      if (scrollTop >= offsetTop - 900 && scrollTop <= offsetTop + $(".con2").height()) {
        $(".con2").addClass("con2-am");
        $(".con2-center-top>h1").addClass("con2-center-amh");
        $(".con2-center-top>p").addClass("con2-center-amp");
        $(".con2-center-top>a").addClass("con2-center-ama");
        $(".list-item-title").addClass("list-item-amh");
        $(".list-item-p").addClass("list-item-amp");
        $(".list-item-xian").addClass("list-item-amd");
      } else {
        $(".con2").removeClass("con2-am");
        $(".con2-center-top>h1").removeClass("con2-center-amh");
        $(".con2-center-top>p").removeClass("con2-center-amp");
        $(".con2-center-top>a").removeClass("con2-center-ama");
        $(".list-item-title").removeClass("list-item-amh");
        $(".list-item-p").removeClass("list-item-amp");
        $(".list-item-xian").removeClass("list-item-amd");
      }
    });
    $.each($(".con3"), function (i, val) {
      var offsetTop = $(val).offset().top;
      if (scrollTop >= offsetTop - 900 && scrollTop <= offsetTop + $(".con3").height()) {
        $(".con3-center-feel-title").addClass("con3-center-amh");
        $(".con3-center-feel-p").addClass("con3-center-amp");
      } else {
        $(".con3-center-feel-title").removeClass("con3-center-amh");
        $(".con3-center-feel-p").removeClass("con3-center-amp");
      }
    });
    $.each($(".con4"), function (i, val) {
      var offsetTop = $(val).offset().top;
      if (scrollTop >= offsetTop - 900 && scrollTop <= offsetTop + $(".con4").height()) {
        $(".con4-center-cpu-title").addClass("con3-center-amh");
        $(".con4-center-cpu-p").addClass("con3-center-amp");
        $(".con4-center-top-a").addClass("con4-center-ama");
      } else {
        $(".con4-center-cpu-title").removeClass("con3-center-amh");
        $(".con4-center-cpu-p").removeClass("con3-center-amp");
        $(".con4-center-top-a").removeClass("con4-center-ama");
      }
    });
    $.each($(".con5"), function (i, val) {
      var offsetTop = $(val).offset().top;
      if (scrollTop >= offsetTop - 900 && scrollTop <= offsetTop + $(".con5").height()) {
        $(".con5-center-l-h").addClass("con5-center-amh");
        $(".con5-center-l-p").addClass("con5-center-amp");
        $(".con2-center-top-a").addClass("con5-center-ama");
        $(".con5-center-list-item-h").addClass("list-item-amh5");
        $(".con5-center-list-item-p").addClass("list-item-amp5");
        $(".con5-divide-line").addClass("list-item-amd5");
      } else {
        $(".con5-center-l-h").removeClass("con5-center-amh");
        $(".con5-center-l-p").removeClass("con5-center-amp");
        $(".con2-center-top-a").removeClass("con5-center-ama");
        $(".con5-center-list-item-h").removeClass("list-item-amh5");
        $(".con5-center-list-item-p").removeClass("list-item-amp5");
        $(".con5-divide-line").removeClass("list-item-amd5");
      }
    });
    $.each($(".con6"), function (i, val) {
      var offsetTop = $(val).offset().top;
      if (scrollTop >= offsetTop - 900 && scrollTop <= offsetTop + $(".con6").height()) {
        $(".con6-center-h1").addClass("con3-center-amh");
        $(".con6-center-p").addClass("con3-center-amp");
      } else {
        $(".con6-center-h1").removeClass("con3-center-amh");
        $(".con6-center-p").removeClass("con3-center-amp");
      }
    });
    $.each($(".con7"), function (i, val) {
      var offsetTop = $(val).offset().top;
      if (scrollTop >= offsetTop - 900 && scrollTop <= offsetTop + $(".con7").height()) {
        $(".con7-center-3d-h").addClass("con3-center-amh");
        $(".con7-center-3d-p").addClass("con3-center-amp");
      } else {
        $(".con7-center-3d-h").removeClass("con3-center-amh");
        $(".con7-center-3d-p").removeClass("con3-center-amp");
      }
    });
    $.each($(".con8"), function (i, val) {
      var offsetTop = $(val).offset().top;
      if (scrollTop >= offsetTop - 900 && scrollTop <= offsetTop + $(".con8").height()) {
        $(".con8-center2-desc1>.f42").addClass("mtouch-h");
        $(".con8-center2-desc1>.f16").addClass("mtouch-p");
        $(".con8-center2-desc1>.mtouch-graph").addClass("mtouch-d1");
        $(".con8-center2-desc1>.mtouch-sub-desc").addClass("mtouch-d2");
        $(".con8-center2-desc2>.f42").addClass("mtouch-h2");
        $(".con8-center2-desc2>.f16").addClass("mtouch-p2");
        $(".con8-center2-desc2>.mtouch-graph").addClass("mtouch-d12");
        $(".con8-center2-desc2>.mtouch-sub-desc").addClass("mtouch-d22");
        $(".mtouch-btns>.mtouch-btn-1").addClass("mtouch-btn-1am");
        $(".mtouch-btns>.mtouch-btn-2").addClass("mtouch-btn-2am");
        $(".mtouch-btns>.mtouch-btn-3").addClass("mtouch-btn-3am");
        $(".mtouch-btns>.mtouch-btn-4").addClass("mtouch-btn-4am");
        $(".mtouch-btns>.mtouch-btn-5").addClass("mtouch-btn-5am");
        $(".mtouch-btns>.mtouch-btn-6").addClass("mtouch-btn-6am");
        $(".mtouch-btns>.mtouch-btn-7").addClass("mtouch-btn-7am");
      } else {
        $(".con8-center2-desc1>.f42").removeClass("mtouch-h");
        $(".con8-center2-desc1>.f16").removeClass("mtouch-p");
        $(".con8-center2-desc1>.mtouch-graph").removeClass("mtouch-d1");
        $(".con8-center2-desc1>.mtouch-sub-desc").removeClass("mtouch-d2");
        $(".con8-center2-desc2>.f42").removeClass("mtouch-h2");
        $(".con8-center2-desc2>.f16").removeClass("mtouch-p2");
        $(".con8-center2-desc2>.mtouch-graph").removeClass("mtouch-d12");
        $(".con8-center2-desc2>.mtouch-sub-desc").removeClass("mtouch-d22");
        $(".mtouch-btns>.mtouch-btn-1").removeClass("mtouch-btn-1am");
        $(".mtouch-btns>.mtouch-btn-2").removeClass("mtouch-btn-2am");
        $(".mtouch-btns>.mtouch-btn-3").removeClass("mtouch-btn-3am");
        $(".mtouch-btns>.mtouch-btn-4").removeClass("mtouch-btn-4am");
        $(".mtouch-btns>.mtouch-btn-5").removeClass("mtouch-btn-5am");
        $(".mtouch-btns>.mtouch-btn-6").removeClass("mtouch-btn-6am");
        $(".mtouch-btns>.mtouch-btn-7").removeClass("mtouch-btn-7am");
      }
    });
    $.each($(".con9"), function (i, val) {
      var offsetTop = $(val).offset().top;
      if (scrollTop >= offsetTop - 900 && scrollTop <= offsetTop + $(".con9").height()) {
        $(".con9-center-h").addClass("con3-center-amh");
        $(".con9-center-p").addClass("con3-center-amp");
      } else {
        $(".con9-center-h").removeClass("con3-center-amh");
        $(".con9-center-p").removeClass("con3-center-amp");
      }
    });
    $.each($(".con10"), function (i, val) {
      var offsetTop = $(val).offset().top;
      if (scrollTop >= offsetTop - 900 && scrollTop <= offsetTop + 500) {
        $(".con10-center-h").addClass("con3-center-amh");
        $(".con10-center-p").addClass("con3-center-amp");
      } else {
        $(".con10-center-h").removeClass("con3-center-amh");
        $(".con10-center-p").removeClass("con3-center-amp");
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
      "opacity": 0,
      "display": "block"
    })
    $(".next_link .next_more").css("background", "transparent")
    $(".next_link .next_more p").css("color", "#fff")
    $(".next_link .next_more h2").css("color", "#fff")

  })
  $(".next_link").mouseleave(function () {
    $(".foot-mask").css({
      "opacity": 0,
      "display": "none"
    })
    $(".next_link .next_more").css("background", "#f8f8f8")
    $(".next_link .next_more p").css("color", "#999")
    $(".next_link .next_more h2").css("color", "#32cef6")
    $(".next_link .next_bg").css({
      "opacity": 0,
      "height": 0,
      "top": 117
    })
  })
});