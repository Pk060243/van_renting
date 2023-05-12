<?php
include '../../core/conn.php';

$sql = "
    SELECT * from driver;
";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));
while ($row = $result->fetch_assoc()) {
    $row['pic'] = base64_encode($row['pic']);
    $arr_data[] = $row;
}
echo json_encode($arr_data);

?>