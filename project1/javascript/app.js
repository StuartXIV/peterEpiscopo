const user_location = document.getElementById('user-location');
user_location.addEventListener('click', getLocation);
const user_location_side = document.getElementById('user-location-side');
user_location_side.addEventListener('click', getLocation);
const iss_btn = document.getElementById('iss');
iss_btn.addEventListener('click', activateTimer);
const iss_btn_side = document.getElementById('iss-side');
iss_btn_side.addEventListener('click', activateTimer);
const answer = document.getElementById('result');
const select_country = document.getElementById('country');
const settings = document.getElementById('settings');
settings.addEventListener('click', changeMapStyle);
const settings_side = document.getElementById('settings-side');
settings_side.addEventListener('click', changeMapStyle);
const stop_follow = document.getElementById("stop-follow");
stop_follow.addEventListener("click", activateTimer);
const map = document.getElementById("map");
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', openSideMenu);
const side_menu = document.getElementById('side-menu');
const loading_screen = document.getElementById('loading');

const api_key = '70ee96dfc29aab191c8ebe3d0acddc70';


/* MAP TILES */

var map_bright = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
	minZoom: 2,
	maxZoom: 18
});

var map_dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	minZoom: 2,
	maxZoom: 18,
    subdomains: 'abcd',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
});

var map_quiz = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
    minZoom: 2,
	maxZoom: 6
});


/* ICONS FOR MARKERS */

var markerIcon = L.icon({
    iconUrl: 'images/marker.svg',
    iconSize: [42, 55],
    iconAnchor: [20 , 60]
});

var cityIcon = L.icon({
    iconUrl: 'images/city.svg',
    iconSize: [42, 55],
    iconAnchor: [15,60],    
    popupAnchor: [6,-50]
});

var issIcon = L.icon({
    iconUrl: 'images/ISS2.svg',
    iconSize: [70, 30],
    iconAnchor: [50, 53],
    popupAnchor: [-3, -76]
});

var poiIcon = L.icon({
    iconUrl: 'images/poi.svg',    
    iconSize: [70, 35]
})

const issmarker = L.marker([65,19], {icon: issIcon}).bindPopup("<div id=\"iss-div\"><img id=\"iss-logo\" src=\"images/iss_logo.png\"><h3>International Space Station</h3></div>");


// MAP SETUP ------------------------------------------------------------------------------------

let timer;
let capital_marker;

/* CLUSTER GROUPS */

let markers = L.markerClusterGroup({
    showCoverageOnHover: false
});
let capitals = L.markerClusterGroup({
    showCoverageOnHover: false
});
let points_of_interest_cluster = L.markerClusterGroup({
    showCoverageOnHover: false
});


/* BOOLEANS - RUNNING ACTIVITIES */

let iss_active = false;
let double_click_active = true;
let single_click_active = true;
let side_menu_open = false;
let capitals_active = false;
let popup_active = true;
let popup_open_small_screen = false;

//Easy Button Activity
let info_open = false;
let weather_open = false;
let exr_open = false;
let covid_open = false;


/* MAIN MAP SETUP */

const mymap = L.map('map', {
    layers: map_bright
});
mymap.setView([10, 0], 3);

// Set Map Bounds
var southWest = L.latLng(-92.18, -193.30);
var northEast = L.latLng(92.10, 193.30);
var mapBounds = L.latLngBounds(southWest, northEast);
mymap.setMaxBounds(mapBounds);
mymap.doubleClickZoom.disable();

// Set Main Marker
var marker = L.marker([110 , 63], {icon: markerIcon});


/* EASY BUTTONS */

var user_location_btn = L.easyButton('<img id=\"easy-button-icon\" src=\"images/marker-easybutton.png\">', getLocation, 'Find Your Location');
user_location_btn.addTo(mymap);


var info_btn = L.easyButton({
    states: [{
                stateName: 'info-btn',
                icon:      '<img class="btn-icon" src="images/info.svg">',
                title:     'View Country Info',
                onClick: displayInfo
            }]
})

var weather_btn = L.easyButton({
    states: [{
                stateName: 'weather-btn',
                icon:      '<img class="btn-icon" src="images/icons/sun.svg">',
                title:     'View Weather',
                onClick: displayWeather
            }]
})


var exr_btn = L.easyButton({
    states: [{
                stateName: 'exr-btn',
                icon:      '<img class="btn-icon" src="images/exr.svg">',
                title:     'View Currency/EXR',
                onClick: displayEXR
            }]
})

