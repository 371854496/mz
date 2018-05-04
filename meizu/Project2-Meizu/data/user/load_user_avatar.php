<?php
  //加载用户头像数据
  require("../init.php");
  session_start();
  @$uid=$_SESSION["uid"];

  if($uid==""){
  echo '{"code":-1,"msg":"所需要的参数信息不完全！"}';
  exit;
  }

  $sql="SELECT avatar FROM mz_user WHERE uid=$uid";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result)[0];
  if($row){
  echo json_encode(["code"=>1,"data"=>$row]);
  }
  else{
  echo '{"code":-2,"msg":"查询头像数据失败！"}';
  }
?>