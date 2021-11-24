const header = document.querySelector('header');
const user_location = document.getElementById('user-location');
const user_location_list = document.getElementById('user-location-list');
const iss_list = document.getElementById('iss-list');
user_location.addEventListener('click', getLocation);
const user_location_side = document.getElementById('user-location-side');
user_location_side.addEventListener('click', getLocation);
const iss_btn = document.getElementById('iss');
iss_btn.addEventListener('click', activateTimer);
const iss_btn_side = document.getElementById('iss-side');
iss_btn_side.addEventListener('click', activateTimer);
const quiz_btn = document.getElementById('quiz');
quiz_btn.addEventListener('click', activateQuiz);
const quiz_list = document.getElementById('quiz-mode');
const quiz_btn_side = document.getElementById('quiz-side');
quiz_btn_side.addEventListener('click', activateQuiz);
const answer = document.getElementById('result');
const quiz_question = document.getElementById('quiz-question');
const next_question = document.getElementById('next-question');
const exit_quiz = document.getElementById('exit-quiz');
const exit_quiz_btn = document.getElementById('exit-quiz-bar');
exit_quiz_btn.addEventListener('click', activateQuiz);
next_question.addEventListener('click', computerChoice);
const select_country = document.getElementById('country');
const settings = document.getElementById('settings');
settings.addEventListener('click', changeMapStyle);
const settings_side = document.getElementById('settings-side');
settings_side.addEventListener('click', changeMapStyle);
const search = document.getElementById('search');
const stop_follow = document.getElementById("stop-follow");
const map = document.getElementById("map");
const quiz_container = document.getElementById("quiz-container");
const winning_streak = document.getElementById('score');
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', openSideMenu);
const side_menu = document.getElementById('side-menu');
const loading_screen = document.getElementById('loading');

const api_key = '70ee96dfc29aab191c8ebe3d0acddc70';

// LOADING SCRIPT -----------------------------------------------------------------------------------------------------------------
!function(n,i){"function"==typeof define&&define.amd?define(["leaflet","spin.js"],function(i,t){n(i,t)}):"object"==typeof exports?module.exports=function(i,t){return void 0===i&&(i=require("leaflet")),void 0===t&&(t=require("spin.js")),n(i,t),i}:void 0!==i&&i.L&&i.Spinner&&n(i.L,i.Spinner)}(function(n,i){var t={spin:function(n,t){n?(this._spinner||(this._spinner=new i(t).spin(this._container),this._spinning=0),this._spinning++):--this._spinning<=0&&this._spinner&&(this._spinner.stop(),this._spinner=null)}},e=function(){this.on("layeradd",function(n){n.layer.loading&&this.spin(!0),"function"==typeof n.layer.on&&(n.layer.on("data:loading",function(){this.spin(!0)},this),n.layer.on("data:loaded",function(){this.spin(!1)},this))},this),this.on("layerremove",function(n){n.layer.loading&&this.spin(!1),"function"==typeof n.layer.on&&(n.layer.off("data:loaded"),n.layer.off("data:loading"))},this)}
n.Map.include(t),n.Map.addInitHook(e)},window);

(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"red",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("white","0 0 4px white"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);
//--------------------------------------------------------------------------------------------------------------------------------
var map_bright = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
	minZoom: 2,
	maxZoom: 18
});
var markerIcon = L.icon({
    iconUrl: 'images/marker.svg',
    iconSize: [42, 55],
    iconAnchor: [20 , 60]
});
let timer;
let iss_active = false;
let geojson;
let markers = L.markerClusterGroup({
    showCoverageOnHover: false
});
let cluster_active = false;
let cluster_arr = [];
let double_click_active = true;
let single_click_active = true;
const mymap = L.map('map', {
    layers: map_bright
});
mymap.setView([10, 0], 3);
var southWest = L.latLng(-92.18, -193.30);
var northEast = L.latLng(92.10, 193.30);
var mapBounds = L.latLngBounds(southWest, northEast);
mymap.setMaxBounds(mapBounds);
var marker = L.marker([110 , 63], {icon: markerIcon});
marker.addTo(mymap);

let geojson_arr = [];

