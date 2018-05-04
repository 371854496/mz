<?php
  //更新用户头像功能
  require("../init.php");
  session_start();
  @$uid=$_SESSION["uid"];
  @$avatar_data=$_REQUEST["avatar_data"];

  if($uid==""||$avatar_data==""){
    echo '{"code":-1,"msg":"所需要的参数信息不完全！"}';
    exit;
  }

  $sql="UPDATE mz_user SET avatar='$avatar_data' WHERE uid=$uid";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_affected_rows($conn);
  if($row>0){
    echo '{"code":1,"msg":"头像数据更新成功！"}';
  }
  else{
    echo '{"code":-2,"msg":"头像数据更新失败！"}';
  }

?>