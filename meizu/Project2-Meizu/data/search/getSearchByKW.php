<?php
  require("../init.php");
  @$kw=$_REQUEST["kw"];
  @$price_min=$_REQUEST["price_min"];//最小价格
  @$price_max=$_REQUEST["price_max"];//最高价格
  @$sort_price=$_REQUEST["sort_price"];//价格排序
  //@$sort_new=$_REQUEST["sort_new"];//新品排序
  //@$sort_hot=$_REQUEST["sort_hot"];//热销排序
  if($price_min==""){
    $price_min=0;
  }
  if($price_max==""){
    $price_max=2100000;
  }

  $sql="SELECT phone_family_id AS fid,title,subtitle,price,spec FROM mz_phone WHERE true ";
  //处理关键字
  if($kw!=""){
    //将$kw按空格切开为数组$kws
    $kws=explode(" ",$kw);
    for($i=0;$i<count($kws);$i++){//遍历$kws
      //将$kws中当前位置的关键词替换为title like '%...%'
      $kws[$i]=" title LIKE '%$kws[$i]%' ";
    }
      //将$kws用" and "连接为一个条件字符串$where
    $where=implode(" AND ",$kws);
    $sql.=" AND $where ";
  }

  //价格
  $sql.=" AND price>=$price_min ";
  $sql.=" AND price<=$price_max ";
  $sql.=" GROUP BY phone_family_id ";

  //排序
  if($sort_price==1){
    $sql.=" ORDER BY price";//升序
  }
  else if($sort_price==-1){
    $sql.=" ORDER BY price desc";//降序
  }
//  if($sort_new==-1){
//      $sql.=" order by title";
//  }else if($sort_new==1){
//      $sql.=" order by title desc";
//  }
//  if($sort_hot==1){
//      $sql.=" order by phone_family_id";
//  }else if($sort_hot==-1){
//      $sql.=" order by phone_family_id desc";
//  }
  $result=mysqli_query($conn,$sql);
  $data=mysqli_fetch_all($result,1);//手机参数

  //函数  fid===>多配色图
  function getColors_img1($index,$conn){
    $sql="SELECT color,img1 FROM mz_phone_pic WHERE fid=$index GROUP BY color";
    $rows=mysqli_fetch_all(mysqli_query($conn,$sql),1);
    if($rows!=null){
      return $rows;
    }
  }

  //开始循环追加
  for($i=0;$i<count($data);$i++){
    $data[$i]["color_imgs"]=getColors_img1($data[$i]["fid"],$conn);
  }
echo json_encode($data);