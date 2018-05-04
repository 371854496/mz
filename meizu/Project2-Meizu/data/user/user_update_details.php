<?php
//更新用户uname,tel
require("../init.php");
@$uname=$_REQUEST["uname"];
@$tel=$_REQUEST["tel"];

session_start();
@$uid=$_SESSION["uid"];

if($uname==""||$tel==""||$uid==""){
  echo '{"code":-2,"msg":"信息有误，不能为空！"}';
  exit;
}
$sql="UPDATE mz_user SET uname='$uname',tel='$tel' WHERE uid=$uid";
$result=mysqli_query($conn,$sql);
$row=mysqli_affected_rows($conn);
if($row>0){
  echo '{"code":1,"msg":"用户信息更新成功"}';
}
else{
  echo '{"code":-1,"msg":"用户信息更新失败"}';
}
?>
