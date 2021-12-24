<?php

$mysqli = new mysqli('localhost', 'root', 'Gilardino11!', 'crud') or die(mysqli_error($mysqli));

if (isset($_POST['save'])){
    $name = $_POST['name'];
    $department = $_POST['department'];
    $phone = $_POST['phone'];

    $mysqli->query("INSERT INTO data (name, department, phone) VALUES('$name', '$department', '$phone')") or die($mysqli->error());
    $mysqli->query("SELECT * FROM data ORDER BY name") or die(mysqli->error);
}
