<?php
  //data/user/isLogin.php
  require("../init.php");
  session_start();
  @$uid=$_SESSION["uid"];
  if($uid===null){
    echo '{"code":-1,"msg":"用户未登录"}';
  }
  else{
    $sql="SELECT uname,upwd,tel,avatar FROM mz_user WHERE uid=$uid";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,1)[0];
    echo json_encode(["code"=>1,"data"=>$rows]);
  }
?>