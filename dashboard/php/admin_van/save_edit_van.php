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
$picf = $_POST['picf'];
$picl = $_POST['picl'];
$picr = $_POST['picr'];
$picb = $_POST['picb'];
$inp_remark = $_POST['inp_remark'];

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
    `pic` = '$pic',
    `picf` = '$picf',
    `picl` = '$picl',
    `picr` = '$picr',
    `picb` = '$picb',
    remark = '$inp_remark' 
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