/**
 * Created by WEB on 2018/1/19.
 */
$(() => {
  /**页面加载动画**/
  $(".main_form").addClass("bounceInLf");

  /***表单验证***/
  var formValiResult = {};
  formValiResult.getValiRes = function () {
    return this.uname && this.upwd && true && this.valiCode;
  }
  /**用户名 check**/
  $("#uname").blur(function () {
    var uname = $(this).val();
    $.get("data/user/check_uname.php", {uname: uname})
      .then((resData) => {
        if (resData.code > 0) {
          $(".unameTips").addClass("right").removeClass("wrong");
          formValiResult.uname = true;
        }
        else {
          $(".unameTips").addClass("wrong").removeClass("right");
          formValiResult.uname = false;
          //alert(resData.msg);
        }
      });
  });
  /**密码进行正则判断**/
  $("#upwd").blur(function () {
    var upwd = $(this).val();
    var upwdReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,20}$/;
    if (upwdReg.test(upwd)) {
      $(".upwdTips").addClass("right").removeClass("wrong");
      formValiResult.upwd = true;
    }
    else {
      $(".upwdTips").addClass("wrong").removeClass("right");
      formValiResult.upwd = false;
    }
  });

  /**验证码刷新按钮**/
  $(".valiPic .refresh").click(e => {
    e.preventDefault();
    $(".valiPic img").attr("src", "").attr("src", "data/valiCodeCreate/code.php");
  });
  /**验证码输入验证**/
  $("#valiCode").blur(function () {
    $.get("data/user/valiCode.php", {ucode: $(this).val()})
      .then((resData) => {
        if (resData.code > 0) {
          $(".valiCodeTips").addClass("right").removeClass("wrong");
          formValiResult.valiCode = true;
        }
        else {
          $(".valiCodeTips").addClass("wrong").removeClass("right");
          formValiResult.valiCode = false;
        }
      });
  });


  /**为登录按钮绑定单击事件***/
  $(".login_button").click((e) => {
    e.preventDefault();
    if (formValiResult.getValiRes()) {
      var uname = $("#uname").val();
      var upwd = $("#upwd").val();
      $.post("data/user/user_login.php", {uname, upwd})
        .then((resData) => {
          if (resData.code > 0) {
            alert("登录成功！");
            window.location = "HOME.html";
          }
          else {
            alert(resData.msg);
          }
        });
    }
    else {
      alert("您输入的信息有误或不完全！");
    }
  });
});