<?php
include '../../core/conn.php';

$fname = $_POST['fname'];
$lname = $_POST['lname'];
$phone = $_POST['phone'];
$gender = $_POST['gender'];
$file = $_POST['file'];
$sql = "
  INSERT INTO `driver`(
    `fname`,
    `lname`,
    `phone`,
    `gender`,
    `pic`,
    `st`
  )
  VALUES(
    '$fname',
    '$lname',
    '$phone',
    '$gender',
    '$file',
    '1'
  )
";
if ($con->query($sql) === TRUE) {
    $arr_res = array('st' => '1');
  } else {
    $arr_res = array('st' => '0');
  }
echo json_encode($arr_res);

?>