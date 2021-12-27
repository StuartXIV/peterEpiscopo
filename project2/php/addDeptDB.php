<?php
include("config.php");

ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

    $dept_name = $_REQUEST['name'];
    $location = $_REQUEST['location'];

    if ((int)$location){        
        $conn->query("INSERT INTO department (name, locationID) VALUES('$dept_name', '$location')") or die($mysqli->error);
        echo 'bumbum';
    } else {
        $conn->query("INSERT INTO location (name) VALUES('$location')") or die($mysqli->error);
        $result = $conn->query("SELECT id FROM location WHERE name='$location'") or die($conn->error);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
              $locationID = $row["id"];
              $conn->query("INSERT INTO department (name, locationID) VALUES('$dept_name', '$locationID')") or die($mysqli->error);
            }
        }
    }
        // $data = [];

        
        // array_push($data, $decode);

        // $output['status']['code'] = "200";
        // $output['status']['name'] = "ok";
        // $output['status']['description'] = "success";
        // $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
        // $output['data'] = $data;   //// check the api link, first detail that expands (little arrow)
        
        // header('Content-Type: application/json; charset=UTF-8');
        // echo json_encode($output);
  

    



