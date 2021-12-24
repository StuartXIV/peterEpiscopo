<?php
include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

    $first_name = $_REQUEST['firstName'];
    $last_name = $_REQUEST['lastName'];
    $job_title = '';
    $department = $_REQUEST['department'];    
    $email = $_REQUEST['email'];

    $conn->query("INSERT INTO personnel (firstName, lastName, jobTitle, departmentID, email) VALUES('$first_name', '$last_name', '$job_title', '$department', '$email')") or die($mysqli->error);


