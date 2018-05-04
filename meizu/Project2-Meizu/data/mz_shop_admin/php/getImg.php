<?php
  require("../../init.php");
  $sql="SELECT img1,img2,img3,img4 FROM mz_phone_pic";
  $result=mysqli_query($conn,$sql);
  $rows=mysqli_fetch_all($result,1);
  echo json_encode($rows);
?>