var covid_btn = L.easyButton({
    states: [{
                stateName: 'covid-btn',
                icon:      '<img class="btn-icon" src="images/covid.svg">',
                title:     'View Covid-19 Statistics',
                onClick: displayCovid
            }]
})

info_btn.addTo(mymap);
weather_btn.addTo(mymap);
exr_btn.addTo(mymap);
covid_btn.addTo(mymap);


/* WEBSITE LOADING */

function loading(){
    if (side_menu_open){
        side_menu_open = false;
        side_menu.style.transform = "translateY(-130%)";
        side_menu.style.opacity = "0";        
    }
    loading_screen.style.display = "inline";
    mymap.spin(true);
    setTimeout(function(){
        mymap.spin(false);
        loading_screen.style.display = "none";
        if (!quiz){double_click_active = true};
        if (quiz){single_click_active = true};
    }, timeOfLoading());
}

function timeOfLoading(){
    if (quiz || capitals_active){
        return 1500;
    } else {
        return 3300;
    }
}

/* possibly delete this code */

map_bright.on('loading', function (event){
    mymap.fireEvent('dataloading', loading)
})

map_quiz.on('loading', function (event){
    mymap.fireEvent('dataloading', loading)
})


/* DOUBLECLICK ON MAP */

mymap.on('dblclick', function (event){
    if (double_click_active && !quiz && !iss_active){    
        marker.setLatLng(event.latlng); 
        double_click_active = false;  
        loading();
        getMarkerInfo(event.latlng); 
        if (popup_open_small_screen && screenSize()){
            scrollPopup();
            setTimeout(()=>{
                scrollPopup();
            }, 3000);
        }       
    }
})

/* SINGLE CLICK ON MAP */

mymap.on('click', function (event){
    closeSideMenu();
})


/* TIMER FOR International Space Station */

function activateTimer(){
    loading();
    if (iss_active === true){        
        if(mymap.hasLayer(issmarker)){mymap.removeLayer(issmarker)};
        clearInterval(timer);
        iss_active = false;
        stop_follow.style.display = "none";
        setTimeout(() => {
            getCountryPolygon();
        }, 2000);        
    } else {
        capitals.clearLayers();
        markers.clearLayers();
        if(!mymap.hasLayer(issmarker)){issmarker.addTo(mymap)};
        timer = setInterval(iSS, 1000);
        iss_active = true;
        stop_follow.style.display = "flex";
    }
}


/* ONLOAD FUNCTIONS */

$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
        $(this).remove();
        });
    }    
    let coordinates = {
        lat: 34.55,
        lng: 69.20
    };
    getMarkerInfo(coordinates, marker);     
    getCountryNames();
    setTimeout(() =>{        
        $('.popup-container').css('opacity', '1');
    }, 2000)
    })


/* SIDE MENU */

function openSideMenu(){
    if (!side_menu_open){
        side_menu_open = true;
        side_menu.style.transform = "translateY(0)";
        side_menu.style.opacity = "1";
    } else {
        side_menu_open = false;
        side_menu.style.transform = "translateY(-130%)";
        side_menu.style.opacity = "0";
    }
}

function closeSideMenu(){
    if(side_menu_open){
        side_menu.style.transform = "translateY(-130%)";
        side_menu_open = false;
    }
}



/* USER LOCATION */

function getLocation() {
        if (iss_active){activateTimer()};
        loading();
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
        console.log("Geolocation is not supported by this browser.");
        user_location.style.display = "none";
        }
        
  }
  
function showPosition(position) {
    let coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
    getMarkerInfo(coordinates, "false");
  }

  
/* MARKER generated with DOUBLECLICK */

