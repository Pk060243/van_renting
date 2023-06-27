<?php
include '../../function/conn.php';

$date_from = isset($_POST['date_start']) ? $_POST['date_start'] : '';
$date_to = isset($_POST['date_end']) ? $_POST['date_end'] : '';

if ($date_from != '') {
    $start_date = DateTime::createFromFormat('d/m/Y', $date_from);
    $formattedDate = $start_date->format('Y-m-d');
    $date_from = $formattedDate;
}

if ($date_to != '') {
    $end_date = DateTime::createFromFormat('d/m/Y', $date_to);
    $formattedDate = $end_date->format('Y-m-d');
    $date_to = $formattedDate;
}
if ($date_to != '') {
        
    $sql = "
    SELECT
        `van`.`ID`,
        `brand`,
        `model`,
        `color`,
        `seat`,
        `plate`,
        `type`,
        `pic`
    FROM
        `van`
        LEFT JOIN
        order_header oh ON oh.van_id = van.ID  
    WHERE
    `van`.`st` != 0
    AND (oh.date_start NOT BETWEEN '$date_from' AND '$date_to' OR oh.date_start IS NULL)
    AND (oh.date_end NOT BETWEEN '$date_from' AND '$date_to' OR oh.date_end IS NULL);
    ";
}else{
    
    $sql = "
    SELECT `ID`, `brand`, `model`, `color`, `seat`, `plate`, `type`, `pic` FROM `van` WHERE `st` != 0;
    ";
}



$result = mysqli_query($con, $sql) or die(mysqli_error($con));
if(mysqli_num_rows($result) >= 1){
    while ($row = $result->fetch_assoc()) {
        $arr_data[] = $row;
    }
    echo json_encode(array('st' => 1,'data'=> $arr_data));
}else{
    echo json_encode(array('st' => 0,'data'=> 'no data'));
}
?>