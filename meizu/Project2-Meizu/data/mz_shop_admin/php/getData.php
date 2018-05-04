<?php
  require("../../init.php");
  $output=[];
  $sql="SELECT * FROM mz_phone GROUP BY phone_family_id";
  $data=mysqli_fetch_all(mysqli_query($conn,$sql),1);
  $output["data"]=$data;

  $sql="SELECT color,img1 FROM mz_phone_pic GROUP BY fid";
  $imgs=mysqli_fetch_all(mysqli_query($conn,$sql),1);
  $output["imgs"]=$imgs;

  echo json_encode($output);
?>