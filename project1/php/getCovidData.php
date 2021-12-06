<?php

    // 9e1be734a17d17c4e071d0b126e48d10 
	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	
	$url = 'https://api.covid19api.com/summary';


	//////////////////////////////////////////////////////////////////////////////////////////

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);                                             //////////////// JUST COPY

	curl_close($ch);

	$country = []; 

	$decode = json_decode($result,true);	

	

	foreach ($decode['Countries'] as $feature) {
	
		$temp = $feature["CountryCode"];
		if ($temp === $_REQUEST['code']){
		array_push($country, $feature);   
		}
	  } 

	array_push($country, $decode['Global']);

	//////////////////////////////////////////////////////////////////////////////////////////

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $country;   //// check the api link, first detail that expands (little arrow)
	
	header('Content-Type: application/json; charset=UTF-8');
	echo json_encode($output);
	// echo json_encode($output); 

	?>