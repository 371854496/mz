<?php
  //data/user/user_login.php   用户登录
  require("../init.php");
  @$uname=$_REQUEST["uname"];
  @$upwd=$_REQUEST["upwd"];

  if($uname==""||$upwd==""){
    echo '{"code":-1,"msg":"数据提交不完全"}';
    exit;
  }
  //正则判断
  $unamePattern="/^([_0-9A-Za-z\x{4e00}-\x{9fa5}]){5,25}$/u";
  if(!preg_match($unamePattern,$uname)){
    echo '{"code":-2,"msg":"用户名数据格式不符合要求"}';
    exit;
  }
  $upwdPattern="/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,20}$/";
  if(!preg_match($upwdPattern,$upwd)){
    echo '{"code":-2,"msg":"密码数据格式不符合要求"}';
    exit;
  }
  //查询数据
  $sql="SELECT uid FROM mz_user WHERE uname='$uname' AND upwd=md5('$upwd')";
  $result=mysqli_query($conn,$sql);
  $uid=mysqli_fetch_row($result)[0];
  if($uid!==null){
    session_start();
    $_SESSION["uid"]=$uid;
    $ip=$_SERVER["REMOTE_ADDR"];
    $sql="INSERT INTO t_log VALUES(NULL,$uid,now(),'登录 $ip')";
    mysqli_query($conn,$sql);
    echo '{"code":1,"msg":"用户登录成功"}';
  }else{
    echo '{"code":-3,"msg":"用户名或密码错误"}';
  }
?>