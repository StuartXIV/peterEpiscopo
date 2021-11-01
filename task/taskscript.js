
$('#btnRun1').click(function() {    

    console.log($("#selPostalCode").val());

    $.ajax(
        {
        url: "./getPostcodeInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            postalcode: $('#selPostalCode').val()
        },
        
        success: function(result) {
            
            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtResult-one').html(result['data'][0]['countryCode']);
                $('#txtResult-three').html(result['data'][0]['adminName1']);
                $('#txtResult-two').html(result['data'][0]['placeName']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

    $('#result-one').html('Country Code');
    $('#result-two').html("Country Name");
    $('#result-three').html("Place Name");
    $('#txtResult-one').removeClass("url");
    $('#txtResult-two').removeClass("url");
    $('#txtResult-three').removeClass("small-text");

});

$('#btnRun2').click(function() {

    


    $.ajax(
        {
        url: "./getCityInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            city: $('#selCityInfo').val()
        },
        
        success: function(result) {
            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtResult-one').html(result['data'][0]['thumbnailImg']);
                $('#txtResult-three').html(result['data'][0]['summary']);
                $('#txtResult-two').html(result['data'][0]['wikipediaUrl']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

    $('#result-one').html('Image');
    $('#result-two').html("Description");
    $('#result-three').html("Wikipedia Link");
    $('#txtResult-one').addClass("url");
    $('#txtResult-two').addClass("url");
    $('#txtResult-three').addClass("small-text");

});

$('#btnRun3').click(function() {

    // $lat = ;
    // $lng = ;

    
    


    $.ajax(

        {
        url: "./getWeatherInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $("#selWeather").val()[0] + $("#selWeather").val()[1],
            lng: $("#selWeather").val()[2] + $("#selWeather").val()[3]
        },
        
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {
                
                $('#txtResult-one').html(result['data']['humidity'] + "&#37");
                $('#txtResult-three').html(result['data']['temperature'] + "&#8451");
                $('#txtResult-two').html(result['data']['clouds']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log("not working");
        }
    });
    
    $('#result-one').html('Humidity');
    $('#result-two').html("Temperature");
    $('#result-three').html("Clouds");
    $('#txtResult-one').removeClass("url");
    $('#txtResult-two').removeClass("url");
    $('#txtResult-three').removeClass("small-text");

});

