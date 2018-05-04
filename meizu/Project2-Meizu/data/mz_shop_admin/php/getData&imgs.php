<?php
  require("../../init.php");
  $sql="SELECT phone_family_id AS fid,title,subtitle,price,spec FROM mz_phone GROUP BY phone_family_id";
  $data=mysqli_fetch_all(mysqli_query($conn,$sql),1);

  //fid  max
  $sql="SELECT MAX(fid) FROM mz_phone_family";
  $maxFid=mysqli_fetch_row(mysqli_query($conn,$sql))[0];

  $imgs=[];
  //循环追加
  for($fid=1;$fid<=$maxFid;$fid++){
    $sql="SELECT color,img1 FROM mz_phone_pic WHERE fid=$fid GROUP BY color";
    $rows=mysqli_fetch_all(mysqli_query($conn,$sql),1);
    if($rows!=null){
      $imgs[]=$rows;
    }
  }
  for($i=0;$i<count($data);$i++){
    $data[$i]["color_imgs"]=$imgs[$i];
  }
  //输出
  echo json_encode($data);
?>