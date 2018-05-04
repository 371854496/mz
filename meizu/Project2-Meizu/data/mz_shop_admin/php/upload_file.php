<?php
  require("../../init.php");
  @$files=$_FILES["file"];

  @$pid=$_REQUEST["pid"];
  @$color=$_REQUEST["color"];

  //检测是否有文件
  if($files==null){
    echo '{"code":-1,"msg":"请选择文件进行上传！！!"}';
    exit;
  }
  //检测是否为图片
  $imgArr=["image/jpeg", "image/jpeg", "image/png", "image/gif"];
  for($i=0;$i<count($files["name"]);$i++){
    if(!in_array($files["type"][$i],$imgArr)){
      echo '{"code":-1,"msg":"请不要上传非图片文件！！"}';
      exit;
    }
  }
  //必要参数检测
  if($color==""||$pid==""){
    echo '{"code":-1,"msg":"请填写必要参数！！!"}';
    exit;
  }
  //抓取对应手机数据
  $sql="SELECT * FROM mz_phone WHERE phone_id=$pid";
  $phone=mysqli_fetch_all(mysqli_query($conn,$sql),1)[0];
  $fid=$phone["phone_family_id"];
  $pname=$phone["pname"];
  $color_cn=$phone["color"];

  $path="../../../imgs/phone/$pname/lg/$color/";
  //创建文件路径
  if(!file_exists($path)){
    mkdir($path,0777,true);
  }
  //移动上传的文件
  if(!empty($files["name"])){
    $sql="INSERT INTO mz_phone_pic VALUES(NULL,$pid,$fid,'$color_cn' ";
     for($i=1;$i<=4;$i++){
        //有几个图片
        if(count($files["name"])>=$i){
          $result=move_uploaded_file($files["tmp_name"][$i-1],$path.$i.".png");
            if(!$result){
              //移动图片出错
              echo '{"code":-1,"msg":"移动文件出现故障,请检查！！!"}';
              exit;
            }
            else{
              $sql.=",'imgs/phone/$pname/lg/$color/$i.png'";
            }
        }
        else{
          $sql.=",'' ";
        }
     }
     $sql.=")";
     //echo $sql;
     //exit;
     $result=mysqli_query($conn,$sql);
     $rows=mysqli_affected_rows($conn);
     if($rows>0){
        echo '{"code":1,"msg":"图片数据与文件放置插入成功！！！"}';
        //创建detail文件夹
        $path = "../../../imgs/phone/$pname/detail/";
        if(!file_exists($path)){
          mkdir($path,0777,true);
        }
     }
     else{
        echo '{"code":-1,"msg":"图片数据插入数据库失败，请检查fid pid！！！"}';
     }
  }
?>