function getMarkerInfo(event, select) {
    //console.log("getMarkerInfo()");
    $.ajax(
        {
        url: "php/getMarkerInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: event.lat.toFixed(6),
            lng: event.lng.toFixed(6)
        },
        
        success: function(result) {

            if (result.status.name == "ok") {

                const code_country = result['data']['results']['0']['components']['country_code'].toUpperCase();
                const name = result['data']['results']['0']['components']['country'];
                const currency = result['data']['results']['0']['annotations']['currency']['name'];
                const currency_symbol = result['data']['results']['0']['annotations']['currency']['symbol'];                
                const time_zone_name = result['data']['results']['0']['annotations']['timezone']['name'];
                const time_zone = result['data']['results']['0']['annotations']['timezone']['short_name'];
                const county = result['data']['results']['0']['components']['county'];
                const lat = event.lat.toFixed(2);
                const lng = event.lng.toFixed(2);

                $('#currency-name').html(currency);
                $('#currency-symbol').html(currency_symbol);
                $('#currency').html(currency);
                $('#time-zone').html(time_zone + " - " + time_zone_name);
                
                player_choice = name;
                select_country.value = code_country;
                if(quiz){
                    if (player_choice === computer_choice){                    
                        answer.innerHTML = "Correct!";
                        answer.style.display = "inline-block";
                        answer.style.background = "lightgreen";
                    } else {
                        answer.innerHTML = "Wrong";
                        answer.style.display = "inline-block";
                        answer.style.background = "red";
                    }
                }
                if (select != "true"){                
                    getCountryPolygon();
                }
            }        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });     
};

function getCovidInfo(code_country, population) {
    //console.log("getCovidInfo()");
    $.ajax(
        {
        url: "php/getCovidData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            code: code_country
        },
        
        success: function(result) {
            // console.log(JSON.stringify(result));
            if (result.status.name == "ok") {
                const arr = result['data']['0'];
                const global = result['data']['1'];
                const global_cases = global['TotalConfirmed'];
                const global_deaths = global['TotalDeaths'];
                //Fix Date Format
                let year = arr['Date'].slice(0, 4);
                let month = arr['Date'].slice(5, 7);
                let day = arr['Date'].slice(8, 10);
                let date = day + "." + month + "." + year;
                let new_cases = fixNumber(arr['NewConfirmed']);
                let new_deaths = fixNumber(arr['NewDeaths']);
                if (new_cases === 0){ new_cases = 'None reported'};                
                if (new_deaths === 0){ new_deaths = 'None reported'};
                $('#date').html(date);
                $('#new-cases').html(new_cases);
                $('#total-cases').html(fixNumber(arr['TotalConfirmed']));
                $('#new-deaths').html(new_deaths);
                $('#total-deaths').html(fixNumber(arr['TotalDeaths']));      
                $('#percentage-cases-country').html(`${percentage(arr['TotalConfirmed'], population).toFixed(1)}`);          
                $('#percentage-deaths-country').html(percentage(arr['TotalDeaths'], population).toFixed(2));   
                $('#percentage-cases-world').html(`${percentage(arr['TotalConfirmed'], global_cases).toFixed(1)}`);          
                $('#percentage-deaths-world').html(percentage(arr['TotalDeaths'], global_deaths).toFixed(2));         
            }        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error Covid');
        }
    });     
};


/* WHERE IS THE ISS */

function iSS() {
    points_of_interest_cluster.clearLayers();
    removeMarker(); removeLayer();
    exitPopup();

    $.ajax(
        {
        url: "php/getISSInfo.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

            if (result.status.name == "ok") {

                $lat = result['data']['latitude'];
                $lng = result['data']['longitude'];
                issmarker.setLatLng([$lat, $lng]);
                mymap.setView([$lat, $lng]);
            }        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error ISS info");
        }
    });     
};


/* GET COUNTRY NAMES FOR INPUT SELECT OPTIONS*/

