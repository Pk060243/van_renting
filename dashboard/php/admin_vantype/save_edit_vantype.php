<?php
include '../../core/conn.php';

$ID = $_POST['ID'];
$typename = $_POST['typename'];


$sql = "
UPDATE
    `van_type`
SET
    
    `type_name` = '$typename'
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