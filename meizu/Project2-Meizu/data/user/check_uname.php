<?php
  //data/user/check_uname.php   检查用户名是否存在
  require("../init.php");
  @$uname=$_REQUEST["uname"];

  $unameReg="/^([_0-9A-Za-z\x{4e00}-\x{9fa5}]){5,25}$/u";
  if(!preg_match($unameReg,$uname)){
    echo '{"code":-1,"msg":"用户名数据格式不符合要求！"}';
    exit;
  }
  $sql="SELECT uname FROM mz_user WHERE uname='$uname'";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  if($row){
    echo '{"code":1,"msg":"用户名存在"}';
  }
  else{
    echo '{"code":-2,"msg":"用户名查询不存在！"}';
  }
?>