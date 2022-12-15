function getContentWidth(element) {
    var styles = getComputedStyle(element);
    return element.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
}

function setDisplatedItemCount() {
    topSliderItemsDisplayedCount = Math.floor(getContentWidth(topSlider) / topSliderMinItemWidth) > 0 ? Math.floor(getContentWidth(topSlider) / 210) : 1;
}

function setItemWidth() {
    setExtraItems();
    topSliderItemInnerWidth = (getContentWidth(topSlider) - topSliderItemMargin * 2 * topSliderItemsDisplayedCount) / topSliderItemsDisplayedCount;
    topSliderItemOuterWidth = getContentWidth(topSlider) / topSliderItemsDisplayedCount;
    topSliderItems.forEach(item => {
        item.style.width = topSliderItemInnerWidth + "px";
        item.style.margin = topSliderItemMargin + "px";
    });
}

function topSlideTo(slideNum) {
    currentTopSlide = (slideNum + topSliderItemCount) % topSliderItemCount;
    topSliderLine.style.left = -currentTopSlide * topSliderItemOuterWidth + "px";
}

function addExtraItems() {
    let clone;
    for (let i = 0; i < topSliderItemsDisplayedCount; i++) {
        clone = topSliderItems[i].cloneNode(true)
        clone.classList.add("extra-item");
        topSliderLine.appendChild(clone);
    }
}

function removeExtraItems() {
    let item;
    for (let i = 0; i < topSliderItems.length; i++) {
        item = topSliderItems[i];
        if (item.classList.contains("extra-item")) {
            topSliderLine.removeChild(item);
        }
    }
}

function setExtraItems() {
    setDisplatedItemCount();
    removeExtraItems();
    addExtraItems();
    topSliderItems = topSliderLine.querySelectorAll(".js-line-item");
}

function setTopSliderLineDuration(duration) {
    topSliderLine.style.transitionDuration = duration / 1000 + "s";
}

function topSlidePrev() {
    if (currentTopSlide <= 0) {
        setTopSliderLineDuration(0);
        setTimeout(function() {
            setTopSliderLineDuration(topSliderDuration);
            topSlidePrev();
        }, 0)
    }
    topSlideTo(currentTopSlide - 1);
}

function topSlideNext() {
    if (currentTopSlide >= topSliderItemCount - 1) {
        setTopSliderLineDuration(0);
        setTimeout(function() {
            setTopSliderLineDuration(topSliderDuration);
            topSlideNext();
        }, 0)
    }
    topSlideTo(currentTopSlide + 1);
}

let topSlider = document.querySelector(".js-top-slider");
let topSliderLine = topSlider.querySelector(".js-line");
let topSliderItems = topSliderLine.querySelectorAll(".js-line-item");

let topSliderItemsDisplayedCount = 3;
let baseTopSliderItemCount = 5;
let topSliderItemCount = baseTopSliderItemCount + 1;
let topSliderItemMargin = 16;
let topSliderDuration = 500;
setTopSliderLineDuration(topSliderDuration);

let topSliderMinItemWidth = 250;
let topSliderItemInnerWidth;
let topSliderItemOuterWidth;

let currentTopSlide = 0;

setItemWidth();

topSlider.parentElement.querySelector(".js-prev-button").addEventListener("click", topSlidePrev);
topSlider.parentElement.querySelector(".js-next-button").addEventListener("click", topSlideNext);
window.addEventListener("resize", setItemWidth);