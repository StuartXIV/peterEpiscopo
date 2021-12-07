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
// const quiz_btn = document.getElementById('quiz');
// quiz_btn.addEventListener('click', activateQuiz);
// // const quiz_btn_side = document.getElementById('quiz-side');
// quiz_btn_side.addEventListener('click', activateQuiz);
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
stop_follow.addEventListener("click", activateTimer);
const map = document.getElementById("map");
const quiz_container = document.getElementById("quiz-container");
const winning_streak = document.getElementById('score');
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', openSideMenu);
const side_menu = document.getElementById('side-menu');
const loading_screen = document.getElementById('loading');

const api_key = '70ee96dfc29aab191c8ebe3d0acddc70';

/* LOADING SCRIPT */

!function(n,i){"function"==typeof define&&define.amd?define(["leaflet","spin.js"],function(i,t){n(i,t)}):"object"==typeof exports?module.exports=function(i,t){return void 0===i&&(i=require("leaflet")),void 0===t&&(t=require("spin.js")),n(i,t),i}:void 0!==i&&i.L&&i.Spinner&&n(i.L,i.Spinner)}(function(n,i){var t={spin:function(n,t){n?(this._spinner||(this._spinner=new i(t).spin(this._container),this._spinning=0),this._spinning++):--this._spinning<=0&&this._spinner&&(this._spinner.stop(),this._spinner=null)}},e=function(){this.on("layeradd",function(n){n.layer.loading&&this.spin(!0),"function"==typeof n.layer.on&&(n.layer.on("data:loading",function(){this.spin(!0)},this),n.layer.on("data:loaded",function(){this.spin(!1)},this))},this),this.on("layerremove",function(n){n.layer.loading&&this.spin(!1),"function"==typeof n.layer.on&&(n.layer.off("data:loaded"),n.layer.off("data:loading"))},this)}
n.Map.include(t),n.Map.addInitHook(e)},window);

(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"red",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("white","0 0 4px white"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);


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
let geojson_arr = [];
let geojson;
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
let cluster_active = false;
let double_click_active = true;
let single_click_active = true;
let side_menu_open = false;
let capitals_active = false;
let popup_active = false;
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
    if (quiz && single_click_active){
        points_of_interest_cluster.clearLayers();
        single_click_active = false;
        loading();
        marker.setLatLng(event.latlng);  
        getMarkerInfoQuiz(event.latlng);         
    }
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
    // marker.setLatLng([coordinates.lat, coordinates.lng]);
    // mymap.setView([coordinates.lat, coordinates.lng], 5);
    getMarkerInfo(coordinates, "false");
  }

  
/* MARKER generated with DOUBLECLICK */

function getMarkerInfo(event, select) {
    console.log("getMarkerInfo()");
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
                    getWeatherInfo(code_country, name, currency, currency_symbol, time_zone_name, time_zone, county, lat, lng);
                }
            }        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });     
};