var user_location_btn = L.easyButton('<img id=\"easy-button-icon\" src=\"images/marker-easybutton.png\">', getLocation, 'Find Your Location');
user_location_btn.addTo(mymap);
var user_cluster_btn = L.easyButton({
    states: [{
        stateName: 'cluster',
        icon:      '<img id=\"cluster-icon\" src=\"images/cluster3.png\">',
        title:     'Allow Multiple Markers',
        onClick: activateCluster
        }]
})
user_cluster_btn.addTo(mymap);

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
    if (quiz){
        return 1500;
    } else {
        return 3300;
    }
}

//ACTIVATE CLUSTER -------------------------------------------------------------------------

function activateCluster(){
    const cluster_icon = document.getElementById('cluster-icon');
    if (!cluster_active){
        cluster_active = true;
        mymap.addLayer(markers);
        if(mymap.hasLayer(marker)){
            // cluster_arr.push(marker); 
            markers.addLayer(marker);
        };
        console.log("Cluster Mode Active");        
        cluster_icon.style.filter = "saturate(1)";
        cluster_icon.style.opacity = 1;
    } else {
        cluster_arr.forEach(element => {
            mymap.removeLayer(element);
        })
        if(mymap.hasLayer(layer)){mymap.removeLayer(layer)};
        cluster_active = false;
        markers.clearLayers();
        console.log("Cluster Mode Disabled");      
        cluster_icon.style.filter = "saturate(0.5)";
        cluster_icon.style.opacity = 0.4;
        cluster_arr = [];
    }
}

//MAP SETUP---------------------------------------------------------------------------------

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

mymap.doubleClickZoom.disable();

map_bright.on('loading', function (event){
    mymap.fireEvent('dataloading', loading)
})

map_quiz.on('loading', function (event){
    mymap.fireEvent('dataloading', loading)
})



mymap.on('dblclick', function (event){
    if (double_click_active && !quiz){   
        if (!cluster_active){     
            marker.setLatLng(event.latlng); 
            if (!mymap.hasLayer(marker)){
                marker.addTo(mymap);
            } 
            double_click_active = false;  
            loading();
            mymap.setView(event.latlng);
            marker.bindPopup(`${event.latlng}`);
            getMarkerInfo(event.latlng);
        } else {
            let extra_marker = L.marker([0,0], {icon: markerIcon});
            extra_marker.setLatLng(event.latlng);
            // extra_marker.addTo(mymap);
            markers.addLayer(extra_marker);
            cluster_arr.push(extra_marker);
            getMarkerInfo(event.latlng, extra_marker);
        }
    }
})

mymap.on('click', function (event){
    closeSideMenu();
    if (quiz && single_click_active){
        single_click_active = false;
        loading();
        marker.setLatLng(event.latlng);  
        getMarkerInfoQuiz(event.latlng);         
    }
})

function activateTimer(){
    loading();
    if (iss_active === true){        
        if(mymap.hasLayer(issmarker)){mymap.removeLayer(issmarker)};
        clearInterval(timer);
        iss_active = false;
        stop_follow.style.display = "none";
        stop_follow.innerHTML = "Where is the ISS?";
        mymap.setView([0,0], 3);
    } else {
        if(!mymap.hasLayer(issmarker)){issmarker.addTo(mymap)};
        timer = setInterval(iSS, 1000);
        iss_active = true;
        stop_follow.style.display = "flex";
    }
}

stop_follow.addEventListener("click", activateTimer);

var issIcon = L.icon({
    iconUrl: 'images/ISS2.svg',
    iconSize: [70, 30],
    iconAnchor: [50, 53],
    popupAnchor: [-3, -76]
});

const issmarker = L.marker([65,19], {icon: issIcon}).bindPopup("<div id=\"iss-div\"><img id=\"iss-logo\" src=\"images/iss_logo.png\"><h3>International Space Station</h3></div>");



//ONLOAD----------------------------------------------------------------------------------

$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
        $(this).remove();
        });
    }
    getCountryPolygonsHover();
    getLocation();    
    getCountryNames();
    })

//SIDE MENU ----------------------------------------------------------------------------------------------
let side_menu_open = false;

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


