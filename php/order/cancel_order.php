<?php



include '../../function/conn.php';

$ID = $_POST['ID'];
$sql = "
    UPDATE `order_header` SET `st` = '0' where `ID` = '$ID';
";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

$arr_data = array('st'=> '1');
echo json_encode($arr_data);

?>