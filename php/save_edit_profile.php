<?php
    include '../function/conn.php';
    date_default_timezone_set('Asia/Bangkok'); //ตั้งเวลาเป้นประเทศไทย
    session_start();
    $user_id = $_SESSION['ID'];
    $Fname = $_POST['Fname'];
    $Lname = $_POST['Lname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $pic = $_POST['pic'];
    $ID = $_POST['ID'];

    $sql_user_id = "
    UPDATE
        `userid`
    SET
    
        `name` = '$Fname',
        `lastname` = '$Lname'
        
        
       
    WHERE
        ID = '$user_id'
    ";

    if ($con->query($sql_user_id) === TRUE) {
        $last_id = $con->insert_id;
        $arr_res = array('st' => '1');
    } else {
        $arr_res = array('st' => '0');
    }

    $sql_customer_detail = "
    UPDATE
        `customer_detail`
    SET
        `Fname` = '$Fname',
        `Lname` = '$Lname',
        `phone` = '$phone',
        `email` = '$email',
        `id_card_pic` = '$pic'
    WHERE
        `ID` = ' $ID'
    ";
    if ($con->query($sql_customer_detail) === TRUE) {
        $arr_res = array('st' => '1');
    } else {
        $arr_res = array('st' => '0');
    }
    echo json_encode($arr_res);
?>