function getCovidInfo(code_country, population) {
    console.log("getCovidInfo()");
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


/* REQUEST WEATHER INFO */

function getWeatherInfo(code_country, name, currency, currency_symbol, time_zone_name, time_zone, county, latitude, longitude, extra_marker) {  
    console.log("getWeatherInfo()");
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
                const weather = weather_info[0].toUpperCase() + weather_info.substring(1);
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

                $('#weather-description').html(weather);
                $('#weather-icon').attr('src', `images/${weather_main}.svg`);
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
                $('#weather-icon-tomorrow').attr('src', `images/${weather_tomorrow}.svg`);
                $('#weather-icon-dayafter').attr('src', `images/${weather_dayafter}.svg`);
                


                //getCountryPolygonForMarker(code_country, name, currency, currency_symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind, extra_marker);
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
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
    console.log("getCountryCapitals()");
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
            // your error code
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


// CREATE COUNTRYS ARRAY ------------------------------------------------------------------------------

function polygonCountryNameArr(arr){
    return arr;
}

let country_array;
function createCountryArr(arr){
    country_array = arr;
}

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
    console.log("getCountryPolygon()");
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
                
// GET COUNTRY POLYGON FOR MARKER ------------------------------------------------------------------------------------------------------------------------------

// function getCountryPolygonForMarker(code, name, currency, symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind, extra_marker) {    
//     if (!quiz){  
//         geojson.forEach(element => {
//             if (element['properties']['iso_a2'] === code){
//                 myGeoJSON = element;
//                 mymap.removeLayer(layer);                                                    
//                 layer = L.geoJSON(myGeoJSON);                        
//                 layer.addTo(mymap); 
//                 createPopupForMarker(name, code, currency, symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind, extra_marker);                                        
//                 if (!cluster_active){ 
//                         layer.setStyle({
//                         color: 'yellow',
//                         weight: 1,
//                         fillOpacity: 0.05                            
//                     });
//                 } else {
//                     layer.setStyle({
//                         color: 'yellow',
//                         weight: 0,
//                         fillOpacity: 0  
//                     });
//                 }
//                 country_selected = element['properties']['name'];                
//             }
//         })
//     } else {
//         showPlayerChoice(code);
//     }
//  }

// GET COUNTRY INFO FOR POPUS-------------------------------------------------------------------

function getCountryInfo(name, code) {   
    console.log("getCountryInfo()");
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

    $('#flag').attr('src', `images/flags/${code_lowercase}.png`);
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
    $('#little-flag').attr('src', `images/flags/${code_lowercase}.png`);

    points_of_interest_cluster.clearLayers(); 
    getPointsOfInterest(name);
    getCovidInfo(code.toUpperCase(), population);
    exchangeRate(currency, symbol);
}


function numberWithCommas(x) { 
    // Insert comma to mark thousand
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


/* CREATE POPUP FOR MAIN MARKER */

function createPopupForMarker(name, code, currency, symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind, extra_marker){

    if (!symbol){
        symbol = '';
    }    
    if (!county){
        county = 'N/A';
    }    

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
    getPointsOfInterest(name);    
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
                            <div class="popup">
                            <div id="img-container"><img id=\"flag\" src=\"images/flags/${code.toLowerCase()}.png\" alt="flag"></div>
                            <p id="capital-p"><span id="capital-name-popup"> ${name} </span></p>
                            <p><span>Country:</span>  ${country}  <span>(${code})</span></p>
                            <p><a id="search-wiki" href=\"https://en.wikipedia.org/wiki/${name}\" target=\"_blank\">${name} Wikipedia <img id="little-flag" src=\"images/flags/${code.toLowerCase()}.png\" alt=""><span id="search-popup-box"><img id="search-popup" src="images/icons/search-solid.svg"></i></span></a></p>
                            </div>
                            `);
    capital_marker.bindPopup(popup);
    capital_marker.addTo(mymap);
    capital_marker.on('click', () => {
        select_country.value = code;
    })
};

//EXCHANGE RATE SELECT FUNCTION


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
                        // console.log(name);
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



/* QUIZ */

let quiz_layer;
let computer_layer;
let winning_streak_count = 0;
let computer_choice = "Iran";
let player_choice = "none";


function activateQuiz(){      
    getCountryPolygonsHover();       
    computerChoice();  // generate computer question
    points_of_interest_cluster.clearLayers();
    mymap.hasLayer(marker) ? mymap.removeLayer(marker) : null; //remove marker from map
    markers.clearLayers(); // remove cluster
    capitals_active ? activateCapitals() : null;
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
        // quiz_btn_side.innerHTML = "Quiz Mode";
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
        getCountryPolygon();
        
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
        }, 2000);
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
    removeLayer();
    if(mymap.hasLayer(quiz_layer)){mymap.removeLayer(quiz_layer)};
    if(mymap.hasLayer(computer_layer)){mymap.removeLayer(computer_layer)};
    mymap.setView([10,0], 3);
    answer.style.display = "none";
    answer.style.background = "white";
    let random_number = Math.floor(Math.random() * country_array.length);
    computer_choice = country_array[random_number];    
    quiz_question.innerHTML = `Where is ${computer_choice}?`;
}


const getMarkerInfoQuiz = (event) => {  

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
                        answer.innerHTML = "<img class=\"icon\" id=\"check\" src=\"images/icons/check.svg\">  Correct!";
                        answer.style.display = "inline-block";
                        answer.style.backgroundColor = "#04FE59";
                        answer.style.color = "white";
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


const showPlayerChoice = (choice) => {
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







// GET COUNTRY POLYGONS HOVER (onload)-------------------------------------------------------------------

const getCountryPolygonsHover = () => {   
            
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
                    highlightOnHover();                        
            }            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error polygons hover");
        }
    });             
};


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


/* EASY BUTTON FUNCTIONS */

function displayInfo(){
    closePopup("close all");
    changeTopLeftIconPopup();
}

function displayEXR() {    
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
        }, 1500)
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

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });