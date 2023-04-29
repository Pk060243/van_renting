<?php
include '../../core/conn.php';

$ID = $_POST['ID'];
$sql = "
    SELECT * FROM `van` WHERE `ID` = '$ID';
";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));
while ($row = $result->fetch_assoc()) {
    $row['pic'] = 'data:image/png;base64,'.base64_encode($row['pic']);

    $arr_data = $row;
}
echo json_encode($arr_data);

?>