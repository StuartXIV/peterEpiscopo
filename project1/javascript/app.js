document.getElementById('user-location').addEventListener('click', getLocation);
document.getElementById('iss').addEventListener('click', activateTimer);
document.getElementById('quiz').addEventListener('click', activateQuiz);
const quiz_question = document.getElementById('quiz-question');
const next_question = document.getElementById('next-question');
next_question.addEventListener('click', computerChoice);
const select_country = document.getElementById('country');
const settings = document.getElementById('settings');
const search = document.getElementById('search');
const stop_follow = document.getElementById("stop-follow");
const map = document.getElementById("map");

const api_key = '70ee96dfc29aab191c8ebe3d0acddc70';


// LOADING SCRIPT -----------------------------------------------------------------------------------------------------------------
!function(n,i){"function"==typeof define&&define.amd?define(["leaflet","spin.js"],function(i,t){n(i,t)}):"object"==typeof exports?module.exports=function(i,t){return void 0===i&&(i=require("leaflet")),void 0===t&&(t=require("spin.js")),n(i,t),i}:void 0!==i&&i.L&&i.Spinner&&n(i.L,i.Spinner)}(function(n,i){var t={spin:function(n,t){n?(this._spinner||(this._spinner=new i(t).spin(this._container),this._spinning=0),this._spinning++):--this._spinning<=0&&this._spinner&&(this._spinner.stop(),this._spinner=null)}},e=function(){this.on("layeradd",function(n){n.layer.loading&&this.spin(!0),"function"==typeof n.layer.on&&(n.layer.on("data:loading",function(){this.spin(!0)},this),n.layer.on("data:loaded",function(){this.spin(!1)},this))},this),this.on("layerremove",function(n){n.layer.loading&&this.spin(!1),"function"==typeof n.layer.on&&(n.layer.off("data:loaded"),n.layer.off("data:loading"))},this)}
n.Map.include(t),n.Map.addInitHook(e)},window);

(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"red",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("white","0 0 4px white"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);
//--------------------------------------------------------------------------------------------------------------------------------


let timer;
let iss_active = false;

const mymap = L.map('map');
mymap.setView([10, 0], 3);
var southWest = L.latLng(-92.18, -193.30);
var northEast = L.latLng(92.10, 193.30);
var mapBounds = L.latLngBounds(southWest, northEast);
mymap.setMaxBounds(mapBounds);
console.log(mymap.getBounds());
var marker = L.marker([0 , 0]);

window.onload = loading();

function loading(){
    mymap.spin(true);
    setTimeout(function(){
        mymap.spin(false);
    }, 4000);
}

//MAP SETUP---------------------------------------------------------------------------------

var map_dark = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	minZoom: 2,
	maxZoom: 18,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    
    });

var map_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
	minZoom: 2,
	maxZoom: 18
});

var map_quiz = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
    minZoom: 2,
	maxZoom: 18
});

map_layer.addTo(mymap);
mymap.doubleClickZoom.disable();



mymap.on('dblclick', function (event){
    loading();
    mymap.setView(event.latlng);
    marker.setLatLng(event.latlng).bindPopup(`${event.latlng}`);
    getMarkerInfo(event.latlng);
})

function activateTimer(){
    loading();
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

const issmarker = L.marker([65,19], {icon: issIcon}).bindPopup("<div id=\"iss-div\"><img id=\"iss-logo\" src=\"images/iss_logo.png\"><h3>International Space Station</h3></div>");
issmarker.addTo(mymap);


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
    if (iss_active){activateTimer()};
    loading();
    console.log("Getting User Location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
function showPosition(position) {
    marker.setLatLng([position.coords.latitude,position.coords.longitude]).addTo(mymap);
    mymap.setView([position.coords.latitude, position.coords.longitude], 5);
    getUserLocationInfo(position.coords.latitude, position.coords.longitude);
  }

  // Retrieve Country Code of User Location
function getUserLocationInfo(latitude, longitude) {    

    


    $.ajax(
        {
        url: "php/getUserInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: latitude,
            lng: longitude
        },
        
        success: function(result) {
            
            // console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $code = result['data']['0']['countryCode'];
                $name = result['data']['0']['countryName'];
                getCountryPolygonForUser($code);
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 
    
};

//DOUBLE CLICK MARKER---------------------------------------------------------------------------

function getMarkerInfo(event) {  

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
            
            // console.log(JSON.stringify(result));

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
                console.log(player_choice);
                if (player_choice === computer_choice){
                    console.log("well done");
                } else {
                    console.log("You fucked it");
                }
                getWeatherInfo(code_country, name, currency, currency_symbol, time_zone_name, time_zone, county, description, lat, lng);
                //getCountryPolygonForMarker(code_country, name, currency, currency_symbol, time_zone_name, time_zone, county, description);
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    }); 
    
};

// GET WEATHER INFO

function getWeatherInfo(code_country, name, currency, currency_symbol, time_zone_name, time_zone, county, description, latitude, longitude) {  

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

                getCountryPolygonForMarker(code_country, name, currency, currency_symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind);
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    }); 
    
};

