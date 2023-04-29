<?php
include '../../core/conn.php';

$plate = $_POST['plate'];
$brand = $_POST['brand'];
$model = $_POST['model'];
$color = $_POST['color'];
$seat = $_POST['seat'];
$type = $_POST['type'];
$file = $_POST['file'];
$sql = "
    INSERT INTO `van`(
        `brand`,
        `model`,
        `color`,
        `seat`,
        `plate`,
        `type`,
        `pic`
    )
    VALUES(
        
        '$brand',
        '$model',
        '$color',
        '$seat',
        '$plate',
        '$type',
        '$file'
    );
";
if ($con->query($sql) === TRUE) {
    $arr_res = array('st' => '1');
  } else {
    $arr_res = array('st' => '0');
  }
echo json_encode($arr_res);

?>