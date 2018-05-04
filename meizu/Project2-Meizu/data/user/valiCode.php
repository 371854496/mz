<?php
  header("Content-Type:application/json;charset=utf-8");
  session_start();
  @$code=$_SESSION["code"];
  @$ucode=$_REQUEST["ucode"];
  $ucode=strtolower($ucode);
  if($ucode==$code){
    echo '{"code":1,"msg":"验证码正确"}';
  }
  else{
    echo '{"code":-1,"msg":"验证码错误"}';
  }
?>