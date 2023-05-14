<?php
include '../../function/conn.php';

$ID = $_POST['ID'];
$sql = "
    SELECT
        order_header.`ID` as 'order_id',
        `order_number`,
        `order_date`,
        `order_time`,
        `customer_id`,
        `van_id`,
        `driver_id`,
        `price`,
        `date_start`,
        `date_end`,
        order_header.`st` as 'order_st',
        `payment_type`,
        `payment_pic`,
        van.*,
        driver.fname as 'driver_name',
        driver.lname as 'driver_lname',
        driver.phone as 'driver_phone'

    FROM
        `order_header`
        JOIN van ON van.ID = order_header.van_id
        LEFT JOIN driver ON driver.ID = order_header.driver_id

        WHERE order_header.`ID` = '$ID';
";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));
while ($row = $result->fetch_assoc()) {
    // $row['payment_pic'] = 'data:image/png;base64,'.base64_encode($row['payment_pic']);
    // $row['pic'] = 'data:image/png;base64,'.base64_encode($row['pic']);

    $arr_data = $row;
}
echo json_encode($arr_data);

?>