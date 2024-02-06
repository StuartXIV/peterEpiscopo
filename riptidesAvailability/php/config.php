
<?php

	//$conn = new mysqli('localhost', 'root', 'Gilardino11!', 'u893668777_crud') or die(mysqli_error($conn));

	//connection details for MySQL database

	$cd_host = "localhost";
	$cd_port = 3306;
	$cd_socket = "";

	// database name, username and password'

	
	//// PROD
	$cd_dbname = "";
	$cd_user = "";
	$cd_password = "";

	
	$current_url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

	if ($current_url == "http://localhost/repos/peterEpiscopo/riptidesAvailability/php/config.php") {
		$cd_dbname = "rip";
		$cd_user = "root";
		$cd_password = "Gilardino11!";
	} else {
		$cd_dbname = "u893668777_riptides";
		$cd_user = "u893668777_rockup";
		$cd_password = "Sixpence11!";
	}

	//// PROD
	// $cd_dbname = "u893668777_riptides";
	// $cd_user = "u893668777_rockup";
	// $cd_password = "Sixpence11!";

	//// TEST
	// $cd_dbname = "rip";
	// $cd_user = "root";
	// $cd_password = "Gilardino11!";

	// echo "The current URL is: " . $current_url;


?>


