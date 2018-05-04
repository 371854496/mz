$(() => {
  /**请求banner图**/
  $.get("data/home_banner/getBanner.php")
    .then(banner_imgs => {
      var bodyWidth = $(document.body).width();
      var bannerLen = banner_imgs.length;//banner图个数
      for (var i = 0; i < bannerLen; i++) {//加载回轮播图
        $(`<li><img src="${banner_imgs[i].img_url}"></li>`)
          .appendTo("ul.banner-pic");
        //小圆点
        $("<li></li>").appendTo("ul.pagination");
      }
      //在末尾最加第一张
      $(`<li><img src="${banner_imgs[0].img_url}"></li>`)
        .appendTo("ul.banner-pic");
      //第一个圆点active
      $("ul.pagination>li").first().addClass("active");

      /**banner图随屏宽改变***/
      function bannerSize() {
        $("ul.banner-pic").css("width", bodyWidth * (bannerLen + 1));
        $("ul.banner-pic li").css("width", bodyWidth);
      }

      bannerSize();
      $(window).resize(() => {
        bodyWidth = $(document.body).width();
        bannerSize();
      });

      /***轮播****/
      !function () {
        var timer = null;
        var moved = 0;
        var duraTime = 300;//CSS过渡时间
        var interTime = 5000;

        function loop() {
          $($("ul.pagination").children()[moved >= bannerLen ? 0 : moved]).addClass("active")
            .siblings().removeClass("active");
          $("ul.banner-pic").css("transition", "left 0.3s linear");
          $("ul.banner-pic").css("left", -moved * bodyWidth);
          $(window).resize(() => {
            $("ul.banner-pic").css("left", -moved * bodyWidth);
          })
          if (moved == bannerLen) {//轮回
            setTimeout(() => {//过渡时间
              moved = 0;
              $("ul.banner-pic").css("transition", "");
              $("ul.banner-pic").css("left", 0);
            }, duraTime)
          }
        }

        timer = setInterval(() => {
          moved++;
          loop();
        }, duraTime + interTime);


        //轮播小点
        $("ul.pagination").click((e) => {
          $tar = $(e.target);
          if ($tar.is("li")) {
            clearInterval(timer);
            timer = null;
            moved = $tar.index();
            loop();
            timer = setInterval(() => {//重新启动
              moved++;
              loop();
            }, duraTime + interTime);
          }
        })
      }();
    });


  /**
   *楼层滚动函数
   */
  $(window || document.body).scroll(() => {
    var scrollTop = $(window || document.body).scrollTop();
    if (scrollTop >= 600) {
      $(".lift").addClass("lift_slide");
    }
    else {
      $(".lift").removeClass("lift_slide");
    }
  });
  /**电梯点击**/
  $(".lift>ul li:nth-child(1)").click(() => {
    $("html").stop(true).animate({
      scrollTop: 0
    }, 500)
  });
  $(".lift>ul li:nth-child(2)").click(() => {
    $("html").stop(true).animate({
      scrollTop: 1900
    }, 500)
  });
  $(".lift>ul li:nth-child(3)").click(() => {
    $("html").stop(true).animate({
      scrollTop: 3800
    }, 500)
  });
  $(".lift>ul li:nth-child(4)").click(() => {
    $("html").stop(true).animate({
      scrollTop: 4700
    }, 500)
  });
})