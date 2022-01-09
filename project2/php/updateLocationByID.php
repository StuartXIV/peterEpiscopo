<?php

ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

$id = $_REQUEST['id'];
$location = $_REQUEST['location'];

   
$conn->query("UPDATE `location` SET `name` = '$location' WHERE `location`.`id` = $id") or die($conn->error());
                

$data = [$id, $location];

echo json_encode($data);