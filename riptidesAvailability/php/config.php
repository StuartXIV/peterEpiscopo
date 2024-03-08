
<?php

	//$conn = new mysqli('localhost', 'root', 'Gilardino11!', 'u893668777_crud') or die(mysqli_error($conn));

	//connection details for MySQL database

	// HOSTINGER requires localhost for hostinger database
	//$cd_host = "localhost";
	$cd_host = "sql8.freesqldatabase.com";
	$cd_port = 3306;
	$cd_socket = "";

	// database name, username and password'

	$cd_dbname = "";
	$cd_user = "";
	$cd_password = "";
	
	$current_url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

	if (strpos($current_url, 'localhost') !== false) {

		// LOCAL

		// $cd_dbname = "u893668777_riptides";
		// $cd_user = "root";
		// $cd_password = "Gilardino11!";

		// www.freesqldatabase.com
		$cd_dbname = "sql8683144";
		$cd_user = "sql8683144";
		$cd_password = "Wk1vTzqGM4";

	} else {

		// PROD

		// HOSTINGER DETAILS
		$cd_dbname = "u893668777_riptides";
		$cd_user = "u893668777_rockup";
		$cd_password = "Sixpence11!";

		// www.freesqldatabase.com
		// $cd_dbname = "sql8683144";
		// $cd_user = "sql8683144";
		// $cd_password = "Wk1vTzqGM4";
	}

?>


