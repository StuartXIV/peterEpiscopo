<?php
include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

    $name = $_REQUEST['name'];

    $conn->query("INSERT INTO location (name) VALUES('$name')") or die($mysqli->error);


$data = [$name];

echo json_encode($data);