<?php
include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname) or die(mysqli_error($conn));

    $name = $_REQUEST['name'];
    $mp3 = $_REQUEST['mp3'];
    $img = $_REQUEST['img'];  

    $conn->query("INSERT INTO tracks (name, mp3, img) VALUES('$name', '$mp3', '$img')") or die($mysqli->error);


