<?php

    ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
	
	include("config.php");

    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

    

    $id = $_REQUEST['id'];

    $conn->query("DELETE FROM personnel WHERE id=$id") or die($mysqli->error());

    $data = [$id];

    $output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $data;   //// check the api link, first detail that expands (little arrow)
	
	header('Content-Type: application/json; charset=UTF-8');
	echo json_encode($output);