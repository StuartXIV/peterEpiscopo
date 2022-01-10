<?php

ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

$id = $_REQUEST['id'];
$name = $_REQUEST['name'];
$location = $_REQUEST['location'];

    // if ($location != "b"){                
    //     $conn->query("INSERT INTO location (name) VALUES('$location')") or die($conn->error());
    //     // $conn->query("UPDATE `department` SET `name` = '$name' WHERE `department`.`id` = $id") or die($conn->error());
    //     $result = $conn->query("SELECT id FROM location WHERE name='$location'") or die($conn->error());
    //     if ($result->num_rows > 0) {
    //         // output data of each row
    //         while($row = $result->fetch_assoc()) {
    //             $locationID = $row["id"];
    //             $conn->query("UPDATE department SET name = $name, locationID = $locationID WHERE id = $id");
    //             }
    //     }
    // } else {
        $conn->query("UPDATE `department` SET `name` = '$name' WHERE `department`.`id` = $id");
        $conn->query("UPDATE `department` SET `locationID` = $location WHERE `department`.`id` = $id");
    //}

$data = [$id, $name, $location];

echo json_encode($data);