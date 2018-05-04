<?php
  //用户更新密码操作
  require("../init.php");
  @$origin_upwd=$_REQUEST["origin_upwd"];
  @$new_upwd=$_REQUEST["new_upwd"];
  @$certain_new_upwd=$_REQUEST["certain_new_upwd"];
  session_start();
  @$uid=$_SESSION["uid"];

  if($origin_upwd==""||$new_upwd==""||$certain_new_upwd==""||$uid==""){
    echo '{"code":-1,"msg":"输入的参数不完全！"}';
    exit;
  }

  if($new_upwd!==$certain_new_upwd){
    echo '{"code":-2,"msg":"新密码两次输入不一致！"}';
    exit;
  }
  //对原密码进行验证
  $sql="SELECT uname FROM mz_user WHERE uid=$uid AND upwd=md5('$origin_upwd')";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  if($row!=null){
    //echo '{"code":1,"msg":"原密码ok！"}';
    $sql="UPDATE mz_user SET upwd=md5('$new_upwd') WHERE uid=$uid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_affected_rows($conn);
    if($row>0){
      echo '{"code":1,"msg":"用户密码更新成功！"}';
    }else{
      echo '{"code":-5,"msg":"用户密码更新失败！"}';
    }
  }else{
    echo '{"code":-3,"msg":"原密码输入错误！"}';
    exit;
  }
?>