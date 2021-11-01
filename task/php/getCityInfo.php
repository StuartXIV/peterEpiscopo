<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$url='http://api.geonames.org/postalCodeLookupJSON?formatted=true&postalcode=' . $_REQUEST['city'] . '&username=stuart_xiv&style=full';
	$urll = 'http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=' . $_REQUEST['city'] . '&maxRows=1&username=stuart_xiv&style=full';
	
	// the $url will turn into the url below. with $_REQUEST I take 'postalcode' variable from the 'data' object in script.js
	// $url='http://api.geonames.org/postalCodeLookupJSON?formatted=true&postalcode=bs81lr&username=stuart_xiv&style=full';


	//////////////////////////////////////////////////////////////////////////////////////////

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$urll);

	$result=curl_exec($ch);                                             //////////////// JUST COPY

	curl_close($ch);

	$decode = json_decode($result,true);	

	//////////////////////////////////////////////////////////////////////////////////////////

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode['geonames'];   //// check the api link, first detail that expands (little arrow)
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

