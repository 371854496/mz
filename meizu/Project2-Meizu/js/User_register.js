$(() => {
  //加载出现动画
  $("form").addClass("form_slider_down");

  var vailResult = {};
  vailResult.resFun = function () {//表单验结果
    return this.userName && this.upwd1 && this.upwd2 && this.upwdAgain && this.telPhone;
  }
  /****表单验证区域*****/
  !function () {
    /**输入框**/
    var userName = document.getElementById("userName");
    var upwd = document.getElementById("upwd");
    var upwdAgain = document.getElementById("upwdAgain");
    var telPhone = document.getElementById("telphone");

    /**相对应提示**/
    var userNameTips = document.querySelector("div.userName");
    var upwdTips = document.querySelector("div.upwd");
    var upwdAgainTips = document.querySelector("div.upwdAgain");
    var checkTel = document.getElementById("checkTel");

    function showTips(source, tip) {
      /**定义事件绑定函数**/
      source.onfocus = function () {
        tip.style.display = "block";
      }
      source.onblur = function () {
        tip.style.display = "none";
      }
    }

    showTips(userName, userNameTips);//show tips
    showTips(upwd, upwdTips);
    showTips(upwdAgain, upwdAgainTips);

    /***定义正则进行判断*****/
    !function () {
      var userReg = /^([_0-9A-Za-z\u4e00-\u9fa5]){5,25}$/;
      var upwd1 = /^([a-zA-Z0-9!@#$%]){6,20}$/;
      var upwd2 = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,20}$/;
      var telReg = /^\s*1[34578]\d{9}$/;

      /***用户名绑定事件**/
      userName.onkeyup = function () {
        userNameTips.style.display = "none";
        if (userReg.test(this.value)) {
          document.getElementById("checkName")
            .firstElementChild.className = "right";
          vailResult.userName = true;
        } else {
          document.getElementById("checkName")
            .firstElementChild.className = "wrong";
          vailResult.userName = false;
        }
      }

      /***密码框进行事件绑定***/
      upwd.onkeyup = function () {
        if (upwd1.test(this.value)) {
          upwdTips.children[0].firstElementChild.className = "right";
          upwdTips.children[1].firstElementChild.className = "right";
          vailResult.upwd1 = true;
        } else {
          upwdTips.children[0].firstElementChild.className = "wrong";
          upwdTips.children[1].firstElementChild.className = "wrong";
          vailResult.upwd1 = false;
        }
        if (upwd2.test(this.value)) {
          upwdTips.children[2].firstElementChild.className = "right";
          vailResult.upwd2 = true;
        } else {
          upwdTips.children[2].firstElementChild.className = "wrong";
          vailResult.upwd2 = false;
        }
      }

      /***密码输入框确认绑定****/
      upwdAgain.onkeyup = function () {
        if (this.value === upwd.value && this.value != "") {
          upwdAgainTips.children[0].children[0].className = "right";
          vailResult.upwdAgain = true;
        } else {
          upwdAgainTips.children[0].children[0].className = "wrong";
          vailResult.upwdAgain = false;
        }
      }

      /***手机号输入框事件绑定***/
      telPhone.onkeyup = function () {
        if (telReg.test(this.value)) {
          checkTel.children[0].className = "right";
          vailResult.telPhone = true;
        } else {
          checkTel.children[0].className = "wrong";
          vailResult.telPhone = false;
        }
      }
    }();

  }();

  /***定义拖动slider动画***/
  !function () {
    var sliderBlock = document.querySelector("p.slider .sliderBlock");
    var bgColor = document.querySelector("p.slider .bgColor");

    var canMove = false;
    var X;
    sliderBlock.onmousedown = function (e) {
      canMove = true;
      X = e.clientX;
    }
    window.onmouseup = function () {
      canMove = false;
      //终点判断
      if (parseInt(sliderBlock.style.left) >= 270 && vailResult.resFun()) {
        return false;
      }
      bgColor.style.transition = "all 0.5s linear";
      sliderBlock.style.transition = "all 0.5s linear";
      bgColor.style.width = 0;
      sliderBlock.style.left = 0;
    }
    window.onmousemove = function (e) {
      //终点判断
      if (parseInt(sliderBlock.style.left) >= 270 && vailResult.resFun()) {
        sliderBlock.style.left = "270px";
        sliderBlock.innerHTML = "<span class='right' style='position:absolute;top:12px;left:16px;'></span>";

        sliderBlock.parentElement.firstElementChild
          .innerHTML = "验证通过";
        window.onmousemove = null;
        return false;
      }
      if (canMove) {
        bgColor.style.transition = "";
        sliderBlock.style.transition = "";
        var range = (e.clientX - X) <= 0 ? 0 :
          (e.clientX - X) >= 270 ? 270 :
            (e.clientX - X);
        bgColor.style.width = range + "px";
        sliderBlock.style.left = range + "px";
      }
    }

  }();

  /***按钮跳转  请求AJAX**/
  !function () {
    var submitBtn = document.getElementById("submitBtn");
    var sliderBlock = document.querySelector("p.slider .sliderBlock");
    var choose = document.getElementById("choose");
    submitBtn.onclick = function (e) {
      e.preventDefault();
      if (
        parseInt(sliderBlock.style.left) == 270
        && vailResult.resFun()//所有数据验证正确
        && choose.checked
      ) {
        //开始进行AJAX请求
        var uname = document.getElementById("userName").value;
        var upwd = document.getElementById("upwd").value;
        var tel = document.getElementById("telphone").value;
        var xhr = new XMLHttpRequest();
        xhr.open("post", "data/user/user_register.php", true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var resData = xhr.responseText;
            resData = JSON.parse(resData);
            if (resData.ok === 1) {
              alert(uname + "  注册成功！");
              window.location = "User_login.html";
            } else {
              alert(resData.msg);
            }
          }
        };
        var data = "uname=" + uname + "&upwd=" + upwd + "&tel=" + tel;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
      } else {
        alert("请检查您的输入信息！");
      }
    }
  }();
});