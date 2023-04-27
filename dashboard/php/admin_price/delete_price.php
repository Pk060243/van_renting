<?php
include '../../core/conn.php';

$ID = $_POST['ID'];
$sql = "
    DELETE FROM price where `ID` = '$ID';
";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

$arr_data = array('st'=> '1');
echo json_encode($arr_data);

?>