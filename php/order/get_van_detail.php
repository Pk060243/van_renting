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
        price.price
    FROM
        `van`
    LEFT JOIN price ON price.type_van = van.type
    WHERE van.`ID` = '$ID';
";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));
while ($row = $result->fetch_assoc()) {
    $arr_data[] = $row;
}
echo json_encode($arr_data);

?>