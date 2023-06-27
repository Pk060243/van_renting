<?php
include '../../core/conn.php';
date_default_timezone_set('Asia/Bangkok');
$start = $_POST['start'];
$end = $_POST['end'];
$sql = "
SELECT
        *,
        driver.ID as 'driver_id'
    FROM
        `driver`
    LEFT JOIN order_header oh on oh.driver_id = driver.ID AND oh.st != '0'
    WHERE
        driver.`st` in ('1')
        AND oh.date_start NOT BETWEEN '$start' AND '$end'
        AND oh.date_end NOT BETWEEN '$start' AND '$end'

        OR oh.date_start IS NULL;
    ";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));
if(mysqli_num_rows($result) >= 1){
    while ($row = $result->fetch_assoc()) {
        //$row['pic'] = 'data:image/png;base64,'.base64_encode($row['pic']);

        $arr_data[] = $row;
    }
    echo json_encode(array('st' => 1,'data'=> $arr_data));
}else{
    echo json_encode(array('st' => 0,'data'=> 'no data'));
}


?>