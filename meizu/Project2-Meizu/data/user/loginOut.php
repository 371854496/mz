<?php
  //data/user/loginOut.php
  session_start();
  session_unset();//释放内存
  session_destroy();//删除文件
?>