function getCountryNames() {  

    $.ajax(
        {
        url: "php/getCountryNames.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            
            if (result.status.name == "ok") {
                empty_arr = [];
                const arr = result['data'];
                //geojson = arr;
                arr.forEach(element => {
                    const country = element['name'];
                    const value = element['code'];
                    const arr_remove = ['New Caledonia', 'Puerto Rico', 'Somaliland', 'N. Cyprus'];
                    if (!arr_remove.includes(country)){
                        const tag = document.createElement("option");
                        tag.value = value;
                        const text = document.createTextNode(country);
                        tag.appendChild(text);
                        select_country.appendChild(tag);

                    }                    
                });
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 
    
};

/* GET COUNTRY CAPITAL */

function getCountryCapitals(name = null, select) {   
    //console.log("getCountryCapitals()");
    removeCapital();
    name ? name = name.replace('+', ' ').toLowerCase() : null;

    $.ajax(
        {
        url: "php/getCapitals.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            
            const capital_arr = result['data']['features'];
            if (result.status.name == "ok") {
                capital_arr.forEach(country => {                
                    if(country['properties']['country'].toLowerCase() === name){
                        let coordinates = country['geometry']['coordinates'].reverse();
                        let capital_name = country['properties']['city'];
                        let capital_code = country['properties']['iso2'];
                        let country_name = country['properties']['country'];
                        createPopupForCapitals(coordinates, capital_name, capital_code, country_name);
                        getWeatherInfo(coordinates[0], coordinates[1]);
                        if (select === "true"){
                            let coord = {
                                lat: coordinates[0],
                                lng: coordinates[1]
                            }
                            getMarkerInfo(coord, select);
                        }
                    }   
                });
            }        
        },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error getCapitals");
        }
    });     
};



/* REQUEST WEATHER INFO */

function getWeatherInfo(latitude, longitude) {  
    //console.log("getWeatherInfo()");
    $.ajax(
        {
        url: "php/getWeatherInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: latitude,
            lng: longitude,
            api: api_key
        },
        
        success: function(result) {

            if (result.status.name == "ok") {
                const weather_main = result['data']['current']['weather']['0']['main'];
                const weather_info = result['data']['current']['weather']['0']['description'];
                const weather = weather_main.toLowerCase();
                const temp_min = result['data']['daily']['0']['temp']['min'];
                const temp_max = result['data']['daily']['0']['temp']['max'];
                const temp_min_tomorrow = result['data']['daily']['1']['temp']['min'];
                const temp_max_tomorrow = result['data']['daily']['1']['temp']['max'];
                const temp_min_dayafter = result['data']['daily']['2']['temp']['min'];
                const temp_max_dayafter = result['data']['daily']['2']['temp']['max'];
                const weather_tomorrow = result['data']['daily']['1']['weather']['0']['main'];
                const weather_dayafter = result['data']['daily']['2']['weather']['0']['main'];
                const humidity = result['data']['current']['humidity'];
                let wind = result['data']['current']['wind_speed'];                
                wind = (wind * 2.23694).toFixed(0);
                let wind_kmph = (wind * 1.609344).toFixed(0);

                $('#weather-description').html(weather_info);
                $('#weather-icon').attr('src', `images/${weather}.svg`);
                $('#temperature').html(`${temperatureConverter(temp_min)}&#8451; / ${temperatureConverter(temp_max)}&#8451;`);
                $('#humidity').html(humidity + "%");
                $('#wind-speed').html(wind_kmph);
                $('#date-weather').html(getDate("today"));
                $('#tomorrow').html(getDate("tomorrow"));
                $('#day-after').html(getDate("dayafter"));
                $('#tomorrow-min').html(temperatureConverter(temp_min_tomorrow) + "&deg");
                $('#tomorrow-max').html(temperatureConverter(temp_max_tomorrow) + "&deg");
                $('#dayafter-min').html(temperatureConverter(temp_min_dayafter) + "&deg");
                $('#dayafter-max').html(temperatureConverter(temp_max_dayafter) + "&deg");
                $('#weather-icon-tomorrow').attr('src', `images/${weather_tomorrow.toLowerCase()}.svg`);
                $('#weather-icon-dayafter').attr('src', `images/${weather_dayafter.toLowerCase()}.svg`);              
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    }); 
    
};


/* GET POINTS OF INTEREST */

const getPointsOfInterest = (country_name) => {   

    // Remove previous points of interest
    points_of_interest_cluster.clearLayers();

    // Fix country name, remove spaces  
    country_name = country_name.replace(' ', '+').toLowerCase();   
    points_of_interest_cluster.addTo(mymap);

    $.ajax(
        {
        url: "php/getPointsOfInterest.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: country_name
        },
        
        success: function(result) { 

            const poi_arr = result['data']['results'];
            if (result.status.name == "ok") {
                poi_arr.forEach(point => {
                    let lat = point['geometry']['location']['lat'];
                    let lng = point['geometry']['location']['lng'];
                    let place = point['name'];
                    let address = point['formatted_address'];
                    // Check if photo exists
                    let photo;
                    point['photos'] ? photo = point['photos']['0']['photo_reference'] : photo = ' ';
                    
                    // Photo Request
                    getPlacePicture(lat, lng, place, photo, address);
                })
            }        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error points of interest request');
        }
    }); 
    
};


const getPlacePicture = (lat, lng, place, photo, address) => {   

        // Check if photo exists
        let photo_available;
        photo === ' ' ? photo_available = false : photo_available = true; 

    $.ajax(
        {
        url: "php/getPlacePicture.php",
        type: 'POST',
        dataType: 'json',
        data: {
            photoreference: photo
        },
        
        success: function(result) { 
            
            let poi_marker = L.marker([lat, lng], {icon: poiIcon});
            
            let image = result['image'];
            !photo_available ? image = "images/noimage.png" : null ;
            let popup = L.popup().setContent                            
                            (`
                            <div class="popup">
                            <div id="img-container-place"><img id="place-image" src=\"${image}\" alt="No Image Available"></div>
                            <p id="place-p"><span id="place-name-popup" class="address-place"> ${place} </span></p>
                            <p class="address-place"><span>Address:</span>  ${address}</p>
                            <p class="wikipedia-place"><a id="search-wiki" href=\"https://en.wikipedia.org/wiki/${place}\" target=\"_blank\">Explore on Wikipedia</a></p>
                            </div>
                            `);

            poi_marker.bindPopup(popup).addTo(points_of_interest_cluster).on('click', ()=>{
                mymap.setView([lat,lng]);
                if (popup_open_small_screen){                    
                scrollPopup();
                }
            });             
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('error place photo');
        }
    });     
};


// GET COUNTRY POLYGON WHEN USING SELECT BAR ------------------------------ -------------------------------------------------------------------

let layer = []; //layer is the single highlighted country
$('#country').change(launchGetBorder);

function launchGetBorder(){
    let select = "true";
    getCountryPolygon(select);    
    if (popup_open_small_screen && screenSize()){
        scrollPopup();
        setTimeout(()=>{
            scrollPopup();
        }, 3000);
    }   
}
        
function getCountryPolygon(select = null){
   // console.log("getCountryPolygon()");
    loading();
    activatePopup();
    $code = $('#country').val();    

    $.ajax(
        {
        url: "php/getCountryBorder.php",
        type: 'POST',
        dataType: 'json',
        data: {
            code: $code
        },
        
        success: function(result) { 
            let myGeoJSON = result['data']['0'];
            mymap.removeLayer(layer);
            let name = myGeoJSON['properties']['name'];                                                    
            layer = L.geoJSON(myGeoJSON);                        
            layer.addTo(mymap); 
            getCountryInfo(name, $code);                                        
            mymap.fitBounds(layer.getBounds());
            layer.setStyle({
                color: 'yellow',
                weight: 2,
                fillOpacity: 0.1,
        
            });
            country_selected = myGeoJSON['properties']['name'];  
            getCountryCapitals(name.toLowerCase(), select);  
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('error getCountryPolygon');
        }
    });     
}
    

// GET COUNTRY INFO FOR POPUS-------------------------------------------------------------------

function getCountryInfo(name, code) {   
    //console.log("getCountryInfo()");
    $.ajax(
        {
        url: "php/getCountryData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countrycode: code
        },
        
        success: function getResults(result) {

            if (result.status.name == "ok") {

                let capital = result['data'][0]['capital'];
                let population = result['data'][0]['population'];
                let currency = result['data'][0]['currencyCode'];
                let area = result['data'][0]['areaInSqKm'];
                let continent = result['data'][0]['continentName'];      
                createPopup(name, code, capital, population, currency, area, continent); 
                
            };
            
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log("ERROR");
        }
        
    }); 
    
};

