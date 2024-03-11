function onLoadStyles() {
    if (document.head.baseURI.includes('booking')) {
        var linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://taberu-24d0ca41bbb9.herokuapp.com/booking.css';
        document.head.appendChild(linkElement);
        console.log(linkElement.href);  // To verify the href of the newly added link
        const bookingHref = document.getElementById('book');
        bookingHref.style.fontWeight = 900;
        bookingHref.style.color = '#f5f5f5'
        bookingHref.style.fontSize = '1.5rem';

    } else if (document.head.baseURI.includes('home')) {
        const bookingHref = document.getElementById('home');
        bookingHref.style.fontWeight = 900;
        bookingHref.style.color = '#f5f5f5'
        bookingHref.style.fontSize = '1.5rem';
    } else if (document.head.baseURI.includes('contact')) {
        var linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'http://localhost:3000/contactStyles.css';
        document.head.appendChild(linkElement);
        console.log(linkElement.href);  // To verify the href of the newly added link
        const bookingHref = document.getElementById('contact');
        bookingHref.style.fontWeight = 900;
        bookingHref.style.color = '#f5f5f5'
        bookingHref.style.fontSize = '1.5rem';
    }
}





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


    navButton.classList.toggle('active');
    darkOverlay.classList.toggle('active');

    if (darkOverlay.classList.contains('active')) {
        let currentPageId = getCurrentPageId(); // Implement this function to get current page ID
        let currentPageNavItem = document.getElementById(currentPageId);
        // currentPageNavItem.classList.add('current-page');
    } else {
        // Remove highlighting when dark overlay is not active
        let currentPageNavItem = document.querySelector('.current-page');
        if (currentPageNavItem) {
            currentPageNavItem.classList.remove('current-page');
        }
    }

    if (navButton.classList.length == 2) {

        const map = document.getElementById('map')
        map.style.display = 'none';
        const darkO = document.getElementById('darkOverlay')
        darkO.style.zIndex = 4;
        const navBtn = document.getElementById('navBtn')
        navBtn.style.zIndex = 5;
        const navBoxes = document.getElementsByClassName('navBox');
        for (let i = 0; i < navBoxes.length; i++) {
            navBoxes[i].style.display = 'none';
        }

    } else {
        const map = document.getElementById('map')
        map.style.display = 'block';
        const navBoxes = document.getElementsByClassName('navBox');
        for (let i = 0; i < navBoxes.length; i++) {
            navBoxes[i].style.display = 'inline';
        }
        const navBtn = document.getElementById('navBtn')
        navBtn.style.zIndex = 1;
        const darkO = document.getElementById('darkOverlay')
        darkO.style.zIndex = 0;

    }


}


function openPdf() {
    window.open('/TaberuMenu.pdf', '_blank');
}



console.log(getCurrentPageId())

