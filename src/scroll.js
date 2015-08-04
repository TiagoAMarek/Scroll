
/**
* @author Tiago Alves Marek
**/

var Scroll = function () {
    'use strict';

    var PUBLIC = this,
        PRIVATE = {},
        element = document.querySelector('body');

    PRIVATE.auxValue = 0;
    PRIVATE.settings = {};

    // Define settings
    PRIVATE.configureSettings = function(data){
        PRIVATE.settings.speed = data.speed ? data.speed : 10;
    };

    // Return scrolls direction
    PRIVATE.getDirection = function(origin, destiny){
        return destiny > origin ? 'down' : destiny === origin ? 'equal' : 'up';
    };

    // Verifying if scroll can go down
    PRIVATE.verifyScrollStop = function() {
        return PRIVATE.auxValue !== element.scrollTop ? true : false;
    };

    // Moves scroll down by 10px
    PRIVATE.scrollHandlerDown = function (destiny) {
        var sameValue = false;

        var el = element.scrollTop + 10;
        if(el < destiny){
            element.scrollTop = PRIVATE.auxValue += 10;
            sameValue = PRIVATE.verifyScrollStop();
        } else {
            element.scrollTop += (destiny - element.scrollTop);
            sameValue = PRIVATE.verifyScrollStop();
        }
        return sameValue;
    };

    // Moves scroll Up by 10px
    PRIVATE.scrollHandlerUp = function (destiny) {
        if(element.scrollTop > destiny){
            element.scrollTop -= 10;
        } else {
            element.scrollTop -= (element.scrollTop - destiny);
        }
    };

    // Starts animation event with interval
    PRIVATE.startEvent = function(that){
        var destiny = document.querySelector(that.hash).offsetTop,
            sameValue = false,
            direction;

        direction = PRIVATE.getDirection(element.scrollTop, destiny);
        sameValue = direction === 'equal' ? true : false;

        var interval = window.setInterval(function() {
            if(direction === 'down') {
                sameValue = PRIVATE.scrollHandlerDown(destiny);
            } else if (direction === 'up') {
                PRIVATE.scrollHandlerUp(destiny);
            }

            if(element.scrollTop === destiny || sameValue === true){
                clearInterval(interval);
                PRIVATE.auxValue = 0;
            }
        }, PRIVATE.settings.speed);
    };

    // Handle click events in every <a> with class .anchor
    PRIVATE.eventHandler = function() {
        element.addEventListener('click', function(ev) {
            if(ev.target.className === 'anchor'){
                ev.preventDefault(); // prevent default anchor in href
                PRIVATE.startEvent(ev.target);
            }
        });
    };

    // Starts the application
    PUBLIC.init = function(data) {
        PRIVATE.configureSettings(data);
        PRIVATE.eventHandler();
    };

    return PUBLIC;
};
