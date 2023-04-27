<?php
include '../../core/conn.php';

$ID = $_POST['ID'];
$name = $_POST['name'];
$price = $_POST['price'];
$type = $_POST['type'];


$sql = "
  UPDATE
    `price`
  SET
    `price_name` = '$name',
    `price` = '$price',
    `type_van` = '$type'
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