//USER LOCATION (onload)---------------------------------------------------------------------------
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
    marker.setLatLng([coordinates.lat, coordinates.lng]);
    if(!mymap.hasLayer(marker)){marker.addTo(mymap)};
    mymap.setView([coordinates.lat, coordinates.lng], 5);
    getMarkerInfo(coordinates);
  }

//DOUBLE CLICK MARKER---------------------------------------------------------------------------

function getMarkerInfo(event, extra_marker) {

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
                const description = result['data']['results']['0']['formatted'];
                const lat = event.lat.toFixed(2);
                const lng = event.lng.toFixed(2);
                player_choice = name;
                select_country.value = code_country;
                if (player_choice === computer_choice){                    
                    answer.innerHTML = "Correct!";
                    answer.style.display = "inline-block";
                    answer.style.background = "lightgreen";
                } else {
                    answer.innerHTML = "Wrong";
                    answer.style.display = "inline-block";
                    answer.style.background = "red";
                }
                getWeatherInfo(code_country, name, currency, currency_symbol, time_zone_name, time_zone, county, description, lat, lng, extra_marker);
                
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    }); 
    
};

// GET WEATHER INFO

function getWeatherInfo(code_country, name, currency, currency_symbol, time_zone_name, time_zone, county, description, latitude, longitude, extra_marker) {  

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
            
            // console.log(JSON.stringify(result));

            if (result.status.name == "ok") {
                const weather_main = result['data']['current']['weather']['0']['main'];
                const weather_info = result['data']['current']['weather']['0']['description'];
                const weather = weather_info[0].toUpperCase() + weather_info.substring(1);
                const temperature = result['data']['current']['temp'];
                const humidity = result['data']['current']['humidity'];
                const wind = result['data']['current']['wind_speed'];

                getCountryPolygonForMarker(code_country, name, currency, currency_symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind, extra_marker);
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    }); 
    
};

//WHERE IS THE ISS---------------------------------------------------------------------------

