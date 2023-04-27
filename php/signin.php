<?php
include '../function/conn.php';

$user = $_POST['User'];
$pass = $_POST['Pass'];
$sql = "SELECT * from userid where `username` = '$user' AND `password` = '$pass'";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    if($row['role'] == '1'){
        $role = 'admin';
    }else if($row['role'] == '2'){
        $role = 'customer';
    }
    session_start();
    $_SESSION['role'] = $role;
    $_SESSION['name'] = $role;
    $_SESSION['lastname'] = $role;

   echo json_encode(array('st' => '1','role' => $role));
  }
} else {
    echo json_encode(array('st' => '0'));
}
?>