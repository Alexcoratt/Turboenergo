function getContentWidth(element) {
    var styles = getComputedStyle(element);
    return element.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
}

function calculateItemSize(slider, itemMargin, visibleItemCount) {
    return (getContentWidth(slider) - itemMargin * 2 * visibleItemCount) / visibleItemCount;
}

function setSlideDuration(line, duration) {
    line.style.transitionDuration = duration / 1000 + "s";
}

function setItems(line, itemMargin, imgDir) {
    let lineItemTemplate = line.children[0];
    line.removeChild(lineItemTemplate);
    line.style.right = 0;

    let lineItem;
    for (let i = 0; i < itemCount + visibleItemCount; i++) {
        lineItem = lineItemTemplate.cloneNode(true);
        line.appendChild(lineItem)
        lineItem.querySelector("img").
            setAttribute("src", imgDir + ((i + itemCount) % itemCount + 1) + ".png");
    }
    itemCount++;
}

function slidePrev() {
    if (currentSlide <= 0){
        setSlideDuration(line, 0);
        setTimeout(function() {
            setSlideDuration(line, slideDuration);
            slidePrev();
        }, 0);
    }
    currentSlide = (currentSlide + itemCount - 1) % itemCount;
    line.style.right = currentSlide * outerItemSize + "px";
}

function slideNext() {
    if (currentSlide >= itemCount - 1){
        setSlideDuration(line, 0);
        setTimeout(function() {
            setSlideDuration(line, slideDuration);
            slideNext();
        }, 0);
    }
    currentSlide = (currentSlide + itemCount + 1) % itemCount;
    line.style.right = currentSlide * outerItemSize + "px";
}

function setItemSize() {
    visibleItemCount = Math.ceil(getContentWidth(partnerSlider) / 200);
    innerItemSize = calculateItemSize(partnerSlider, itemMargin, visibleItemCount);
    outerItemSize = calculateItemSize(partnerSlider, 0, visibleItemCount);

    for (let i = 0; i < line.children.length; i++) {
        line.children[i].style.height = innerItemSize + "px";
        line.children[i].style.width = innerItemSize + "px";
        line.children[i].style.margin = itemMargin + "px";
    }
}

let itemMargin = 8;
let itemCount = 32;

let partnerSlider = document.querySelector(".js-partner-slider");
let line = partnerSlider.querySelector(".js-line");
let slideDuration = 1000;
setSlideDuration(line, slideDuration);

let visibleItemCount = 5;
let innerItemSize;
let outerItemSize;
setItemSize();

setItems(line, itemMargin, "img/partner-logos/");

let currentSlide = 0;
let slideInterval = setInterval(slideNext, slideDuration + 2000);

window.addEventListener("resize", setItemSize);
