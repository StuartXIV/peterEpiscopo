<?php

$conn = new mysqli('localhost', 'root', 'Gilardino11!', 'crud') or die(mysqli_error($mysqli));

$id = $_REQUEST['id'];
$firstName = $_REQUEST['firstName'];
$lastName = $_REQUEST['lastName'];
$department = $_REQUEST['department'];
$email = $_REQUEST['email'];

    $conn->query("UPDATE `personnel` SET `firstName` = '$firstName' WHERE `personnel`.`id` = $id") or die($conn->error());
    $conn->query("UPDATE `personnel` SET `lastName` = '$lastName' WHERE `personnel`.`id` = $id") or die($conn->error());
    $conn->query("UPDATE `personnel` SET `departmentID` = '$department' WHERE `personnel`.`id` = $id") or die($conn->error());
    $conn->query("UPDATE `personnel` SET `email` = '$email' WHERE `personnel`.`id` = $id") or die($conn->error());


$data = [$id, $firstName, $lastName, $department, $email];

echo json_encode($data);