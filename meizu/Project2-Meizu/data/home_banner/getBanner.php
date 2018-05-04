<?php
  require("../init.php");
  $sql="SELECT img_url FROM mz_home_banner";
  $result=mysqli_query($conn,$sql);
  $rows=mysqli_fetch_all($result,1);
  echo json_encode($rows);
?>