/* CREATE POPUP FOR POLYGONS CREATED BY SELECT */

function createPopup(name, code, capital, population, currency, area, continent, symbol){
    // console.log('createPopup');

   
    area = Math.floor(area);

    if (area >= 100000000){
        area = `${(area / 1000000).toFixed(0)} million`;
    } else if (area >= 1000000){
        area = `${(area / 1000000).toFixed(1)} million`;
    } else {
        area = numberWithCommas(area);
    } 

    if (!symbol){
        symbol = '';
    }

    let code_lowercase = code.toLowerCase();    

    $('#flag-main').attr('src', `images/flags/${code_lowercase}.png`);
    $('#country-name-popup').html(name);
    $('#country-code').html(`(${code})`);
    $('#capital').html(capital);
    $('#capital-for-weather').html(capital);
    $('#population').html(fixNumber(population));
    $('#population-covid').html(fixNumber(population));
    $('#area').html(`${area} Km`);
    $('#continent').html(continent);
    $('#search-wiki').attr("href", `https://en.wikipedia.org/wiki/${name}`);
    $('#name-wiki').html(`${name} Wikipedia`);
    $('#little-flag-main').attr('src', `images/flags/${code_lowercase}.png`);

    points_of_interest_cluster.clearLayers(); 
    getPointsOfInterest(name);
    getCovidInfo(code.toUpperCase(), population);
    exchangeRate(currency, symbol);
}


