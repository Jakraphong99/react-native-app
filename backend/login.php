<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connectdb.php';
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$email = $obj['email'];
$password = $obj['password'];
// Hash the password using MD5
$hashedPassword = md5($password);
$Sql_Query = "SELECT * FROM user WHERE email = '" . $email . "' AND password = '" . $hashedPassword . "'";
$allUsers = mysqli_query($dbcon, $Sql_Query);
if ($allUsers) {
    if (mysqli_num_rows($allUsers) > 0) {
        $all_users = mysqli_fetch_all($allUsers, MYSQLI_ASSOC);
        echo json_encode(["success" => 1, "users" => $all_users]);
    } else {
        echo json_encode(["success" => 0]);
    }
} else {
    echo json_encode([
        "success" => 0, "email" => $email,
        "password" => $password
    ]);
}
