<?php
    include '../../function/conn.php';
    date_default_timezone_set('Asia/Bangkok'); //ตั้งเวลาเป้นประเทศไทย
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $name = $_POST['name'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
   

    $sql_user_id = "
    INSERT INTO `userid`(
        `username`,
        `password`,
        `name`,
        `lastname`,
        `role`
    )
    VALUES(
       
        '$user',
        '$pass',
        '$name',
        '$lname',
        '2'
    )
    ";

    if ($con->query($sql_user_id) === TRUE) {
        $last_id = $con->insert_id;
        $arr_res = array('st' => '1');
    } else {
        $arr_res = array('st' => '0');
    }

    echo $sql_customer_detail = "
    INSERT INTO `customer_detail`(
        
        `user_id`,
        `Fname`,
        `Lname`,
        `phone`,
        `email`
       
    )
    VALUES(
        '$last_id',
        '$name',
        '$lname',
        '$phone',
        '$email'
        
    )
    ";
    if ($con->query($sql_customer_detail) === TRUE) {
        $arr_res = array('st' => '1');
    } else {
        $arr_res = array('st' => '0');
    }
?>