$(() => {
  loadPhoneData();
  loadFamilyData();
  loadUseData();
  loadPicData();
  /** 抓取mz_phone表全部数据**/
  function loadPhoneData() {
    $.get("php/getPhoneList.php")
      .then((resData) => {
        var html = "";
        for (var p of resData) {
          html += "<tr>";
          for (var i in p) {
            html += `<td>${p[i]}</td>>`;
          }
          html += `<td>
                  <a href="#" class="btn-modify" data-pid="${p.phone_id}">修改</a>
                  <a href="#" class="btn-delete" data-pid="${p.phone_id}">删除</a>
                 </td>>`;
          html += "</tr>";
        }
        $("#tbody").html(html);
      });
  };

  /**mz_phone表为删除按钮绑定事件**/
  $("#tbody").on("click", ".btn-delete", e => {
    e.preventDefault();
    if (!confirm("确定要删除本条数据？")) {
      return;
    }
    var phone_id = $(e.target).data("pid");
    $.get("php/deletePhoneById.php", {phone_id})
      .then(resData => {
        if (resData.code > 0) {
          /**删除成功**/
          loadPhoneData();
          return;
        }
        else {
          alert(resData.msg);
        }
      });
  });

  /**mz_phone表 修改按钮绑定事件***/
  $("#tbody").on("click", ".btn-modify", e => {
    e.preventDefault();
    $("#modify-wrap").removeClass("slideOutLeft").addClass("slideInRight").show();
    /**设置input值**/
    var $inputs = $("#modify-wrap input");
    var $tds = $(e.target).parent().siblings(":gt(2)");
    for (var i in $inputs) {
      $inputs[i].value = $tds[i].innerText;
    }
    /**pid 自定义属性绑定**/
    var pid = $(e.target).data("pid");
    $("#modify-wrap").data("pid", pid);
  });

  /***修改框中的确认提交***/
  $("#btn-modify-success").click(e => {
    e.preventDefault();
    //非空检测
    var $inputs = $("#modify-wrap input");
    for (var i = 0; i < $inputs.length; i++) {
      if ($inputs[i].value == "") {
        $($inputs[i]).addClass("alert-danger");
        alert("参数不能为空！");
        return;
      } else {
        $($inputs[i]).removeClass("alert-danger");
      }
    }
    var pid = $("#modify-wrap").data("pid");
    //开始发送数据
    $.post("php/updatePhone.php", $("#modify-form").serialize() + "&pid=" + pid)
      .then(resData => {
        if (resData.code > 0) {
          //模拟触发  取消
          $("#btn-modify-danger").trigger("click");
          loadPhoneData();
        } else {
          alert(resData.msg);
        }
      });
  });

  /**修改框中的取消**/
  $("#btn-modify-danger").click(e => {
    e.preventDefault();
    $("#modify-wrap").removeClass("slideInRight").addClass("slideOutLeft");
    setTimeout(() => {
      $("#modify-wrap").hide()
    }, 950);
  });

  /**抓取mz_phone_family数据**/
  function loadFamilyData() {
    $.get("php/getPhoneFamilyList.php")
      .then(resData => {
        var html = "";
        for (var item of resData) {
          html += "<tr>"
          for (var key in item) {
            html += `<td>${item[key]}</td>>`;
          }
          html += "</tr>";
        }
        $("#family-tbody").html(html);
      })
  };

  /**抓取mz_use表数据**/
  function loadUseData() {
    $.get("php/getUserList.php")
      .then(resData => {
        var html = "";
        for (var item of resData) {
          html += "<tr>";
          for (var key in item) {
            html += `<td>${item[key]}</td>>`;
          }
          html += "</tr>";
        }
        $("#use-tbody").html(html);
      });
  }

  /**抓取mz_phone_pic表数据**/
  function loadPicData() {
    $.get("php/getPicList.php")
      .then(resData => {
        var html = "";
        for (var item of resData) {
          html += "<tr>";
          for (var key in item) {
            html += `<td>${item[key]}</td>>`;
          }
          html += "</tr>";
        }
        $("#pic-tbody").html(html);
      });
  }

  /** 提交按钮绑定数据*/
  $("#btn-upload").click(e => {
    e.preventDefault();
    var $inputs = $("#my-form input[type=text]");
    /**非空检测**/
    for (var i = 0; i < $inputs.length; i++) {
      if ($inputs[i].value == "") {
        alert("数据不完整，请检查！！！");
        $($inputs[i]).addClass("alert-danger");
        return;
      } else {
        $($inputs[i]).removeClass("alert-danger");
      }
    }
    /**数据trim()处理**/
    for (var i = 0; i < $inputs.length; i++) {
      $inputs[i].value = $inputs[i].value.trim();
    }
    var uploadData = $("#my-form").serialize();
    /**ajax  发送数据**/
    $.post("php/insert_phone.php", uploadData)
      .then(resData => {
        if (resData.code > 0) {
          alert(resData.msg);
          loadPhoneData();
          loadFamilyData();
        } else {
          alert(resData.msg);
        }
      });
  });

  /**清空按钮**/
  $("#btn-clear").click(e => {
    e.preventDefault();
    $("#my-form input[type=text]").val("");
  });

  /**展开或折叠tbody***/
  $(".btn-use-collapse").click(e => {
    e.preventDefault();
    var $target = $(e.target).next();
    if ($target.data("collapse")) {
      $target.css("height", "auto").data("collapse", false);
    }
    else {
      $target.css("height", 38).data("collapse", true);
    }
  });

  /***配色图上传***/
  $("#btn-up-imgs").click(e => {
    e.preventDefault();
    var $inputs = $("#form-upload input[type=text]");
    for (var i = 0; i < $inputs.length; i++) {
      if ($inputs[i].value == "") {
        alert("请填写必要参数！");
        $($inputs[i]).addClass("alert-danger");
        return;
      }
      $($inputs[i]).removeClass("alert-danger");
      $inputs[i].value = $($inputs[i]).val().trim();
    }

    var formData = new FormData();
    formData.append("file[]", $("#file1")[0].files[0]);
    formData.append("file[]", $("#file2")[0].files[0]);
    formData.append("file[]", $("#file3")[0].files[0]);
    formData.append("file[]", $("#file4")[0].files[0]);
    formData.append("pid", $("#upload-pid").val());
    formData.append("color", $("#upload-color").val());

    $.ajax({
      url: "php/upload_file.php",
      type: "POST",
      cache: false,
      data: formData,
      processData: false,
      contentType: false,
      success: (resData => {
        //console.log(resData);
        if (resData.code > 0) {
          alert(resData.msg);
          loadPicData();//刷新
        }
        else {
          alert(resData.msg);
        }
      }),
      error: (err => {
        alert(err);
      })
    })
  });

  /**手机型号详情信息更新**/
  $("#btn-update_detail").click(e => {
    e.preventDefault();
    var pname = $("#update_detail").val().trim();
    if (pname == "") {
      alert("请填写手机型号名！！！");
      return;
    }
    else {
      var formData = new FormData();
      formData.append("zipfile", $("#update_detail_zip")[0].files[0]);
      formData.append("pname", pname);

      $.ajax({
        url: "php/updateDetailsByPname.php",
        type: "POST",
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
        success: (resData => {
          //console.log(resData);
          if (resData.code > 0) {
            alert(resData.msg);
            loadFamilyData();//刷新
          }
          else {
            alert(resData.msg);
          }
        }),
        error: (err => {
          alert(err);
        })
      })
    }
  });
});