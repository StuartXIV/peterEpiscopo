<?php

include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

$user = $_REQUEST['user'];
$dateSetByListenOut = $_REQUEST['dateSetByListenOut'];

    $conn->query("UPDATE `datesrip` SET `dateSetByListenOut` = '$dateSetByListenOut' WHERE `datesrip`.`isNew` = 'yes'") or die($conn->error());
    $conn->query("UPDATE `datesrip` SET `isNew` = 'no' WHERE `datesrip`.`isNew` = 'yes'") or die($conn->error());

$data = ['Success',$user, $dateSetByListenOut];

echo json_encode($data);