let parallaxElems = document.querySelectorAll(".js-parallax");

parallaxElems.forEach(elem => {
    elem.style.top = elem.getAttribute("data-parallax-top-start") + "px";
});

window.addEventListener("scroll", event => {
    parallaxElems.forEach(elem => {
        event.preventDefault();
        elem.style.top = +elem.getAttribute("data-parallax-top-start") + 
            scrollY * elem.getAttribute("data-parallax-ratio") + "px";
    });
});

let flyingPanel = document.querySelector(".flying-panel");
flyingPanel.classList.add("hidden");
let arrows = document.querySelector(".arrows");
let arrowShakingInterval = setInterval(function() {
    arrows.classList.toggle("shift-down");
}, 400);

window.addEventListener("scroll", event => {
    if (scrollY > 100) {
        if (flyingPanel.classList.contains("hidden"))
            flyingPanel.classList.remove("hidden");
        if (!arrows.classList.contains("hidden"))
            arrows.classList.add("hidden");
    }
    else {
        if (!flyingPanel.classList.contains("hidden"))
            flyingPanel.classList.add("hidden");
        if (arrows.classList.contains("hidden"))
            arrows.classList.remove("hidden");
    }
});

let sloganBox = document.querySelector(".js-slogan-box");
setInterval(function() {
    sloganBox.classList.toggle("glowing");
}, 3000);