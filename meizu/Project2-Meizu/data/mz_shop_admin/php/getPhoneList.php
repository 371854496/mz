<?php
  require("../../init.php");
  $sql="SELECT phone_id,phone_family_id,pname,title,subtitle,price,spec,network,color FROM mz_phone";
  $result=mysqli_query($conn,$sql);
  $rows=mysqli_fetch_all($result,1);
  if($rows!=null){
    echo json_encode($rows);
  }
  else{
    echo '{"code":-1,"msg":"未查询到任何数据！"}';
  }
?>