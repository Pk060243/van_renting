<?php
include '../../function/conn.php';

$ID = $_POST['ID'];
$sql = "
    SELECT
        van.`ID` as 'van_id',
        price.`ID` as 'price_id',

        `brand`,
        `model`,
        `color`,
        `seat`,
        `plate`,
        `type`,
        `pic`,
        `st`,
        price.price_name,
        price.price,
        van_type.type_name

    FROM
        `van`
    LEFT JOIN price ON price.type_van = van.type
    LEFT JOIN van_type ON van_type.ID = van.type
    WHERE van.`ID` = '$ID';
";
//van จอยกับ price ตรงที่ ตาราง price ช่อง type_van ต้องเท่ากับ ตาราง van ช่อง type
$result = mysqli_query($con, $sql) or die(mysqli_error($con));
while ($row = $result->fetch_assoc()) {
    $arr_data[] = $row;
}
echo json_encode($arr_data);

?>