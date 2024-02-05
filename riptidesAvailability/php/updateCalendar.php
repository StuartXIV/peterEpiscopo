<?php

include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

$fieldId = $_REQUEST['fieldId'];
$lastUpdated = $_REQUEST['lastUpdated'];
$updatedBy = $_REQUEST['updatedBy'];
$status = $_REQUEST['status'];

    $conn->query("UPDATE `datesrip` SET `status` = '$status' WHERE `datesrip`.`fieldId` = '$fieldId'") or die($conn->error());
    $conn->query("UPDATE `datesrip` SET `lastUpdated` = '$lastUpdated' WHERE `datesrip`.`fieldId` = '$fieldId'") or die($conn->error());
    $conn->query("UPDATE `datesrip` SET `updatedBy` = '$updatedBy' WHERE `datesrip`.`fieldId` = '$fieldId'") or die($conn->error());

    // $sql = "UPDATE `datesrip` 
    //     SET `status` = '$status',
    //         `lastUpdated` = '$lastUpdated',
    //         `updatedBy` = '$updatedBy'
    //     WHERE `datesrip`.`fieldId` = '$fieldId'";
    // $conn->query($sql) or die($conn->error());



$data = ['Success',$fieldId, $lastUpdated, $updatedBy, $status];

echo json_encode($data);