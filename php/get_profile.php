<?php
include '../function/conn.php';
session_start();

$ID = $_SESSION['ID'];
$sql = "
    SELECT
        `ID`,
        `user_id`,
        `Fname`,
        `Lname`,
        `phone`,
        `email`,
        `id_card_pic`
    FROM
        `customer_detail`
    WHERE
        `user_id` = '$ID'
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