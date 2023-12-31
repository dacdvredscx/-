var carousel = document.querySelector('.carousel');
var carouselContent = document.querySelector('.carousel-content');
var slides = document.querySelectorAll('.slide');
var arrayOfSlides = Array.prototype.slice.call(slides);
var carouselDisplaying;
var screenSize;
setScreenSize();
var lengthOfSlide;

function addClone() {
    var lastSlide = carouselContent.lastElementChild.cloneNode(true);
    lastSlide.style.left = (-lengthOfSlide) + "px";
    carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
}

function removeClone() {
    var firstSlide = carouselContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
}

function moveSlidesRight() {
    var slides = document.querySelectorAll('.slide');
    var slidesArray = Array.prototype.slice.call(slides);
    var width = 0;

    slidesArray.forEach(function (el, i) {
        el.style.left = width + "px";
        width += lengthOfSlide;
    });
    addClone();
}
moveSlidesRight();

function moveSlidesLeft() {
    var slides = document.querySelectorAll('.slide');
    var slidesArray = Array.prototype.slice.call(slides);
    slidesArray = slidesArray.reverse();
    var maxWidth = (slidesArray.length - 1) * lengthOfSlide;

    slidesArray.forEach(function (el, i) {
        maxWidth -= lengthOfSlide;
        el.style.left = maxWidth + "px";
    });
}

window.addEventListener('resize', setScreenSize);

function setScreenSize() {
    carouselDisplaying = 1;
    getScreenSize();
}

function getScreenSize() {
    var slides = document.querySelectorAll('.slide');
    var slidesArray = Array.prototype.slice.call(slides);
    lengthOfSlide = (carousel.offsetWidth / carouselDisplaying);
    var initialWidth = -lengthOfSlide;
    slidesArray.forEach(function (el) {
        el.style.width = lengthOfSlide + "px";
        el.style.left = initialWidth + "px";
        initialWidth += lengthOfSlide;
    });
}

var rightNav = document.querySelector('.nav-right');
rightNav.addEventListener('click', moveLeft);

var moving = true;
function moveRight() {
    if (moving) {
        moving = false;
        var lastSlide = carouselContent.lastElementChild;
        lastSlide.parentNode.removeChild(lastSlide);
        carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
        removeClone();
        var firstSlide = carouselContent.firstElementChild;
        firstSlide.addEventListener('transitionend', activateAgain);
        moveSlidesRight();
    }
}

function activateAgain() {
    var firstSlide = carouselContent.firstElementChild;
    moving = true;
    firstSlide.removeEventListener('transitionend', activateAgain);
}

var leftNav = document.querySelector('.nav-left');
leftNav.addEventListener('click', moveRight);

function moveLeft() {
    if (moving) {
        moving = false;
        removeClone();
        var firstSlide = carouselContent.firstElementChild;
        firstSlide.addEventListener('transitionend', replaceToEnd);
        moveSlidesLeft();
    }
}

function replaceToEnd() {
    var firstSlide = carouselContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
    carouselContent.appendChild(firstSlide);
    firstSlide.style.left = ((arrayOfSlides.length - 1) * lengthOfSlide) + "px";
    addClone();
    moving = true;
    firstSlide.removeEventListener('transitionend', replaceToEnd);
}

var logo = document.getElementById("logo");
logo.addEventListener("click", function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});