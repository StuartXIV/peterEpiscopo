<?php

$conn = new mysqli('localhost', 'root', 'Gilardino11!', 'crud') or die(mysqli_error($mysqli));


    $first_name = $_REQUEST['firstName'];
    $last_name = $_REQUEST['lastName'];
    $job_title = '';
    $department = $_REQUEST['department'];    
    $email = $_REQUEST['email'];

    $conn->query("INSERT INTO personnel (firstName, lastName, jobTitle, departmentID, email) VALUES('$first_name', '$last_name', '$job_title', '$department', '$email')") or die($mysqli->error);


