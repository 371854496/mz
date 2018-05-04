<?php
  require("../../init.php");
  @$pname=$_REQUEST["pname"];   //手机型号变量
  @$zipfile=$_FILES["zipfile"];
  //检测
  if($pname==""){
    echo '{"code":-3,"msg":"请输入必要参数PNAME"}';
    exit;
  }
//  echo json_encode($zipfile);
//  exit;
  if($zipfile["type"]!="application/zip"){
    echo '{"code":-4,"msg":"请选择zip文件进行上传！"}';
    exit;
  }
  //解压
  $path = "../../../imgs/phone/$pname/detail/";
  $zip = new ZipArchive;//新建一个ZipArchive的对象
  /*
  通过ZipArchive的对象处理zip文件
  $zip->open这个方法的参数表示处理的zip文件名。
  如果对zip文件对象操作成功，$zip->open这个方法会返回TRUE
  */
  if ($zip->open($zipfile["tmp_name"]) === TRUE){
    $zip->extractTo($path);//假设解压缩到文件夹
    $zip->close();//关闭处理的zip文件
  }else{
    echo '{"code":-5,"msg":"zip文件解压失败！"}';
    exit;
  }

  //开始循环写入数据库
  $result=[];
  @$files=scandir($path);//返回索引数组  或NULL
  //echo json_encode($files);
  //exit;
  if($files!=null){
    foreach($files as $file){
      if($file!="."&&$file!=".."&&$file!="Thumbs.db"){
        $result[]="imgs/phone/$pname/detail/$file";
      }
    }
    //更新
    $temp=json_encode($result);
    //echo $temp;
    //exit;
    $sql="UPDATE mz_phone_family SET detail='$temp' WHERE fname='$pname'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_affected_rows($conn);
    if($row>0){
      echo '{"code":1,"msg":"手机detail信息更新成功！"}';
    }
    else{
      echo '{"code":-2,"msg":"手机detail信息更新失败或齐前后数据相同！"}';
    }
  }
  else{
    echo '{"code":-1,"msg":"未在指定的路径下查找到文件！"}';
    exit;
  }

?>