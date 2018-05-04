<?php
  //接受客户端传回的phone数据  insert into mz_phone表
  require("../../init.php");
  @$phone_family_id=$_REQUEST["phone_family_id"];
  @$pname=$_REQUEST["pname"];
  @$title=$_REQUEST["title"];
  @$subtitle=$_REQUEST["subtitle"];
  @$price=$_REQUEST["price"];
  @$spec=$_REQUEST["spec"];
  @$color=$_REQUEST["color"];

  if($phone_family_id==""||$pname==""||$title==""||$subtitle==""||$price==""||$spec==""){
    echo '{"code":-1,"msg":"信息不完全，请检查！！！"}';
    exit;
  }
  //检查手机family表  最大fid  新添加的产品fid大就新增
  $sql="SELECT MAX(fid) FROM mz_phone_family ";
  $max_fid=mysqli_fetch_row(mysqli_query($conn,$sql))[0];
  if($phone_family_id>$max_fid){
    $sql="INSERT INTO mz_phone_family VALUES(NULL,'$pname','')";
    mysqli_query($conn,$sql);
    $row=mysqli_affected_rows($conn);
    if($row==0){
      echo '{"code":-3,"msg":"插入mz_phone_family数据错误！"}';
      exit;
    }
  }
  //echo $max_fid;
  //exit;
  //插入phone数据
  $sql="INSERT INTO mz_phone VALUES (NULL,$phone_family_id,'$pname','$title','$subtitle',$price,'$spec','全网通公开版','$color',100,0)";
  mysqli_query($conn,$sql);
  $rows=mysqli_affected_rows($conn);
  if($rows===1){
    echo '{"code":1,"msg":"一条手机数据插入成功！"}';
  }else{
    echo '{"code":-2,"msg":"手机数据插入失败，请检查数据是否合法！！！"}';
  }
?>