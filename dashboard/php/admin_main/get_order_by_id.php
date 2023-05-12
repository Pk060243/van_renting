<?php
include '../../core/conn.php';
date_default_timezone_set('Asia/Bangkok');
$ID = $_POST['ID'];
$sql = "
    SELECT
        order_header.`ID` as 'order_id',
        `order_number`,
        `order_date`,
        `customer_id`,
        `van_id`,
        `driver_id`,
        `price`,
        `date_start`,
        `date_end`,
        `st`,
        `payment_type`,
        `payment_pic`,
        CONCAT(cd.Fname,' ',cd.Lname) as 'customer_full_name',
        cd.phone,
        order_header.st as 'order_st'
    FROM
        `order_header`
    JOIN customer_detail cd on cd.user_id = order_header.customer_id
    WHERE
        1
        AND order_header.ID = '$ID'
    ORDER BY order_header.st DESC limit 1
    ";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));
if(mysqli_num_rows($result) >= 1){
    while ($row = $result->fetch_assoc()) {
        $arr_data = $row;
    }
    echo json_encode(array('st' => 1,'data'=> $arr_data));
}else{
    echo json_encode(array('st' => 0,'data'=> 'no data'));
}


?>