//WHERE IS THE ISS---------------------------------------------------------------------------

function iSS() {    
    mymap.removeLayer(layer);


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

// GET COUNTRY NAMES FOR INPUT SELECT

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
                arr.forEach(element => {
                    const country_name_for_select = element['properties']['name'];
                    empty_arr.push(country_name_for_select);
                });
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

let country_array;
function createCountryArr(arr){
    country_array = arr;
    console.log(country_array);
    console.log(country_array.length)
}

// GET COUNTRY POLYGONS -------------------------------------------------------------------
let country_selected = "";
let layer = [];

$('#search').click(function getCountryPolygons() {    
        loading();

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


// GET USER POLYGON

function getCountryPolygonForUser(code, symbol) {    
        console.log("getCountry " + code);
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
                        if (element['properties']['iso_a2'] === code){
                            myGeoJSON = element;
                            mymap.removeLayer(layer);
                            let country_name = element['properties']['name'];                                                     
                            layer = L.geoJSON(myGeoJSON);                        
                            layer.addTo(mymap); 
                            getCountryInfo(country_name, code, symbol);                                        
                            mymap.fitBounds(layer.getBounds());
                            layer.setStyle({
                                color: 'yellow',
                                weight: 1,
                                fillOpacity: 0.1,
                        
                            });
                            country_selected = element['properties']['name'];
                        }
                    })


                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
        
    }

// GET COUNTRY POLYGON FOR MARKER

    function getCountryPolygonForMarker(code, name, currency, symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind) {    
        
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
                        if (element['properties']['iso_a2'] === code){
                            myGeoJSON = element;
                            mymap.removeLayer(layer);                                                    
                            layer = L.geoJSON(myGeoJSON);                        
                            layer.addTo(mymap); 
                            createPopupForMarker(name, code, currency, symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind);                                        
                            // mymap.fitBounds(layer.getBounds());
                            if (!quiz){
                                layer.setStyle({
                                    color: 'yellow',
                                    weight: 1,
                                    fillOpacity: 0.1,
                            
                                });
                            } else {
                                layer.setStyle({
                                    color: 'green',
                                    weight: 1,
                                    fillOpacity: 0.2,
                                });
                            }
                            country_selected = element['properties']['name'];
                        }
                    })


                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
        
    }


// GET COUNTRY INFO FOR POPUS-------------------------------------------------------------------
// let country_capital = "";


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
            
            // console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                // console.log(result['data'][0]['capital']);
                let capital = result['data'][0]['capital'];
                let population = result['data'][0]['population'];
                let currency = result['data'][0]['currencyCode'];
                let area = result['data'][0]['areaInSqKm'];
                let continent = result['data'][0]['continentName'];
                createPopup(name, code, capital, population, currency, area, continent, symbol);
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
                            <div id="img-container"><img id="flag" src=\"images/flags/${code_lowercase}.png\" alt="flag"></div>
                            <p><span>Country:</span> <span id="country-name-popup"> ${name} </span> <span>(${code})</span></p>
                            <p><span>Capital City:</span>  ${capital}</p>
                            <p><span>Population:</span>  ${population}</p>
                            <p><span>Currency:</span>  ${currency} <span id="currency_symbol"> ${symbol}</p>
                            <p><span>Area:</span>  ${area} Km<sup>2</sup></p>
                            <p><span>Continent:</span>  ${continent}</p>
                            <p><a id="search-wiki" href=\"https://en.wikipedia.org/wiki/${name}\" target=\"_blank\">${name} Wikipedia <img id="little-flag" src=\"images/flags/${code_lowercase}.png\" alt=""><span id="search-popup-box"><i id="search-popup" class="fas fa-search"></i></span></a></p>
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