function numberWithCommas(x) { 
    // Insert comma to mark thousand
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    const temp = valNum - 273.15;
    return Math.round(temp);
}


//POPUP FOR CAPITALS
const createPopupForCapitals = (coordinates, name, code, country) => {

    

    capital_marker = L.marker(coordinates, {icon: cityIcon});  
    
    let popup = L.popup().setContent                            
                            (`
                            <div class="popup" >
                            <div class="img-container" id="popup-capital"><img id=\"flag\" src=\"images/flags/${code.toLowerCase()}.png\" alt="flag"></div>
                            <p id="capital-p"><span id="capital-name-popup"> ${name} </span></p>
                            <p><span>Country:</span>  ${country}  <span>(${code})</span></p>
                            <p><a id="search-wiki" href=\"https://en.wikipedia.org/wiki/${name}\" target=\"_blank\">${name} Wikipedia <img id="little-flag" src=\"images/flags/${code.toLowerCase()}.png\" alt=""><span id="search-popup-box"><img id="search-popup" src="images/icons/search-solid.svg"></i></span></a></p>
                            </div>
                            `);
    capital_marker.addTo(mymap);    
    capital_marker.bindPopup(popup).openPopup();
};




/* REQUEST EXCHANGE RATE */

const exchangeRate = (selected_currency) => {  
    $('#service-not-available').css('display', 'none'); 

    let base_currency = $('#base-currency-select').val();
            
    return $.ajax(
        {
        url: "php/getExchangeRate.php",
        type: 'POST',
        dataType: 'json',
        data: {
            base: base_currency,
            currency: selected_currency
        },
        
        success: function(result) {                
            // console.log(JSON.stringify(result));
            if (result.status.name == "ok") {
                let exr= result['data'][0].toFixed(5);
                let inverted_exr = invertEXR(exr);
                exr = exrFormat(exr);
                inverted_exr = exrFormat(inverted_exr);
                $('#exchange-rate').html(exr.int);
                $('#decimals').html(exr.decimals);
                $('#currency-title').html("/ " + selected_currency);     
                $('#base-last-calculation').html(`${inverted_exr.int}`);
                $('#last-decimals').html(inverted_exr.decimals);
                $('#last-base').html(base_currency);
                $('#currency-last-calculation').html(selected_currency);
                $('#currency-code').html(selected_currency);
                if (currencies_array_objects[`${base_currency}`]){                    
                    $('#base-text').html("1.00 " + currencies_array_objects[`${base_currency}`] + " =");
                } else {
                    $('#base-text').html("1.00 United States Dollar =");
                }

                function invertEXR(exr){
                    let inverted = 1 / exr;
                    return inverted.toFixed(5);
                }
            }            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error getting Exchange Rate");
            $('#service-not-available').css('display', 'flex');
        }
    });             
};

function exrFormat(num){
    let digits = num.toString();
    let array = [];
    for (let i = 0; i < digits.length; i++){
        array.push(digits[i]);
    }
    let dark = array.splice(0, array.indexOf('.'));
    let decimals = array.splice(array.indexOf('.'), array.length);
    let decimals_string = decimals.join("");
    let dark_decimals = decimals_string[0] + decimals_string[1] + decimals_string[2];
    let grey_decimals = decimals_string[3] + decimals_string[4] + decimals_string[5];
    let object = {
        int: dark.join("") + dark_decimals,
        decimals: grey_decimals
    }
    return object;
}




/* REQUEST CURRENCY FOR EXR SELECT */


let currencies_array = [];
let currencies_array_objects = {};


const getCurrenciesArray = () => {   
            
    $.ajax(
        {
        url: "php/getCurrenciesArray.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {                
            // console.log(JSON.stringify(result));
            let arr = result['data']['data'];
            let new_arr = Object.keys(arr);
            new_arr.forEach(element => {
                currencies_array.push(element);
            })     
            activateGetCurrencies();   
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error getCurrencies");
        }
    });             
};

getCurrenciesArray();

