<?php

include '../../function/conn.php';
session_start();
$ID = $_POST['ID'];
$file = $_POST['file'];

$sql = "
    UPDATE
        `order_header`
    SET
        `payment_pic` = '$file',
        `st` = '3'
    WHERE
        `ID` = '$ID';
";
if ($con->query($sql) === TRUE) {
    $arr_res = array('st' => '1');
  } else {
    $arr_res = array('st' => '0');
  }
echo json_encode($arr_res);

?>