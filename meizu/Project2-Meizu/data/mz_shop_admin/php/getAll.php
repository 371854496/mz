<?php
  require("../../init.php");
  $sql="SELECT * FROM mz_phone";
  $result=mysqli_query($conn,$sql);
  $rows=mysqli_fetch_all($result,1);
  if($rows!=null){
    echo json_encode($rows);
  }
  else{
    echo '{"code":-1,"msg":"未查询到任何数据！"}';
  }
?>