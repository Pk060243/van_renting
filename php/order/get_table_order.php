<?php
include '../../function/conn.php';
session_start();

$cus_id = $_SESSION['ID'];
$sql = "
    SELECT
        *,
        `order_header`.`ID` as 'order_id',
        van.st as 'van_st',
        order_header.st as 'order_st'
    FROM
        `order_header`
    JOIN van ON van.ID = order_header.van_id
    WHERE order_header.customer_id = '$cus_id'
;";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));
while ($row = $result->fetch_assoc()) {
    $arr_data[] = $row;
}
echo json_encode($arr_data);

?>