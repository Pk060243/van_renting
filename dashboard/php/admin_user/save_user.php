<?php
include '../../core/conn.php';

$user = $_POST['user'];
$password = $_POST['password'];
$name = $_POST['name'];
$lastname = $_POST['lastname'];
$role = '1'; // 1 = admin 

$sql = "
INSERT INTO `userid`(
 
  `username`,
  `password`,
  `name`,
  `lastname`,
  `role`
)
VALUES(
 
  '$user',
  '$password',
  '$name',
  '$lastname',
  '$role'
)
";
if ($con->query($sql) === TRUE) {
    $arr_res = array('st' => '1');
  } else {
    $arr_res = array('st' => '0');
  }
echo json_encode($arr_res);

?>