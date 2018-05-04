<?php
  //data/user/user_register.php
  require("../init.php");
  @$uname=$_REQUEST["uname"];
  @$upwd=$_REQUEST["upwd"];
  @$tel=$_REQUEST["tel"];
  @$ip=$_SERVER["REMOTE_ADDR"];

  /**没有数据就退出**/
  if($uname==""||$upwd==""||$tel==""){
    echo '{"ok":-2,"msg":"信息不完全错误"}';
    exit;
  }

  /**定义正则  进行数据的判断**/
  $unameReg="/^([_0-9A-Za-z\x{4e00}-\x{9fa5}]){5,25}$/u";
  $upwdReg="/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,20}$/";
  $telReg="/^\s*1[34578]\d{9}$/";
  if(!preg_match($unameReg,$uname)){
    echo '{"ok":-3,"msg":"用户名格式不合法！"}';
    exit;
  }
  if(!preg_match($upwdReg,$upwd)){
    echo '{"ok":-4,"msg":"密码格式不合法！"}';
    exit;
  }
  if(!preg_match($telReg,$tel)){
    echo '{"ok":-5,"msg":"手机号格式不合法！"}';
    exit;
  }


  $sql="INSERT INTO mz_user VALUES(NULL,'$uname',md5('$upwd'),'$tel','default',now(),'$ip')";
  $result=mysqli_query($conn,$sql);
  /**错误处理**/
//  if(mysqli_error($conn)){
//    echo mysqli_error($conn);
//  }
  if($result){
    echo '{"ok":1,"msg":"新用户注册成功"}';
  }
  else{
    echo '{"ok":-1,"msg":"新用户注册失败"}';
  }
?>