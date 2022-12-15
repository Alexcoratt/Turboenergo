let fp = document.querySelector(".js-flying-panel");
let fpLinks = document.querySelectorAll(".js-flying-panel-link");

let fpLinkSize = fp.offsetHeight * 2 / 3;
let dm;

let dropMenus = fp.querySelectorAll(".drop-menu");
let hideTimeout;

dropMenus.forEach(dropMenu => {
    dropMenu.addEventListener("mouseenter", event => {
        clearTimeout(hideTimeout);
        dropMenu.classList.remove("hidden");
    });
    dropMenu.addEventListener("mouseleave", event => {
        dropMenu.classList.add("hidden");
    });
});

fpLinks.forEach(link => {
    link.style.height = fpLinkSize + "px";
    link.style.width = fpLinkSize + "px";
    dm = link.parentElement.querySelector(".drop-menu");
    if (dm) {
        dm.classList.add("hidden");
        link.addEventListener("mouseenter", event => {
            dropMenus.forEach(dropMenu => {
                dropMenu.classList.add("hidden");
            });
            link.parentElement.querySelector(".drop-menu").classList.remove("hidden");
        });
        link.addEventListener("mouseleave", event => {
            hideTimeout = setTimeout(function() {
                link.parentElement.querySelector(".drop-menu").classList.add("hidden");
            }, 250);
        });
    }
});
