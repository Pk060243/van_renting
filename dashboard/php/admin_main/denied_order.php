<?php
include '../../core/conn.php';
date_default_timezone_set('Asia/Bangkok');
$ID = $_POST['ID'];
$sql = "
    UPDATE
        `order_header`
    SET
        `st` = '0'

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