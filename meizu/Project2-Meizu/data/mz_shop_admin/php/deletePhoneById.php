<?php
  /*删除手机条目 BY phone_id*/
  require("../../init.php");
  @$phone_id=$_REQUEST["phone_id"];
  if($phone_id==""){
    echo '{"code":-1,"msg":"phone_id is required"}';
    exit;
  }

  $sql="DELETE FROM mz_phone WHERE phone_id=$phone_id";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_affected_rows($conn);
  if($row>0){
    echo '{"code":1,"msg":"一条数据删除成功！"}';
  }
  else{
    echo '{"code":-1,"msg":"数据删除失败！"}';
  }
?>