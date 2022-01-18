const audio = document.getElementById('audio');
const header = document.getElementById('ban');
const image = document.getElementById('song-image');
const songTitle = document.getElementById('song-title');
let play_state = false;


$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
        $(this).remove();
        });
    }    
    })

function reseticon(){
    document.querySelector("#song2 i").className = "far fa-play-circle";
    document.querySelector("#song1 i").className = "far fa-play-circle";
    document.querySelector("#song3 i").className = "far fa-play-circle";
    document.querySelector("#song4 i").className = "far fa-play-circle";
    document.querySelector("#song5 i").className = "far fa-play-circle";
    document.querySelector("#song6 i").className = "far fa-play-circle";
    document.querySelector("#song7 i").className = "far fa-play-circle";
    document.querySelector("#song8 i").className = "far fa-play-circle";
    document.querySelector("#song9 i").className = "far fa-play-circle";    
    document.querySelector("#song10 i").className = "far fa-play-circle";
}

const arr = ["Crazy In Love", "Come On Eileen", "Shut Up and Dance", "You Make My Dreams", "We Found Love", "Old Town Road", "Good as Hell", "Happy", "Dancing In The Moonlight", "Uptown Funk"];

function play(x){
    audio.play();
    document.querySelector(x).className ="far fa-arrow-alt-circle-left"; 
    image.classList.add('play');
    play_state = true;
}

function reset(x){
    audio.load();
    document.querySelector(x).className ="far fa-play-circle"; 
    image.classList.remove('play');
    play_state = false;
}

document.addEventListener("click", function changeBackground(){
    
    for (let x = 0; x < arr.length; x++){
        if (songTitle.innerHTML === arr[x] && !audio.paused){
            let song = `song${x + 1}`;
            let highlight = document.getElementById(song);
            highlight.style.backgroundColor = "#262626";            
        } 
    };
    for (let i = 0; i < arr.length; i++){
        if (songTitle.innerHTML != arr[i]){
            let sing = `song${i + 1}`;
            document.getElementById(sing).style.backgroundColor = "#181818";
        }
    }
});

 //SONGS

document.getElementById("song1").addEventListener("click", function(){  
        reseticon(); 
        const songB = "song-box1";
        const songL = "song1";
        const song = "#song1 i";
        audio.src = "./music/Crazy in Love BT.mp3";   
        play_state ? reset(song) : play(song);
        image.src = "./images/beyonce.jpg";
        songTitle.innerHTML = "Crazy In Love";
});

document.getElementById("song2").addEventListener("click", function(){
    reseticon();   
    const song = "#song2 i";
    audio.src = "./music/Come on Eileen BT.mp3";     
    play_state ? reset(song) : play(song);
    image.src = "./images/come on eileen.jpg"; 
    songTitle.innerHTML = "Come On Eileen";
});

document.getElementById("song3").addEventListener("click", function(){
    reseticon();    
    const song = "#song3 i";     
    audio.src = "./music/Shut Up and Dance BT.mp3";     
    play_state ? reset(song) : play(song);
    image.src = "./images/shut up and dance.jpg"; 
    songTitle.innerHTML = "Shut Up and Dance";
});

document.getElementById("song4").addEventListener("click", function(){
    reseticon();    
    const song = "#song4 i";     
    audio.src = "./music/You Make My Dreams BT.mp3";     
    play_state ? reset(song) : play(song); 
    image.src = "./images/you make my dreams.jpeg"; 
    songTitle.innerHTML = "You Make My Dreams";
});

document.getElementById("song5").addEventListener("click", function(){
    reseticon();     
    const song = "#song5 i";    
    audio.src = "./music/We Found Love BT.mp3";     
    play_state ? reset(song) : play(song); 
    image.src = "./images/we found love.jpg"; 
    songTitle.innerHTML = "We Found Love";
});

document.getElementById("song6").addEventListener("click", function(){
    reseticon();     
    const song = "#song6 i";    
    audio.src = "./music/Old Town Road BT.mp3";     
    play_state ? reset(song) : play(song); 
    image.src = "./images/old town road.jpg"; 
    songTitle.innerHTML = "Old Town Road";
});

document.getElementById("song7").addEventListener("click", function(){
    reseticon();     
    const song = "#song7 i";    
    audio.src = "./music/Good as Hell BT.mp3";     
    play_state ? reset(song) : play(song); 
    image.src = "./images/good as hell.jpg"; 
    songTitle.innerHTML = "Good as Hell";
});

document.getElementById("song8").addEventListener("click", function(){
    reseticon();     
    const song = "#song8 i";    
    audio.src = "./music/Happy BT.mp3";     
    play_state ? reset(song) : play(song); 
    image.src = "./images/happy.jpg"; 
    songTitle.innerHTML = "Happy";
});

document.getElementById("song9").addEventListener("click", function(){
    reseticon();     
    const song = "#song9 i";    
    audio.src = "./music/Dancing In The Moonlight BT.mp3";     
    play_state ? reset(song) : play(song); 
    image.src = "./images/dancing in the moonlight.jpg"; 
    songTitle.innerHTML = "Dancing In The Moonlight";
});

document.getElementById("song10").addEventListener("click", function(){
    reseticon();     
    const song = "#song10 i";    
    audio.src = "./music/Uptown Funk BT New.mp3";     
    play_state ? reset(song) : play(song); 
    image.src = "./images/uptown funk.jpg"; 
    songTitle.innerHTML = "Uptown Funk";
});






