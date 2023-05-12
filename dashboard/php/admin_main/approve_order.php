<?php
include '../../core/conn.php';
date_default_timezone_set('Asia/Bangkok');
$ID = $_POST['ID'];
$driver_id = $_POST['driver_id'];
$sql = "
    UPDATE
        `order_header`
    SET
        `st` = '1',
        `driver_id`= '$driver_id'
    WHERE
        1 AND `ID` = '$ID'
    ";
if ($con->query($sql) === TRUE) {
    $arr_res = array('st' => '1');
    } else {
    $arr_res = array('st' => '0');
    }
echo json_encode($arr_res);

?>