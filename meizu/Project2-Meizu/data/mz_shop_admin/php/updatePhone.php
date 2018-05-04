<?php
  //更新手机资料信息
  require("../../init.php");
  @$pid=$_REQUEST["pid"];
  @$title=$_REQUEST["title"];
  @$subtitle=$_REQUEST["subtitle"];
  @$price=$_REQUEST["price"];
  @$spec=$_REQUEST["spec"];
  @$network=$_REQUEST["network"];

  if($title==""||$subtitle==""||$price==""||$spec==""||$network==""||$pid==""){
    echo '{"code":-1,"msg":"参数不完全！"}';
    exit;
  }

  $sql="UPDATE mz_phone SET title='$title',subtitle='$subtitle',price=$price,spec='$spec',network='$network' WHERE phone_id=$pid ";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_affected_rows($conn);
  if($row>0){
    echo '{"code":1,"msg":"更新成功！"}';
  }
  else{
    echo '{"code":-1,"msg":"数据格式不对或前后数据一致  更新失败！"}';
  }
?>