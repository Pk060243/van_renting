<?php
include '../../function/conn.php';

$sql = "
SELECT `ID`, `brand`, `model`, `color`, `seat`, `plate`, `type`, `pic` FROM `van` WHERE `st` != 0;
";

$result = mysqli_query($con, $sql) or die(mysqli_error($con));
if(mysqli_num_rows($result) >= 1){
    while ($row = $result->fetch_assoc()) {
        $row['pic'] = base64_encode($row['pic']);

        $arr_data[] = $row;
    }
    echo json_encode(array('st' => 1,'data'=> $arr_data));
}else{
    echo json_encode(array('st' => 0,'data'=> 'no data'));
}
?>