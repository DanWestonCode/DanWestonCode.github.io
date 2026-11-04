//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    var autoStopVideos = function () {
        //  Grab all my portfolio modals...
        const portfolioModals = document.querySelectorAll('[id^="portfolioModal"]');
        //  Cache for all the iframe video src
        var portfolioVideoSrc = [];
        
        var videoIndex = 0;
        for(let index = 0; index < portfolioModals.length; index++)
        {
            //  Grab the iframe in the modal 
            const videoContainer = portfolioModals[index].querySelector('iframe');
            //  No video here, all good, carry on
            if (!videoContainer) continue;

            //  Cache the video src so we can auto-stop the video.
            portfolioVideoSrc[videoIndex] = videoContainer.src;

            let myIndex = videoIndex++;
            // Remove the YouTube iframe completely
            portfolioModals[index].addEventListener('hidden.bs.modal', function () {
                //  Remove from container, this stops the video...
                videoContainer.src = '';
            });

            // Remove the YouTube iframe completely
            portfolioModals[index].addEventListener('show.bs.modal', function () {
                //  Add it back in so when someone comes back to watch the cool stuff, it's there again....
                videoContainer.src = portfolioVideoSrc[myIndex];
            });
        }
    };

    // Shrink the navbar 
    navbarShrink();

    //  Add handling to stop all videos in portfolio modules
    autoStopVideos();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});

