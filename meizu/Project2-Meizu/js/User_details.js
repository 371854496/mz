/***用户账户管理页面***/
$(() => {
  //加载登录用户的 个人信息
  function loadPersonInfo() {
    $.get("data/user/isLogin.php")
      .then(resData => {
        if (resData.code > 0) {
          $(".loginWrap .uname").html(resData.data.uname);//头部用户名
          //个人资料区
          $("#person_info_uname").html(resData.data.uname);
          $("#person_info_tel").html(resData.data.tel);
          //个人资料修改框
          $("#info_input_uname").val(resData.data.uname);
          $("#info_input_tel").val(resData.data.tel);
          //个人头像
          $.get("data/user/load_user_avatar.php").then((resData) => {
            if (resData.code > 0) {
              if (resData.data != "default") {
                $("div.avatar").css("background-image", `url(${resData.data})`);
              }
            } else {
              alert(resData.msg);
            }
          })
        }
        else {
          alert("没有登录请先登录！");
          window.location = "User_login.html";
        }
      });
  }

  loadPersonInfo();
  //用户退出点击
  $("#loginOut").click(e => {
    e.preventDefault();
    $.get("data/user/loginOut.php");
    window.location = "../HOME.html";
  });

  //个人资料框弹出
  $("#btn_info_edit").click(e => {
    e.preventDefault();
    $(".person_info_modify").show().removeClass("bounceOutUp").addClass("bounceInUp");
  });
  //个人资料框弹回
  $("#info_cancer").click(e => {
    e.preventDefault();
    $(".person_info_modify").removeClass("bounceInUp").addClass("bounceOutUp");
  });

  //修改密码框出现
  $("#btn_upwd_edit").click(e => {
    e.preventDefault();
    $(".upwd_info_modify").show().removeClass("zoomOutLeft").addClass("zoomInRight");
    $(".upwd_info_modify input").val("").css("border-color", "");
  });
  //修改密码框消失
  $("#upwd_cancer").click(e => {
    e.preventDefault();
    $(".upwd_info_modify").removeClass("zoomInRight").addClass("zoomOutLeft");
  });

  //个人资料框---input blur数据验证
  $("#info_input_uname").blur(function () {
    var val = $(this).val();
    var unameReg = /^([_0-9A-Za-z\u4e00-\u9fa5]){5,25}$/;
    if (unameReg.test(val)) {
      $(this).css("border-color", "");
    }
    else {
      $(this).css("border-color", "red");
    }
  });

  $("#info_input_tel").blur(function () {
    var val = $(this).val();
    var telReg = /^\s*1[34578]\d{9}$/;
    if (telReg.test(val)) {
      $(this).css("border-color", "");
    }
    else {
      $(this).css("border-color", "red");
    }
  });
  //个人信息框确定按钮
  var timer;
  $("#info_certain").click(function (e) {
      e.preventDefault();
      var unameReg = /^([_0-9A-Za-z\u4e00-\u9fa5]){5,25}$/;
      var telReg = /^\s*1[34578]\d{9}$/;
      var uname = $("#info_input_uname").val();
      var tel = $("#info_input_tel").val();
      if (unameReg.test(uname) && telReg.test(tel)) {
        //开始进行用户数据更新
        $.post("data/user/user_update_details.php", {uname, tel})
          .then(resData => {
            if (resData.code > 0) {
              //框回去
              $(".person_info_modify").removeClass("bounceInUp")
                .addClass("bounceOutUp");
              //重新抓取用户数据
              loadPersonInfo();
            }
            else {
              alert(resData.msg);
            }
          });
      } else {
        $(".person_info_modify").removeClass("shake bounceInUp");
        clearTimeout(timer);
        timer = setTimeout(function () {
          $(".person_info_modify").addClass("shake");
        }, 100)
      }
    }
  )

  //修改密码框数据blur验证
  $("#origin_upwd,#new_upwd,#certain_new_upwd").blur(e => {
    var $tar = $(e.target);
    var val = $tar.val();
    var upwdReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,20}$/;
    if (upwdReg.test(val)) {
      $tar.css("border-color", "");
    } else {
      $tar.css("border-color", "red");
    }
  });

  //密码修改框  确定按钮
  var timer2;
  $("#upwd_certain").click(e => {
    e.preventDefault();
    var origin_upwd = $("#origin_upwd").val();
    var new_upwd = $("#new_upwd").val();
    var certain_new_upwd = $("#certain_new_upwd").val();
    //新密码 !== 确认密码
    if (new_upwd !== certain_new_upwd) {
      $("#new_upwd,#certain_new_upwd").css("border-color", "red");
      $(".upwd_info_modify").removeClass("bounce zoomInRight");
      clearTimeout(timer2);
      timer2 = setTimeout(function () {
        $(".upwd_info_modify").addClass("bounce");
      }, 100);
      return false;
    } else {
      $("#new_upwd,#certain_new_upwd").css("border-color", "");
    }

    var upwdReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,20}$/;
    if (upwdReg.test(origin_upwd)
      && upwdReg.test(new_upwd)
      && upwdReg.test(certain_new_upwd)) {
      //发送密码数据
      $.post("data/user/user_update_upwd.php", {origin_upwd, new_upwd, certain_new_upwd})
        .then(resData => {
          if (resData.code > 0) {
            alert("用户密码更新成功！");
            $(".upwd_info_modify").removeClass("zoomInRight").addClass("zoomOutLeft");
          }
          else {
            alert(resData.msg);
          }
        });
    }
    else {//红框  shake
      $(".upwd_info_modify").removeClass("bounce zoomInRight");
      clearTimeout(timer2);
      timer2 = setTimeout(function () {
        $(".upwd_info_modify").addClass("bounce");
      }, 100)
    }
  });

  /****头像上传图像裁剪插件*****/
  var clipResult = {};
  var clipArea = null;
  var clipArea = new bjj.PhotoClip("#clipArea", {
    size: [300, 300],
    outputSize: [300, 300],
    file: "#file",
    view: "#view",
    ok: "#clipBtn",
    loadStart: function () {
      // console.log("照片读取中");
    },
    loadComplete: function () {
      // console.log("照片读取完成");
    },
    loadError: function () {
      alert("图像加载失败，请重试！");
      clipResult.ok = false;
    },
    clipFinish: function (dataURL) {
      //console.log(dataURL);
      clipResult.ok = true;
      clipResult.dataURL = dataURL;
    }
  });

  /****头像编辑点击***/
  $(".edit_avatar").click(function (e) {
    e.preventDefault();
    $(".main").addClass("blur");
    $(".mask").show().removeClass("zoomOut").addClass("zoomIn");
  });

  /***mask .click_out上传框点击 消失**/
  $(".click_out").click(function (e) {
    e.preventDefault();
    $(".mask").removeClass("zoomIn").addClass("zoomOut");
    setTimeout(() => {
      $(".mask").hide();
    }, 800);
    $(".main").removeClass("blur");
  });


  /**头像提交按钮**/
  $("#submitBtn").click(e => {
    e.preventDefault();

    if (clipResult.ok === true && clipResult.dataURL) {
      $.post("data/user/user_update_avatar.php", {avatar_data: clipResult.dataURL})
        .then(resData => {
          if (resData.code > 0) {
            alert("头像更新成功！");
            loadPersonInfo();
          } else {
            alert(resData.msg);
          }
        });
    } else {
      alert("未进行图片裁剪！");
    }
  });

});