<?php
include '../../core/conn.php';

$name = $_POST['name'];
$price = $_POST['price'];

$type = $_POST['type'];


$sql = "
    INSERT INTO `price`(
      `price_name`,
      `price`,
      `type_van`
    )
    VALUES(
        '$name',
        '$price',
        '$type'
    );
";
if ($con->query($sql) === TRUE) {
    $arr_res = array('st' => '1');
  } else {
    $arr_res = array('st' => '0');
  }
echo json_encode($arr_res);

?>