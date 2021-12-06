<?php

    // 9e1be734a17d17c4e071d0b126e48d10 
	// remove for production

	$url = 'https://api.currencyfreaks.com/supported-currencies';
	
	$executionStartTime = microtime(true);

	$countryData = json_decode(file_get_contents("../json/supported-currencies.json"), true); 
  
	$country = []; 

  	foreach ($countryData as $feature) {

    $temp = null;
    $temp['code'] = $feature['currencyCode'];
    $temp['name'] = $feature['currencyName'];
    array_push($country, $temp);   

  } 

  usort($country, function ($item1, $item2) {
      return $item1['name'] <=> $item2['name'];
  });
	
   
  
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $country;
  
   
  
	header('Content-Type: application/json; charset=UTF-8');
  
   
  
	echo json_encode($output);
	