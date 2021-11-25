<?php

	// remove for production

	// ini_set('display_errors', 'On');
	// error_reporting(E_ALL);

	// $executionStartTime = microtime(true);

	$url='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' . $_REQUEST['photoreference'] .'&key=AIzaSyCX5oZnDldRci2K1_IKEKO8Uc9qRwfpyi0';
	
	$arr = array(
        'image' => $url,
    );
	

	echo json_encode($arr); 

    ?>