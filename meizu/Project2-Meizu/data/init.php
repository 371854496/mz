<?php
    //data/init.php
    header("Content-Type:application/json;charset=utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","meizu",3306);
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
?>