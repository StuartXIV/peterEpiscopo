<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

    include("config.php");

    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

    if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];
		
		mysqli_close($conn);

		echo json_encode($output);
		
		exit;

	}	

    $query = $conn->prepare("SELECT count(id) as pc FROM department WHERE locationID = ?")  or die($conn->error());

    $query->bind_param("i", $_REQUEST['id']);

    $query->execute();

    if (false === $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		echo json_encode($output); 
	
		mysqli_close($conn);
		exit;

	}

    $result = $query->get_result();

   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {
		array_push($data, $row);
	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;

	echo json_encode($output); 

	mysqli_close($conn);
