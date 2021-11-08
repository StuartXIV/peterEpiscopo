document.getElementById('user-location').addEventListener('click', getLocation);
document.getElementById('iss').addEventListener('click', activateTimer);
const select_country = document.getElementById('country');
const settings = document.getElementById('settings');
const search = document.getElementById('search');
const stop_follow = document.getElementById("stop-follow");

let timer;
let iss_active = false;

const mymap = L.map('map');
mymap.setView([0, 0], 3);

//MAP SETUP---------------------------------------------------------------------------------

var map_dark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	minZoom: 2,
	maxZoom: 18,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });

var map_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
	minZoom: 2,
	maxZoom: 18
});
map_layer.addTo(mymap);

function activateTimer(){
    
    if (iss_active === true){
        clearInterval(timer);
        console.log("clear");
        iss_active = false;
        stop_follow.style.display = "none";
        mymap.setZoom(3);
    } else {
        timer = setInterval(iSS, 1000);
        iss_active = true;
        stop_follow.style.display = "inline-block";
    }
}

stop_follow.addEventListener("click", activateTimer);



var issIcon = L.icon({
    iconUrl: 'images/ISS2.svg',
    iconSize: [70, 30],
    iconAnchor: [50, 53],
    popupAnchor: [-3, -76]
});

const marker = L.marker([0,0]).addTo(mymap);
// const originalmarker = L.marker([51,0]).addTo(mymap);
const issmarker = L.marker([65,19], {icon: issIcon}).bindPopup("International Space Station");
issmarker.addTo(mymap);

const polygon = L.polygon([
    
])

//ONLOAD----------------------------------------------------------------------------------

$(window).on('load', function () {
    if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
    $(this).remove();
    });
    }
    getLocation();
    })



//USER LOCATION ---------------------------------------------------------------------------
function getLocation() {
    clearInterval(timer);
    console.log("Getting User Location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
function showPosition(position) {
    marker.setLatLng([position.coords.latitude, position.coords.longitude]);
    mymap.setView([position.coords.latitude, position.coords.longitude], 5);
  }

//WHERE IS THE ISS---------------------------------------------------------------------------

function iSS() {    

    


    $.ajax(
        {
        url: "php/getISSInfo.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            
            // console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $lat = result['data']['latitude'];
                $lng = result['data']['longitude'];
                issmarker.setLatLng([$lat, $lng]);
                mymap.setView([$lat, $lng]);
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 
    
};

function getCountryNames() {    


    $.ajax(
        {
        url: "php/polygons.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            
            // console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                const arr = result['data']['features'];
                arr.forEach(element => {
                    const country = element['properties']['name'];
                    const tag = document.createElement("option");
                    tag.value = element['properties']['iso_a2'];
                    var text = document.createTextNode(country);
                    tag.appendChild(text);
                    select_country.appendChild(tag);
                });
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 
    
};

// GET COUNTRY POLYGONS -------------------------------------------------------------------
let country_selected = "";
let layer = [];

$('#search').click(function getCountryPolygons() {    

        $country_value = $('#country').val();
        
        $.ajax(
            {
            url: "php/polygons.php",
            type: 'POST',
            dataType: 'json',
            
            success: function(result) {              
                // console.log(JSON.stringify(result));
                
                
                if (result.status.name == "ok") {
                    const arr = result['data']['features'];
                    
                    arr.forEach(element => {
                        if (element['properties']['iso_a2'] === $country_value){
                            myGeoJSON = element;
                            mymap.removeLayer(layer);
                            layer = L.geoJSON(myGeoJSON).bindPopup(element['properties']['name']);                            
                            layer.addTo(mymap); 
                            layer.openPopup();             
                            mymap.fitBounds(layer.getBounds());
                            layer.setStyle({
                                color: 'yellow',
                                weight: 1,
                                fillOpacity: 0.2,
                        
                            });
                            country_selected = element['properties']['name'];
                            console.log(country_selected);
                        }
                    })


                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
        
    });

// MAP SETTINGS

let map_style = "light";

$('#settings').click(function(){
    if (map_style === "light"){
        mymap.removeLayer(map_layer);      
        map_dark.addTo(mymap);
        map_style = "dark";
        settings.innerHTML = "<i class=\"fas fa-sun\"></i>Bright Mode";
    } else {
        mymap.removeLayer(map_dark);
        map_layer.addTo(mymap);
        map_style = "light";
        settings.innerHTML = "<i class=\"fas fa-moon\"></i>Dark Mode";
    }
    
    
});


getCountryNames();

