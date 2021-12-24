<?php

include("config.php");

    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

if (isset($_POST['save'])){
    $name = $_POST['name'];
    $department = $_POST['department'];
    $phone = $_POST['phone'];

    $conn->query("INSERT INTO data (name, department, phone) VALUES('$name', '$department', '$phone')") or die($conn->error());
    $conn->query("SELECT * FROM data ORDER BY name") or die($conn->error);
}
