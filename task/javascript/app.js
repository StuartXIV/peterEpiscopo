
const project_nav = document.getElementById("project-nav");
const projects = document.querySelector(".projects");
const main = document.querySelector("main");

function onLoad(){
    projects.style.transform = "translateY(0)";
    projects.style.opacity = "1";
    main.style.opacity = "1";
}

onLoad();