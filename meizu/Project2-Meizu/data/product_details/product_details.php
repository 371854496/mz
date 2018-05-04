<?php
require("../init.php");
@$fid=$_REQUEST["fid"];
if($fid==""){
    echo '{"code":-1,"msg":"参数有误"}';
    exit;
 }
@$color=$_REQUEST["color"];
//1.获取手机数据
if($color==""){
    $sql2="SELECT pname,title,subtitle,price,spec,color FROM mz_phone WHERE phone_family_id=$fid GROUP BY phone_family_id LIMIT 1";
}else{
    $sql2="SELECT pname,title,subtitle,price,spec,color FROM mz_phone WHERE phone_family_id=$fid AND color='$color'";
}
$result=mysqli_query($conn,$sql2);
$data=mysqli_fetch_all($result,1);

//2.获取详情大图
$sql="SELECT * FROM mz_phone_family WHERE fid=$fid";
$result=mysqli_query($conn,$sql);
$rows1=mysqli_fetch_all($result,1);
//var_dump($rows);
$output=[];

//3.获取图片
if($color==""){
    $sql3="SELECT img1,img2,img3,img4 FROM mz_phone_pic WHERE fid=$fid GROUP BY phone_id LIMIT 1";
}else{
    $sql3="SELECT img1,img2,img3,img4 FROM mz_phone_pic WHERE fid=$fid AND color='$color'";
}
$result=mysqli_query($conn,$sql3);
$imgs=mysqli_fetch_all($result,1);
$sql4="SELECT color,img1 FROM mz_phone_pic WHERE fid=$fid";
$result=mysqli_query($conn,$sql4);
$colsm=mysqli_fetch_all($result,1);
//4.推荐页面参数
$sql5="SELECT img1 FROM mz_phone_pic WHERE fid !=$fid LIMIT 10";
$result=mysqli_query($conn,$sql5);
$img=mysqli_fetch_all($result,1);
$sql6="SELECT phone_family_id,title,subtitle,price,color FROM mz_phone WHERE phone_family_id !=$fid GROUP BY phone_family_id LIMIT 10 ";
$result=mysqli_query($conn,$sql6);
$recom=mysqli_fetch_all($result,1);

$output=[
    "fid"=>$fid,
    "detail"=>$rows1[0]['detail'],//获取详情大图
    "data"=>$data,
    "imgs"=>$imgs[0],
    "colsm"=>$colsm,
    "recom"=>$recom,
     "recomimg"=>$img
];
echo json_encode($output);