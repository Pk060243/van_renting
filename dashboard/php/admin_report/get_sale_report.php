<?php
include '../../core/conn.php';

$sql = "
    SELECT
        *,
        order_header.st as 'order_st'
    FROM
        `order_header`
    LEFT JOIN van on van.ID = order_header.van_id
    LEFT JOIN driver on driver.ID = order_header.driver_id
    LEFT JOIN userid on userid.ID = order_header.customer_id
    LEFT JOIN customer_detail on customer_detail.user_id = userid.ID
    LEFT JOIN van_type on van_type.ID = van.type
    WHERE
    1
";
if ($_POST['st_approve'] == '1' && $_POST['st_rej'] == '1') {
    
}else{
    if ($_POST['st_approve'] == '1') {
        $sql .= "AND order_header.st = '1'";
    }else if ($_POST['st_rej'] == '1') {
        $sql .= "AND order_header.st = '0'";
    }
}


$date_from = $_POST['date_from'];
$date_to = $_POST['date_to'];

if ($_POST['date_to'] != '') {
    if ($_POST['date_from'] != '') {
        $start_date = DateTime::createFromFormat('d/m/Y', $date_from);
        $formattedDate = $start_date->format('Y-m-d');
        $date_from = $formattedDate;


        $end_date = DateTime::createFromFormat('d/m/Y', $date_to);
        $formattedDate = $end_date->format('Y-m-d');
        $date_to = $formattedDate;
        $sql .= "AND order_header.order_date BETWEEN  '$date_from' and  '$date_to'";
    }
}else{
    if ($_POST['date_from'] != '') {
        
        $start_date = DateTime::createFromFormat('d/m/Y', $date_from);
        $formattedDate = $start_date->format('Y-m-d');
        $date_from = $formattedDate;
        $sql .= "AND order_header.order_date BETWEEN  '$date_from' and  '$date_from'";
    }
}

$result = mysqli_query($con, $sql) or die(mysqli_error($con));
if(mysqli_num_rows($result) >= 1){
    while ($row = $result->fetch_assoc()) {
        $row['pic'] = 'data:image/png;base64,'.base64_encode($row['pic']);
        $row['id_card_pic'] = 'data:image/png;base64,'.base64_encode($row['id_card_pic']);

        $arr_data[] = $row;
    }
    echo json_encode(array('st' => 1,'data'=> $arr_data));
}else{
    echo json_encode(array('st' => 0,'data'=> 'no data'));
}


?>