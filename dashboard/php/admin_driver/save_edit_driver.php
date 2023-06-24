<?php
include '../../core/conn.php';

$ID = $_POST['ID'];

$fname = $_POST['fname'];
$lname = $_POST['lname'];
$phone = $_POST['phone'];
$gender = $_POST['gender'];
$file = $_POST['file'];


$sql = "
  UPDATE
    `driver`
  SET
    `fname`  = '$fname',
    `lname`  = '$lname',
    `phone`  = '$phone',
    `gender` = '$gender',
    `pic`  = '$file'
    
  WHERE
    `ID` = '$ID'

";
if ($con->query($sql) === TRUE) {
    $arr_res = array('st' => '1');
  } else {
    $arr_res = array('st' => '0');
  }
echo json_encode($arr_res);

?>