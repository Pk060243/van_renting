
<?php

    include '../../core/conn.php';
    session_start();
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $query = "SELECT `ID`, `username`, `password`, `name`, `lastname` FROM `adm_users` WHERE 1 AND username = '$user' and password = '$pass'" ;
    // $query = "SELECT * FROM user where 1" ;

    $result = mysqli_query($con, $query) or die(mysqli_error($con));
    if($result->num_rows === 0)
    {
        $res = array('st'=> '0' , 'msg' => 'No results');
    }else{
        while ($row = mysqli_fetch_array($result)) {
            $_SESSION['name'] = $row['name'];
            $_SESSION['lastname'] = $row['lastname'];
        }
        $res = array('st'=> '1' , 'msg' => '' , 'data' => $_SESSION);
    }
    
    echo json_encode($res)

?>