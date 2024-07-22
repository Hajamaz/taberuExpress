





onLoadStyles()

function getCurrentPageId() {
    // Get the pathname from the URL
    let pathname = window.location.pathname;

    // Extract the relevant part of the pathname
    // This could be, for example, the last segment of the path
    let segments = pathname.split('/');
    let currentPageId = segments[segments.length - 1];

    // Remove any file extensions or query parameters
    currentPageId = currentPageId.split('.')[0];

    return currentPageId;
}

function toggleNav() {
    let navButton = document.querySelector('.nav-button');
    let darkOverlay = document.querySelector('#darkOverlay');
    let currentPageId = getCurrentPageId(); // Move this outside the if-else block

    navButton.classList.toggle('active');
    darkOverlay.classList.toggle('active');

    if (darkOverlay.classList.contains('active')) {

        let borderLines = document.getElementById('navBtn');
        borderLines.style.border = '0px';

        // Remove highlighting when dark overlay is not active

        if (currentPageId) {
            currentPageId.classList.remove('current-page');
        }
    } else {
        let borderLines = document.getElementById('navBtn');
        borderLines.style.borderTop = 'solid white 5px';
        borderLines.style.borderBottom = 'solid white 5px';
    }

    // Optimize the z-index and display properties
    const map = document.getElementById('map');
    const darkO = document.getElementById('darkOverlay');
    const navBtn = document.getElementById('navBtn');
    const navBoxes = document.getElementsByClassName('navBox');

    if (navButton.classList.contains('active')) {
        map.style.display = 'none';
        darkO.style.zIndex = 4;
        navBtn.style.zIndex = 5;
        for (let i = 0; i < navBoxes.length; i++) {
            navBoxes[i].style.display = 'none';
        }
    } else {
        map.style.display = 'block';
        for (let i = 0; i < navBoxes.length; i++) {
            navBoxes[i].style.display = 'inline';
        }
        navBtn.style.zIndex = 1;
        darkO.style.zIndex = 0;
    }
}






// document.addEventListener("DOMContentLoaded", function () {
//     var lazyImages = document.querySelectorAll(".lazy-load");

//     function lazyLoad() {
//         lazyImages.forEach(function (image) {
//             if (isInViewport(image) && !image.src) {
//                 image.src = image.dataset.src;
//             }
//         });
//     }

//     // Initial check
//     lazyLoad();

//     // Listen for scroll event
//     window.addEventListener("scroll", lazyLoad);
// });

// // Function to check if an element is in the viewport
// function isInViewport(elem) {
//     var bounding = elem.getBoundingClientRect();
//     return (
//         bounding.top >= 0 &&
//         bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
//     );
// }
