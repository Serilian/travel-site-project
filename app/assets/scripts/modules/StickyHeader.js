import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';


export class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header");
        this.createWaypoint(this.siteHeader);
        this.pageSections = document.querySelectorAll(".page-section");
        this.headerLinks = $('.primary-nav a');
        this.createPageSectionWaypoints(this.pageSections, this.headerLinks);
        this.addSmoothScrolling();
    }

    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
    }

    createWaypoint(element) {
        const trigger = document.querySelector(".large-hero__title");
        new Waypoint({
            element: trigger,
            handler: (direction) => {
                if (direction === 'down') {
                    element.classList.add("site-header--dark");
                } else {
                    element.classList.remove("site-header--dark");
                }

            },
        });
    }

    createPageSectionWaypoints(collection, headerLinks) {
        collection.forEach((item) => {
            new Waypoint({
                element: item,
                handler: (direction) => {
                    if (direction === 'down') {
                        let matchingHeaderId = item.getAttribute("data-matching-link");
                        headerLinks.removeClass('is-current-link');
                        document.querySelector(matchingHeaderId).classList.add("is-current-link");
                    }
                },
                offset: "18%"
            });
            new Waypoint({
                element: item,
                handler: (direction) => {
                    if (direction === 'up') {
                        let matchingHeaderId = item.getAttribute("data-matching-link");
                        headerLinks.removeClass('is-current-link');
                        document.querySelector(matchingHeaderId).classList.add("is-current-link");
                    }
                },
                offset: "-40%%"
            });
        });
    }
}