<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$url='https://maps.googleapis.com/maps/api/place/textsearch/json?query=' . $_REQUEST['country'] . '+tourist+spots&language=en&key=AIzaSyCX5oZnDldRci2K1_IKEKO8Uc9qRwfpyi0';
	
	
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

