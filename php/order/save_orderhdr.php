<?php
session_start();

if(!isset($_SESSION['ID'])){
    $arr_res = array('st' => '-1');
    echo json_encode($arr_res);
    exit;
}
function get_order_number(){
    include '../../function/conn.php';
    //สร้างหมายเลขการเช่า
    $running_date = date('ym'); //เลือก order ที่ขึ้นต้นด้วย "ปีเดือน Ex. 2301"
    $sql_order_no = "
        SELECT `order_number` from order_header Where order_number like '$running_date%' Order By order_date DESC;
    ";
    $result_order_no = mysqli_query($con, $sql_order_no) or die(mysqli_error($con));
    if($result_order_no->num_rows == 0){ //ถ้าไม่เจอเลขออร์เดอร์ของเดือนนี้ จะสร้างใหม่
        $run_num = '001'; //หมายเลขรัน
        $order_no = date('ym').$run_num; //ตั้งหมายเลขออเดอร์ให้ขึ้นต้นด้วย ปีเดือน ตามด้วยหมายเลขรัน
    }else{ // ถ้าเจอออร์เดอร์ของเดือนนี้ จะเอาเลขท้าย 3 ตัวมารันต่อ
        while ($row = $result_order_no->fetch_assoc()) {
            $order_no = $row['order_number'];
        }
        $run_num = substr($order_no,4,3); // substring เอาเลขท้าย 3 ตัว
        $run_num  =  $run_num + 1; //เลขรัน + 1
        $new_run_num = str_pad($run_num, 3, '0', STR_PAD_LEFT); //กำหนดให้หมายเลขรัน มี 3 หลัก Ex.001 099 999
        $order_no = date('ym').$new_run_num;
    }
    return $order_no;
}




include '../../function/conn.php';

date_default_timezone_set('Asia/Bangkok'); //ตั้งเวลาเป้นประเทศไทย
$van_id = $_POST['van_id'];
$date_from = $_POST['date_from'];
$date_to = $_POST['date_to'];
$pay_type = $_POST['pay_type'];
//หาว่า จาก date_from ถึง date_to มีทั้งหมดกี่วัน

$dateFrom = DateTime::createFromFormat('d/m/Y', $date_from);
$dateTo = DateTime::createFromFormat('d/m/Y', $date_to);
$interval = $dateFrom->diff($dateTo);
$days = $interval->days +1 ;


//ดึงข้อมูลราคา จาก price_id
$sql_price = "
    SELECT
        price
    FROM
        `price`
    JOIN van on van.type = price.type_van

    WHERE 1 AND van.ID = '$van_id'
";
$result_price = mysqli_query($con, $sql_price) or die(mysqli_error($con));
while ($row = $result_price->fetch_assoc()) {
    $price = $row['price'];
}


// แปลง Date_rent จากฟอร์แมต 31/12/2023 ให้เป็น 2023-12-31 เพิ่มเซฟเข้า Database
$start_date = DateTime::createFromFormat('d/m/Y', $date_from);
$formattedDate = $start_date->format('Y-m-d');
$date_from = $formattedDate;

$end_date = DateTime::createFromFormat('d/m/Y', $date_to);
$formattedDate = $end_date->format('Y-m-d');
$date_to = $formattedDate;


//เช็คข้อมูล ว่าวันที่ลูกค้าเลือก ว่างหรือไม่
$sql_ava_date = "
    SELECT 1
        FROM order_header
    WHERE 1
    AND '$date_from' <= date_end 
    AND '$date_to' >= date_start 
    AND van_id = '$van_id'
    AND st != '0' ";
$result_price = mysqli_query($con, $sql_ava_date) or die(mysqli_error($con));
$have_in_order = array();
while ($row = $result_price->fetch_assoc()) {
    $have_in_order = $row;
    // print_r($row);
    // // $sql_ava_date = $row['price'];
}
if(sizeof($have_in_order)){ //เช็คว่า รถคันนี้ ในช่วงเวลานี้ มีคนเช่าแล้วหรือไม่
    $arr_res = array('st' => '0', 'text' => 'รถคันนี้ ถูกเช่าแล้วในช่วงเวลาที่คุณเลือก กรุณาเลือกช่วงเวลาอื่น หรือรถคันอื่น');
    echo json_encode($arr_res);
    exit;
}

$order_no = get_order_number();
$order_date = date('Y-m-d H:m');
$order_time = date('H:m');

$cus_id = $_SESSION['ID'];
$price = ($price * $days);
$sql = "
INSERT INTO `order_header`(
   
    `order_number`,
    `order_date`,
    `order_time`,
    `customer_id`,
    `van_id`,
    `driver_id`,
    `price`,
    `date_start`,
    `date_end`,
    `st`,
    `payment_type`
)
VALUES(
   
    '$order_no',
    '$order_date',
    '$order_time',
    '$cus_id',
    '$van_id',
    '',
    '$price',
    '$date_from',
    '$date_to',
    '2',
    '$pay_type'
)
";
if ($con->query($sql) === TRUE) {
    $arr_res = array('st' => '1');
  } else {
    $arr_res = array('st' => '0');
  }
echo json_encode($arr_res);

?>