<?php
include '../../core/conn.php';

$type = $_POST['type'];


$sql = "
INSERT INTO `van_type`(
  `type_name`
  )VALUES(
    '$type'
  )
";
if ($con->query($sql) === TRUE) {
    $arr_res = array('st' => '1');
  } else {
    $arr_res = array('st' => '0');
  }
echo json_encode($arr_res);

?>