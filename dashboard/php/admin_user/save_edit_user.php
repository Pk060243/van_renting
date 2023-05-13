<?php
include '../../core/conn.php';

$ID = $_POST['ID'];
$user = $_POST['user'];
$password = $_POST['password'];
$name = $_POST['name'];
$lastname = $_POST['lastname'];


$sql = "
  UPDATE
    `userid`
  SET
    `username` = '$user',
    `password` = '$password',
    `name` = '$name',
    `lastname` = '$lastname'

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