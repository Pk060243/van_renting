<?php
include '../../core/conn.php';

$ID = $_POST['ID'];
$plate = $_POST['plate'];
$brand = $_POST['brand'];
$model = $_POST['model'];
$color = $_POST['color'];
$seat = $_POST['seat'];
$type = $_POST['type'];
$pic = $_POST['pic'];


$sql = "
  UPDATE
    `van`
  SET
    `brand` = '$brand',
    `model` = '$model',
    `color` = '$color',
    `seat` = '$seat',
    `plate` = '$plate',
    `type` = '$type',
    `pic` = '$pic'
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