function iSS() {
    if (mymap.hasLayer(layer)){mymap.removeLayer(layer)};
    if (mymap.hasLayer(marker)){mymap.removeLayer(marker)};


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

// GET COUNTRY NAMES FOR INPUT SELECT (onload) (only runs once)

function getCountryNames() {    


    $.ajax(
        {
        url: "php/polygons.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            
            // console.log(JSON.stringify(result));

            if (result.status.name == "ok") {
                const empty_arr = [];
                const arr = result['data']['features'];
                geojson = arr;
                arr.forEach(element => {
                    const country_name_for_select = element['properties']['name'];
                    if (country_name_for_select != 'New Caledonia'){
                        empty_arr.push(country_name_for_select);
                    }                    
                });
                polygonCountryNameArr(empty_arr);
                const ordered_arr = empty_arr.sort();                
                createCountryArr(ordered_arr);
                ordered_arr.forEach(country => {

                    const tag = document.createElement("option");
                    function getCode(x){
                        arr.forEach(element => {
                            if (element['properties']['name'] === x){
                                tag.value = element['properties']['iso_a2'];
                            }
                        })
                    }
                    getCode(country);
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

// CREATE COUNTRYS ARRAY

function polygonCountryNameArr(arr){
    return arr;
}

let country_array;
function createCountryArr(arr){
    country_array = arr;
}

// GET COUNTRY POLYGON WHEN USING SELECT BAR ------------------------------ -------------------------------------------------------------------
let country_selected = "";
let layer = []; //layer is the single highlighted country

$('#country').change(function getCountryPolygon() {    
    loading();

    $country_value = $('#country').val();    
    
    geojson.forEach(element => {
        if (element['properties']['iso_a2'] === $country_value){
            myGeoJSON = element;
            mymap.removeLayer(layer);
            let country_name = element['properties']['name'];
            let country_code = element['properties']['iso_a2'];                                                       
            layer = L.geoJSON(myGeoJSON);                        
            layer.addTo(mymap); 
            getCountryInfo(country_name, country_code);                                        
            mymap.fitBounds(layer.getBounds());
            layer.setStyle({
                color: 'yellow',
                weight: 1,
                fillOpacity: 0.15,
        
            });
            country_selected = element['properties']['name'];
        }
    })
});      
                    
                    
// GET COUNTRY POLYGON FOR MARKER ------------------------------------------------------------------------------------------------------------------------------

function getCountryPolygonForMarker(code, name, currency, symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind, extra_marker) {    
    if (!quiz){  
        geojson.forEach(element => {
            if (element['properties']['iso_a2'] === code){
                myGeoJSON = element;
                mymap.removeLayer(layer);                                                    
                layer = L.geoJSON(myGeoJSON);                        
                layer.addTo(mymap); 
                createPopupForMarker(name, code, currency, symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind, extra_marker);                                        
                if (!cluster_active){ 
                        layer.setStyle({
                        color: 'yellow',
                        weight: 1,
                        fillOpacity: 0.1                            
                    });
                } else {
                    layer.setStyle({
                        color: 'yellow',
                        weight: 0,
                        fillOpacity: 0  
                    });
                }
                country_selected = element['properties']['name'];                
            }
        })
    } else {
        showPlayerChoice(code);
    }
 }
// GET COUNTRY INFO FOR POPUS-------------------------------------------------------------------

function getCountryInfo(name, code, symbol) {    

    $.ajax(
        {
        url: "php/getCityInfo.php",
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
                $.when(exchangeRate(currency)).done(createPopup(name, code, capital, population, currency, area, continent, symbol)); 
                
            };
            
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log("ERROR");
        }
        
    }); 
    
};

// CREATE THE POPUP-------------------------------------------------------------------


function createPopup(name, code, capital, population, currency, area, continent, symbol){

    if (population >= 1000000000){
        population = `${(population / 1000000000).toFixed(1)} billion`;
    }
    else if (population >= 100000000){
        population = `${(population / 1000000).toFixed(0)} million`;
    } else if (population >= 1000000){
        population = `${(population / 1000000).toFixed(1)} million`;
    } else if (population >= 100000){
        population = numberWithCommas(population);
    }
   
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
    
    let popup = L.popup().setContent                            
                            (`
                            <div class="popup">
                            <div id="img-container"><img id=\"flag\" src=\"images/flags/${code_lowercase}.png\" alt="flag"></div>
                            <p><span>Country:</span> <span id="country-name-popup"> ${name} </span> <span>(${code})</span></p>
                            <p><span>Capital City:</span>  ${capital}</p>
                            <p><span>Population:</span>  ${population}</p>
                            <p><span>Currency:</span>  ${currency} <span id=\"currency_symbol\"> ${symbol}</p>
                            <p><span>EXR:</span> USD/${currency} <span id="exchange-rate">----</span></p>
                            <p><span>Area:</span>  ${area} Km<sup>2</sup></p>
                            <p><span>Continent:</span>  ${continent}</p>
                            <p><a id="search-wiki" href=\"https://en.wikipedia.org/wiki/${name}\" target=\"_blank\">${name} Wikipedia <img id="little-flag" src=\"images/flags/${code_lowercase}.png\" alt=""><span id="search-popup-box"><img id="search-popup" src="images/icons/search-solid.svg"></i></span></a></p>
                            </div>
                            `);
    layer.bindPopup(popup);  
    layer.openPopup();    
}


function numberWithCommas(x) { 
    // Insert comma to mark thousand
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// CREATE POPUP FOR MARKER-------------------------------------------------------------------


function createPopupForMarker(name, code, currency, symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind, extra_marker){

    if (!symbol){
        symbol = '';
    }    
    if (!county){
        county = 'N/A';
    }    
    wind = (wind * 2.23694).toFixed(0);
    let wind_kmph = (wind * 1.609344).toFixed(0);

    layer.closePopup();      
    let code_lowercase = code.toLowerCase();
       
    let popup = L.responsivePopup().setContent                            
                            (`
                            <div class="popup">
                            <div id="img-container"><img id="flag" src=\"images/flags/${code_lowercase}.png\" alt="flag"></div>
                            <p><span>Country:</span> <span id="country-name-popup"> ${name} </span> <span>(${code})</span></p>
                            <p><span>Currency:</span>  ${currency} <span id="currency-symbol"> ${symbol}</span></p>
                            <p><span>Time Zone:</span>  ${time_zone} (${time_zone_name})</p>
                            <p><span>Place:</span>  ${description}</p>    
                            <p><span>County:</span>  ${county}</p> 
                            <details>
                            <summary>Weather Info</summary>
                            <div id="box"><p id="weather"><span>Weather:</span>  ${weather}<div id="weather-icon-box"><img id="weather-icon" src="images/${weather_main}.svg"></div></div></p> 
                            <p><span>Temperature:</span>  ${temperatureConverter(temperature)}&#8451;</p> 
                            <p><span>Humidity:</span>  ${humidity}%</p>
                            <p><span>Wind Speed:</span>  ${wind_kmph} <span id="speed">km/h</span></p>       
                            </details>                   
                            </div>
                            `);
    if (!cluster_active){                            
        marker.bindPopup(popup);
        marker.openPopup();  
        let bounds = marker.getLatLng();
        mymap.setView([bounds.lat, bounds.lng]);
        marker.on('click', function(){
            select_country.value = code;
        })
    } else {
        extra_marker.bindPopup(popup);
        extra_marker.openPopup();  
        let bounds = extra_marker.getLatLng();
        mymap.setView([bounds.lat, bounds.lng]);

        // Change Country in Select when Marker in Cluster is clicked
        extra_marker.on('click', function(){
            select_country.value = code;
        })
    }
    
}

function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    const temp = valNum-273.15;
    return Math.round(temp);
  }

// EXCHANGE RATE ---------------------------------------------------------------------------------------

function exchangeRate(currency) {   
            
    return $.ajax(
        {
        url: "php/getExchangeRate.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {              
            // console.log(JSON.stringify(result));              
            
            if (result.status.name == "ok") {
                let exr= result['data']['rates'][currency];
                document.getElementById('exchange-rate').innerHTML = exr.toFixed(2);
            }            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log("error polygons hover");
        }
    });             
};

// GET COUNTRY POLYGONS HOVER (onload)-------------------------------------------------------------------


    function getCountryPolygonsHover() {   
            
            $.ajax(
                {
                url: "php/polygons.php",
                type: 'POST',
                dataType: 'json',
                
                success: function(result) {                       
                    
                    if (result.status.name == "ok") {
                        const arr = result['data']['features'];              
                            arr.forEach(element => {
                                    myGeoJSON = element;
                                    let layer_hover = L.geoJSON(myGeoJSON);                                       
                                    geojson_arr.push(layer_hover);                                                                                 
                            })
                            //console.log(geojson_arr);
                            highlightOnHover();                        
                    }            
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // your error code
                    console.log("error polygons hover");
                }
            });             
        };

// FIX COUNTRY NAMES FOR QUIZ
function fixName(country){
    
    if (country === "Democratic Republic of the Congo"){
        return country = "Dem. Rep. Congo";
    } else if (country === "South Sudan"){
        return country= "S. Sudan";
    } else if (country === "Czechia"){
        return country= "Czech Rep.";
    } else if (country === "North Korea"){
        return country= "Dem. Rep. Korea";
    } else if (country === "South Korea"){ 
        return country= "Korea";
    } else if (country === "The Bahamas"){ 
        return country= "Bahamas";
    } else if (country === "Sahrawi Arab Democratic Republic"){ 
        return country= "W. Sahara";
    } else if (country === "Falkland Islands"){ 
        return country= "Falkland Is.";
    } else if (country === "Dominican Republic"){ 
        return country= "Dominican Rep.";
    } else if (country === "Equatorial Guinea"){ 
        return country= "Eq. Guinea";
    } else if (country === "Congo-Brazzaville"){ 
        return country= "Congo";
    } else if (country === "Central African Republic"){ 
        return country= "Central African Rep.";
    } else if (country === "Solomon Islands"){ 
        return country= "Solomon Is.";
    } else if (country === "Laos"){ 
        return country= "Lao PDR";
    } else if (country === "North Macedonia"){ 
        return country= "Macedonia";
     } else if (country === "Palestinian Territory"){ 
        return country= "Palestine";
     } else if (country === "Bosnia and Herzegovina"){ 
        return country= "Bosnia and Herz.";
     } else if (country === "East Timor"){ 
        return country= "Timor-Leste";
     } else {
        return country;
    }
}

//-------------------------------------------------------------------------

function highlightOnHover(){
    geojson_arr.forEach(element => {
        element.addTo(mymap);
    })
    defaultHover();
}

function defaultHover(){
    geojson_arr.forEach(element => {
        element.setStyle({
            color: 'white',
            weight: 0,
            fillOpacity: 0

        });
        element.on('mouseover', function (e){
            this.setStyle({
                color: 'white',
                weight: 0.2,
                fillOpacity: 0.3
            });
        });    
        element.on('mouseout', function (e){
            this.setStyle({
                color: 'white',
                weight: 0,
                fillOpacity: 0
            });
        });
    });
}

function quizHover(){
    geojson_arr.forEach(element => {
        element.setStyle({
            weight: 0.3,
            fillOpacity: 0,
            color: "brown"
    
        });
        element.on('mouseover', function (e){
            this.setStyle({
                weight: 0.3,
                fillOpacity: 0.3,
                color: "brown"
            });
        });    
        element.on('mouseout', function (e){
            this.setStyle({
                weight: 0.3,
                fillOpacity: 0,
                color: "brown"
            });
        });
    })
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

function brightQuizMap(){
    map_quiz.addTo(mymap);
    map.style.backgroundColor = "#007AAC";
}

//QUIZ ------------------------------------------------------------------------------------------------------------------------


let computer_layer;
let winning_streak_count = 0;
let computer_choice = "Iran";
let player_choice = "none";
let mistake_count = 0;
let quiz_layer;

function activateQuiz(){         
    computerChoice();  // generate computer question
    mymap.hasLayer(marker) ? mymap.removeLayer(marker) : null; //remove marker from map
    markers.clearLayers(); // remove cluster
    mymap.setView([10,0],3); // Set Map viewport
    loading();
    if (!quiz){
        quiz = true;        
        changeNavBar(quiz);
        quizHover();
        answer.style.display = "none";

        //CHANGE MAP STYLE
        if (map_style === "bright"){
            mymap.removeLayer(map_bright);
        } else {
            mymap.removeLayer(map_dark);
        };     
        brightQuizMap();         
        

    } else {
        quiz = false;
        quiz_btn_side.innerHTML = "Quiz Mode";
        changeNavBar(quiz);
        defaultHover();     
        answer.style.display = "none";

        //CHANGE MAP STYLE
        if (mymap.hasLayer(computer_layer)){mymap.removeLayer(computer_layer)};
        if (mymap.hasLayer(quiz_layer)){mymap.removeLayer(quiz_layer)};
        mymap.removeLayer(map_quiz);
        if (map_style === "bright"){
            brightMap();
        } else {
            darkMap();
        };
        
    }
}

function changeNavBar(quiz){
    let easy_btn = document.querySelector('.easy-button-button');
    let cluster_btn = document.querySelector('.cluster-active');
    if(quiz){
        exit_quiz.style.display = "flex";
        easy_btn.style.display = "none";
        cluster_btn.style.display = "none";
        setTimeout(function(){
            quiz_container.style.display = "flex";
        }, 4000);
        mymap.removeLayer(user_cluster_btn);
    } else {        
        quiz_container.style.display = "none";
        exit_quiz.style.display = "none";  
        easy_btn.style.display = "block";
        cluster_btn.style.display = "block";
    }
}

function computerChoice(){
    answer.style.transform = "translateY(0)";
    answer.style.opacity = "0"; 
    if(mymap.hasLayer(layer)){mymap.removeLayer(layer)};
    if(mymap.hasLayer(quiz_layer)){mymap.removeLayer(quiz_layer)};
    if(mistake_count > 0){mymap.removeLayer(computer_layer)};
    mymap.setView([10,0], 3);
    answer.style.display = "none";
    answer.style.background = "white";
    let random_number = Math.floor(Math.random() * country_array.length);
    computer_choice = country_array[random_number];    
    console.log(computer_choice);
    quiz_question.innerHTML = `Where is ${computer_choice}?`;
}

function getMarkerInfoQuiz(event) {  

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
                player_choice = result['data']['results']['0']['components']['country'];
                if (player_choice){
                    getCountryPolygonForMarker(player_choice);
                    if (fixName(player_choice) === computer_choice){                    
                        answer.innerHTML = "<img class=\"icon\" id=\"times\" src=\"images/icons/check.svg\">  Correct!";
                        answer.style.display = "inline-block";
                        answer.style.backgroundColor = "lightgreen";
                        answer.style.color = "black";
                        winning_streak_count++;
                        score.innerHTML = `Winning Streak: ${winning_streak_count}`;
                        score.style.fontSize = "1.03rem";
                        setTimeout(function(){
                            score.style.fontSize = "1rem";
                        }, 300);
                    } else {
                        answer.innerHTML = `<img class="icon" id="times" src="images/icons/times.svg">  Incorrect.<br> <span id=\"incorrect-answer\">You guessed: <b>${fixName(player_choice)}</b></span>`;
                        answer.style.display = "inline-block";
                        answer.style.backgroundColor = "white";
                        answer.style.color= "#cc0000";    
                        winning_streak_count = 0;
                        score.innerHTML = `Winning Streak: 0`;
                        score.classList.add("shake-score");   
                        setTimeout(function(){
                            score.classList.remove("shake-score");
                        }, 250);   
                    }
                    answer.style.transform = "translateY(-150%)";
                    answer.style.opacity = "1";   
                }          
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    }); 
    
};

jQuery.fn.shake = function() {
    this.each(function(i) {
        $(this).css({ "position": "relative" });
        for (var x = 1; x <= 3; x++) {
            $(this).animate({ left: -25 }, 10).animate({ left: 0 }, 50).animate({ left: 25 }, 10).animate({ left: 0 }, 50);
        }
    });
    return this;
} 

function showPlayerChoice(choice){
    choice = fixName(choice);
    if (mymap.hasLayer(quiz_layer)){mymap.removeLayer(quiz_layer)};  

    geojson.forEach(element => {
        if (element['properties']['name'] === choice){
            let country_code_for_quiz_flag_correct = element['properties']['iso_a2']; 
            myGeoJSON = element;                                              
            quiz_layer = L.geoJSON(myGeoJSON);                        
            quiz_layer.addTo(mymap);           
            if (choice === computer_choice){
                quiz_layer.setStyle({
                    color: 'green',
                    weight: 1,
                    fillOpacity: 0.5,        
                });  
                quiz_layer.bindPopup(`<p id=\"quiz-choice\">${computer_choice}</p> <div id=\"img-container\"><img id=\"flag\" src=\"images/flags/${country_code_for_quiz_flag_correct.toLowerCase()}.png\"></div>`, {autoclose: false}).openPopup();                        
            } else {
                mistake_count++;
                quiz_layer.setStyle({
                    color: 'red',
                    weight: 1,
                    fillOpacity: 0.5,        
                });  
                quiz_layer.bindPopup(choice, {autoclose: false}).openPopup();               
                geojson.forEach(element => {
                    if (element['properties']['name'] === computer_choice){                        
                        myGeoJSON = element;                             
                        let country_code_for_quiz_flag = element['properties']['iso_a2'];  
                        if (mymap.hasLayer(computer_layer)){mymap.removeLayer(computer_layer)};                                                
                        computer_layer = L.geoJSON(myGeoJSON);                        
                        computer_layer.addTo(mymap);
                        computer_layer.setStyle({
                            color: 'green',
                            weight: 1,
                            fillOpacity: 0.5,        
                        });
                        let popup_quiz = `<p id=\"quiz-choice\">${computer_choice}</p> <div id=\"img-container\"><img id=\"flag\" src=\"images/flags/${country_code_for_quiz_flag.toLowerCase()}.png\" alt=\"flag\"></div>`;
                        computer_layer.bindPopup(popup_quiz, {autoclose: false}).openPopup();
                        let bounds = computer_layer.getBounds();
                        let center = bounds.getCenter();
                        mymap.setView([center.lat - 15, center.lng]);
                    }    
                })             
            }
        }
    })
}
