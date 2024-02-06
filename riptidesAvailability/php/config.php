
<?php

	//$conn = new mysqli('localhost', 'root', 'Gilardino11!', 'u893668777_crud') or die(mysqli_error($conn));

	//connection details for MySQL database

	$cd_host = "localhost";
	$cd_port = 3306;
	$cd_socket = "";

	// database name, username and password'

	$cd_dbname = "";
	$cd_user = "";
	$cd_password = "";
	
	$current_url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

	if (strpos($current_url, 'localhost') !== false) {
		// LOCAL
		$cd_dbname = "u893668777_riptides";
		$cd_user = "root";
		$cd_password = "Gilardino11!";
	} else {
		// PROD
		$cd_dbname = "u893668777_riptides";
		$cd_user = "u893668777_rockup";
		$cd_password = "Sixpence11!";
	}

?>


