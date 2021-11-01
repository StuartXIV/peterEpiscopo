
$('#btnRun1').click(function() {    

    console.log($("#selPostalCode").val());

    $.ajax(
        {
        url: "../php/getPostcodeInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            postalcode: $('#selPostalCode').val()
        },
        
        success: function(result) {
            
            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtResult-one').html(result['data'][0]['countryCode']);
                $('#txtResult-two').html(result['data'][0]['adminName1']);
                $('#txtResult-three').html(result['data'][0]['placeName']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

    $('#result-one').html('Country Code');
    $('#result-three').html("Country Name");
    $('#result-two').html("Place Name");
    $('#txtResult-one').removeClass("url");
    $('#txtResult-three').removeClass("url");
    $('#txtResult-two').removeClass("small-text");

});

$('#btnRun2').click(function() {

    


    $.ajax(
        {
        url: "../php/getCityInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            city: $('#selCityInfo').val()
        },
        
        success: function(result) {
            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtResult-one').html(`<a>${result['data'][0]['thumbnailImg']}<a>`);
                $('#txtResult-two').html(result['data'][0]['summary']);
                $('#txtResult-three').html(result['data'][0]['wikipediaUrl']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

    $('#result-one').html('Image');
    $('#result-three').html("Description");
    $('#result-two').html("Wikipedia Link");
    $('#txtResult-one').addClass("url");
    $('#txtResult-three').addClass("url");
    $('#txtResult-two').addClass("small-text");

});

$('#btnRun3').click(function() {

    $.ajax(

        {
        url: "../php/getWeatherInfo.php",
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
                $('#txtResult-two').html(result['data']['temperature'] + "&#8451");
                $('#txtResult-three').html(result['data']['clouds']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log("not working");
        }
    });
    
    $('#result-one').html('Humidity');
    $('#result-three').html("Temperature");
    $('#result-two').html("Clouds");
    $('#txtResult-one').removeClass("url");
    $('#txtResult-three').removeClass("url");
    $('#txtResult-two').removeClass("small-text");

});

