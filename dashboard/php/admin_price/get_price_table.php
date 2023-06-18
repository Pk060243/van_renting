<?php
include '../../core/conn.php';

$sql = "
    SELECT
        price.`ID`,
        price.`price_name`,
        price.`price`,
        price.`type_van`,
        van_type.type_name
    FROM
        `price`
    LEFT JOIN van_type ON price.type_van = van_type.ID ORDER BY type_van;
";
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