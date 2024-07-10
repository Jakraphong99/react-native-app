<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connectdb.php';
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$name = $obj['name'];
$email = $obj['email'];
$password = $obj['password'];
$CheckSQL = "SELECT * FROM user WHERE email='$email'";
$check = mysqli_fetch_array(mysqli_query($dbcon, $CheckSQL));
if (isset($check)) {
    $EmailExistMSG = 'พบข้อมูลซ้ำ!';
    $EmailExistJson = json_encode($EmailExistMSG);
    echo $EmailExistJson;
} else {
    // Hash the password using MD5
    $hashedPassword = md5($password);
    $Sql_Query = "INSERT INTO user (name,email,password) VALUES ('$name','$email','$hashedPassword')";
    if ($dbcon->query($Sql_Query) === TRUE) {
        $MSG = 'สมัครสมาชิกสำเร็จ';
        $json = json_encode($MSG);
        echo $json;
    } else {
        $ErrorMsg = 'เกิดข้อผิดพลาด';
        $json = json_encode($ErrorMsg);
        echo $json;
    }
}
$dbcon->close();