function activateGetCurrencies(){
    const getCurrencies = () => {   
            
        $.ajax(
            {
            url: "php/getCurrencies.php",
            type: 'POST',
            dataType: 'json',
            
            success: function(result) {                
                // console.log(JSON.stringify(result));
                let arr = result['data'];
                arr.forEach(element => {
                    if (currencies_array.includes(element['code']) && element['code']){
                        let code = element['code'];
                        let name = element['name'].replace("�", "i");
                        currencies_array_objects[`${code}`] = `${name}`;
                        const tag = document.createElement("option");
                        tag.value = element['code'];
                        var text = document.createTextNode(`${name} - ${code}`);
                        tag.appendChild(text);
                        $('#base-currency-select').append(tag);
                        if (code === 'UGX'){
                            const america = document.createElement("option");
                            america.value = "USD";
                            text = document.createTextNode(`United States Dollar - USD`);
                            america.appendChild(text);
                            $('#base-currency-select').append(america);
                        }
                    }
                })
                $('#base-currency-select').val("GBP");                  
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error getCurrencies");
            }
        });             
    };
    getCurrencies();
}




$('#base-currency-select').change(currencySelect);

function currencySelect (){
    if ($('#base-currency-select').val()){
        exchangeRate($('#currency-code').html());  
        $('#fake-select-code').html($('#base-currency-select').val());      
    }
}



// MAP SETTINGS Bright/Dark

let map_style = "bright";
let quiz = false;

function changeMapStyle(){
    loading();
    if (map_style === "bright"){
        mymap.removeLayer(map_bright);      
        darkMap();
    } else {
        mymap.removeLayer(map_dark);
        brightMap();
    }      
};

function brightMap(){
    map_bright.addTo(mymap);
    map_style = "bright";
    map.style.backgroundColor = "#dbf5ff";
    settings.innerHTML = "<img class=\"icon\" src=\"images/icons/moon.svg\"> Dark Mode";
    settings_side.innerHTML = settings.innerHTML;
}

function darkMap(){
    map_dark.addTo(mymap);
    map_style = "dark";
    map.style.backgroundColor = "#262626";
    settings.innerHTML = "<img class=\"icon\" src=\"images/icons/sun.svg\"> Bright Mode";
    settings_side.innerHTML = settings.innerHTML;
}




/* SHORTCUT FUNCTIONS */

const removeMarker = () => {
    if(mymap.hasLayer(marker)){mymap.removeLayer(marker)}
}

const removeCapital = () => {
    if(mymap.hasLayer(capital_marker)){mymap.removeLayer(capital_marker)}
}

const removeLayer = () => {
    if (mymap.hasLayer(layer)){mymap.removeLayer(layer)};
}



/* EASY BUTTON FUNCTIONS */

function displayInfo(){
    activatePopup();
    dissolve();
    closePopup("close all");
    changeTopLeftIconPopup();
}

function displayEXR() {  
    activatePopup();  
    setTimeout(()=>{        
    if (!exr_open){
        dissolve();
        exr_open = true;
        closePopup("exr");
        $('#exr').css('display', 'block');
        changeTopLeftIconPopup(); 
        }    
    }, 50) 
}

function displayWeather() {
    activatePopup();
    setTimeout(()=>{        
    if (!weather_open){        
        dissolve();
        weather_open = true;
        closePopup("weather");
        $('#weather').css('display', 'block');   
        changeTopLeftIconPopup();      
        }      
    }, 50)
}

function displayCovid() {
    activatePopup();
    setTimeout(()=>{        
    if (!covid_open){
        covid_open = true;
        dissolve();
        closePopup("covid");
        $('#covid').css('display', 'block');    
        changeTopLeftIconPopup();     
        }    
    }, 50)
}

function closePopup(display){
    if (display === "covid"){
        weather_open = false;
        $('#weather').css('display', 'none');
        exr_open = false;
        $('#exr').css('display', 'none');
    } else if (display === "exr"){
        weather_open = false;
        $('#weather').css('display', 'none');
        covid_open = false;
        $('#covid').css('display', 'none');
    } else if (display === "weather"){
        covid_open = false;
        $('#covid').css('display', 'none');
        exr_open = false;
        $('#exr').css('display', 'none');
    } else {
        covid_open = false;
        $('#covid').css('display', 'none');
        exr_open = false;
        $('#exr').css('display', 'none');        
        weather_open = false;
        $('#weather').css('display', 'none');
    }
}

