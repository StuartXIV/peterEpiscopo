<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$url ='https://api.opencagedata.com/geocode/v1/json?key=a5ff2e33877649c68c4a7ddd0a3ca014&q=' . $_REQUEST['lat'] . ',' . $_REQUEST['lng'] . '&pretty=1';
	


	//////////////////////////////////////////////////////////////////////////////////////////

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);                                             //////////////// JUST COPY

	curl_close($ch);

	$decode = json_decode($result,true);	

	//////////////////////////////////////////////////////////////////////////////////////////

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode;   //// check the api link, first detail that expands (little arrow)
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 