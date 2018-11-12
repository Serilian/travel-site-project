import waypoint from '../../../../node_modules/waypoints/lib/noframework.waypoints';

export class RevealOnScroll {

    constructor(elementSelector, offset) {
        this.itemsToReveal = document.querySelectorAll(elementSelector);
        this.hideInitially();
        this.createWaypoints(offset);
    }

    hideInitially () {
        this.itemsToReveal.forEach( item => {
            item.classList.add('reveal-item');
        })
    }

    createWaypoints(offset) {
        this.itemsToReveal.forEach(item => {
            new Waypoint({
                element: item,
                handler: ()=>{
                    item.classList.add('reveal-item--is-visible');
                },
                offset: `${offset}%`
            })
        })
    }


}