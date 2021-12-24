<?php

    ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

    $mysqli = new mysqli('localhost', 'root', 'Gilardino11!', 'crud') or die(mysqli_error($mysqli));


    $result = $mysqli->query("SELECT * FROM personnel ORDER BY firstName") or die(mysqli->error);

    $data = [];

    while ($row = $result->fetch_assoc()){
        array_push($data, $row);
    }

    $output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $data;   //// check the api link, first detail that expands (little arrow)
	
	header('Content-Type: application/json; charset=UTF-8');
	echo json_encode($output);

?>