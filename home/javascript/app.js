
const project_nav = document.getElementById("project-nav");
const projects = document.querySelector(".projects");
const main = document.querySelector("main");

function onLoad(){
    projects.style.transform = "translateY(0)";
    projects.style.opacity = "1";
    main.style.opacity = "1";
}

// preloader
$(window).on('load', function () {
    if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
    $(this).remove();
    });
    }
    });




onLoad();