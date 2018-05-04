//header.js
$(() => {
  /**加载页面**/
  $.get("header.html")
    .then(resData => {
      $("#header").html(resData);

      /***绑定事件****/
      //判断用户是否已经登录
      $.get("data/user/isLogin.php")
        .then((resData) => {
          if (resData.code > 0) {
            $(".header-user").data("islogin", true);
            $(".header-user-login .login_uname").html(resData.data.uname);
            //加载用户头像
            $.get("data/user/load_user_avatar.php")
              .then(resData => {
                if (resData.code > 0) {
                  if (resData.data !== "default") {
                    $(".header-user-img>img").attr("src", resData.data);
                  }
                } else {
                  alert(resData.msg);
                }
              });
          } else {
            $(".header-user").data("islogin", false);//自定义属性
          }
        });

      //用户块鼠标事件
      $(".header-user").mouseenter(() => {
        var isLogin = $(".header-user").data("islogin");
        if (!isLogin) {
          $(".header-user-unlogin").addClass("show");
        } else {
          $(".header-user-login").addClass("show");
        }
      })
        .mouseleave(() => {
          $(".header-user-unlogin").removeClass("show");
          $(".header-user-login").removeClass("show");
        })
      /***/

      //为退出登录按钮绑定事件
      $(".loginOut").click(e => {
        e.preventDefault();
        $.get("data/user/loginOut.php")
          .then(() => {
            window.location.reload(true);
          });
      });

      //头部连接下拉列表
      function slideDown(e) {
        var isdown = $(".header-container").data("isdown");
        var $tar = $(e.currentTarget);
        if (!isdown && ($tar.is(".subSource"))) {//未下&是那3个
          $(".header-container").addClass("slideDown");
          $(".header-logo-img").addClass("changeLogo");
          $(".header-link li a").css("color", "#515151");
          $(".header-container").data("isdown", true);
        }
        if (!($tar.is(".subSource"))) {//不是那三个
          slideUp();
        }
        //sub机型列表显示
        if ($tar.is(".subSource")) {//如果是那三个
          switch ($tar.data("name")) {
            case "mx":
              $(".header-sub-mx").show().addClass("sub_show")
                .siblings(".sub_block").removeClass("sub_show").hide();
              break;
            case "meilan":
              $(".header-sub-meilan").show().addClass("sub_show")
                .siblings(".sub_block").removeClass("sub_show").hide();
              break;
            case "accessory":
              $(".header-sub-accessory").show().addClass("sub_show")
                .siblings(".sub_block").removeClass("sub_show").hide();
              break;
          }
        } else {
          $(".sub_block").removeClass("sub_show").hide();
        }
      }

      function slideUp() {
        var isdown = $(".header-container").data("isdown");
        if (isdown) {//已下
          $(".header-container").removeClass("slideDown");
          $(".header-logo-img").removeClass("changeLogo");
          $(".header-link li a").css("color", "#fff");
          $(".header-container").data("isdown", false);
          $(".sub_block").hide();
        }
      }

      $(".header-link").on("mouseenter", "li", e => slideDown(e));
      $(".header-container").mouseleave(slideUp);
      /****/
      /***header感应高度**/
      $("#header").mouseenter(function () {
        $(".header").css("height", 220);
      })
        .mouseleave(function () {
          $(".header").css("height", 82);
        });
    });

});