function dissolve(){
    if (!popup_open_small_screen && screenSize()){       
        scrollPopup();
    }
}

function screenSize(){
    let arrow = document.querySelector(".small-screen");
    let style = window.getComputedStyle(arrow);
    let display = style.getPropertyValue('display');
    if (display === "none"){
        return false;
    } else {
        return true;
    }
}

//change Top Left Icon in Popup
function changeTopLeftIconPopup(){
    if (covid_open){
        $('#icon-popup-left').attr('src', 'images/covid.svg');
    } else if (weather_open) {
        $('#icon-popup-left').attr('src', 'images/icons/sun.svg')
    } else if (exr_open){
        $('#icon-popup-left').attr('src', 'images/exr.svg')
    } else {
        $('#icon-popup-left').attr('src', 'images/info.svg')
    }
}


//Show Popup (small screen)

$('#show-popup').on('click', scrollPopup);

function scrollPopup(){
    if (!popup_open_small_screen){        
        popup_open_small_screen = true;
        $('.popup-container').css('transform', 'translateY(20%)');
        $('#show-popup').css('transform', 'rotate(180deg)');
        mymap.closePopup();
    } else {
        popup_open_small_screen = false;
        $('.popup-container').css('transform', 'translateY(73%)');
        $('#show-popup').css('transform', 'rotate(0deg)');
    }
}

//Exit Popup

$('#exit-popup').on('click', exitPopup);

function activatePopup(){    
    if (!popup_active){
        popup_active = true;  
        $('.popup-container').css('display', 'flex');      
        setTimeout(()=>{            
            $('.popup-container').css('opacity', '1');
        }, 500)
    }
}

function exitPopup(){
    if (popup_active){        
        $('.popup-container').css('opacity', '0');
        popup_active = false;
        setTimeout(()=> {
            $('.popup-container').css('display', 'none');
        }, 500)
    }
}

// SHAKE EFFECT

jQuery.fn.shake = function() {
    this.each(function(i) {
        $(this).css({ "position": "relative" });
        for (var x = 1; x <= 3; x++) {
            $(this).animate({ left: -25 }, 10).animate({ left: 0 }, 50).animate({ left: 25 }, 10).animate({ left: 0 }, 50);
        }
    });
    return this;
} 

//Format Number
function fixNumber(number){    
    if (number >= 1000000000){
        return number = `${(number / 1000000000).toFixed(1)} billion`;
        
    }
    else if (number >= 100000000){
        return number = `${(number / 1000000).toFixed(0)} million`;
    } else if (number >= 1000000){
        return number = `${(number / 1000000).toFixed(1)} million`;
    } else if (number >= 1000){
        return number = numberWithCommas(number);
    } else {
        return number
    }
}

//Calculate Percentage
function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
 } 


 //Format Date
function getDate(day){
    let date = new Date();
    
    if (day === "tomorrow"){
        date.setDate(date.getDate()+1);
    } else if (day === "dayafter"){
        date.setDate(date.getDate()+2);
    }
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    date = dd + '/' + mm + '/' + yyyy;
    return date;
}

/* LOADING SCRIPT */

!function(n,i){"function"==typeof define&&define.amd?define(["leaflet","spin.js"],function(i,t){n(i,t)}):"object"==typeof exports?module.exports=function(i,t){return void 0===i&&(i=require("leaflet")),void 0===t&&(t=require("spin.js")),n(i,t),i}:void 0!==i&&i.L&&i.Spinner&&n(i.L,i.Spinner)}(function(n,i){var t={spin:function(n,t){n?(this._spinner||(this._spinner=new i(t).spin(this._container),this._spinning=0),this._spinning++):--this._spinning<=0&&this._spinner&&(this._spinner.stop(),this._spinner=null)}},e=function(){this.on("layeradd",function(n){n.layer.loading&&this.spin(!0),"function"==typeof n.layer.on&&(n.layer.on("data:loading",function(){this.spin(!0)},this),n.layer.on("data:loaded",function(){this.spin(!1)},this))},this),this.on("layerremove",function(n){n.layer.loading&&this.spin(!1),"function"==typeof n.layer.on&&(n.layer.off("data:loaded"),n.layer.off("data:loading"))},this)}
n.Map.include(t),n.Map.addInitHook(e)},window);

(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"red",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("white","0 0 4px white"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);
