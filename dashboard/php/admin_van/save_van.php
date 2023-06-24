<?php
include '../../core/conn.php';

$plate = $_POST['plate'];
$brand = $_POST['brand'];
$model = $_POST['model'];
$color = $_POST['color'];
$seat = $_POST['seat'];
$type = $_POST['type'];
$file = $_POST['file'];
$picf = $_POST['picf'];
$picl = $_POST['picl'];
$picr = $_POST['picr'];
$picb = $_POST['picb'];
$sql = "
    INSERT INTO `van`(
        `brand`,
        `model`,
        `color`,
        `seat`,
        `plate`,
        `type`,
        `pic`,
        `picf`,
        `picl`,
        `picr`,
        `picb`
    )
    VALUES(
        
        '$brand',
        '$model',
        '$color',
        '$seat',
        '$plate',
        '$type',
        '$file',
        '$picf',
        '$picl',
        '$picr',
        '$picb'
    );
";
if ($con->query($sql) === TRUE) {
    $arr_res = array('st' => '1');
  } else {
    $arr_res = array('st' => '0');
  }
echo json_encode($arr_res);

?>