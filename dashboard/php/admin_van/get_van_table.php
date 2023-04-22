<?php
include '../../core/conn.php';

$sql = "
    SELECT * from van;
";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));
while ($row = $result->fetch_assoc()) {
    $arr_data[] = $row;
}
echo json_encode($arr_data);

?>