function createPopupForMarker(name, code, currency, symbol, time_zone_name, time_zone, county, description, weather_main, weather, temperature, humidity, wind){

    if (!symbol){
        symbol = '';
    }

    
    if (!county){
        county = 'N/A';
    }
    
    wind = (wind * 2.23694).toFixed(0);
    let wind_kmph = (wind * 1.609344).toFixed(0);

    layer.closePopup();  
    
    console.log(weather_main);

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
    marker.bindPopup(popup);
    marker.openPopup();  
    let bounds = marker.getLatLng();
    mymap.setView([bounds.lat, bounds.lng]);
    
}

function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    const temp = valNum-273.15;
    return Math.round(temp);
  }

// GET COUNTRY POLYGONS HOVER-------------------------------------------------------------------
let layer_hover = [];

function getCountryPolygonsHover() {    
        
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
                            myGeoJSON = element;
                            layer_hover = L.geoJSON(myGeoJSON);                            
                            layer_hover.addTo(mymap);   
                            if (!quiz){    
                                layer_hover.setStyle({
                                    weight: 0,
                                    fillOpacity: 0,
                            
                                });
                                layer_hover.on('mouseover', function (e){
                                    this.setStyle({
                                        color: 'white',
                                        weight: 0.2,
                                        fillOpacity: 0.3,
                                    });
                                });    
                                layer_hover.on('mouseout', function (e){
                                    this.setStyle({
                                        color: 'white',
                                        weight: 0,
                                        fillOpacity: 0,
                                    });
                                });
                            } else {
                                layer_hover.setStyle({
                                    color: 'brown',
                                    weight: 0.5,
                                    fillOpacity: 0
                                });
                                layer_hover.on('mouseover', function (e){
                                    this.setStyle({
                                        color: 'brown',
                                        weight: 0.5,
                                        fillOpacity: 0.3,
                                    });
                                });    
                                layer_hover.on('mouseout', function (e){
                                    this.setStyle({
                                        color: 'brown',
                                        weight: 0.5,
                                        fillOpacity: 0,
                                    });
                                });
                            }
                                                   
                    })
                }            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
        
    };

// MAP SETTINGS Bright/Dark

let map_style = "light";
let quiz = false;

$('#settings').click(function(){
    loading();
    if (map_style === "light"){
        mymap.removeLayer(map_layer);      
        map_dark.addTo(mymap);
        map_style = "dark";
        map.style.backgroundColor = "#222222";
        settings.innerHTML = "<i class=\"fas fa-sun\"></i>Bright Mode";
    } else {
        mymap.removeLayer(map_dark);
        map_layer.addTo(mymap);
        map_style = "light";
        settings.innerHTML = "<i class=\"fas fa-moon\"></i>Dark Mode";
    }
    
    
});

//QUIZ

let computer_choice = "Iran";
let player_choice = "none";

function activateQuiz(){
    loading();
    if (!quiz){
        getCountryPolygonsHover();
        mymap.removeLayer(map_layer);  
        mymap.removeLayer(layer);
        mymap.removeLayer(marker);    
        map_quiz.addTo(mymap);
        mymap.setView([10, 0], 3);
        map.style.backgroundColor = "#007AAC";
        quiz = true;
        computerChoice();
        setTimeout(function(){quiz_question.style.display = "inline-block"; next_question.style.display = "inline-block"}, 4000);

    } else {
        quiz_question.style.display = "none";
        mymap.removeLayer(map_quiz);
        map_layer.addTo(mymap);
        quiz = false;
    }
}

function computerChoice(){
    let random_number = Math.floor(Math.random() * country_array.length);
    computer_choice = country_array[random_number];
    quiz_question.innerHTML = `Where is ${computer_choice}?`;
}

getCountryNames();
getCountryPolygonsHover();
