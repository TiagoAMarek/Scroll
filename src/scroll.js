
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

    // Return scroll's direction
    PRIVATE.getDirection = function(origin, destiny){
        return destiny > origin ? 'down' : destiny === origin ? 'equal' : 'up';
    };

    // Verify if scroll can go down
    PRIVATE.verifyScrollStop = function() {
        return PRIVATE.auxValue !== element.scrollTop ? true : false;
    };

    // Moves the scroll down by 10px
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

    // Moves the scroll Up by 10px
    PRIVATE.scrollHandlerUp = function (destiny) {
        if(element.scrollTop > destiny){
            element.scrollTop -= 10;
        } else {
            element.scrollTop -= (element.scrollTop - destiny);
        }
    };

    // Starts the animation event with interval
    PRIVATE.startEvent = function(that){
        var destiny = document.querySelector(that.hash).offsetTop,
            sameValue = false;

        var direction = PRIVATE.getDirection(element.scrollTop, destiny);

        direction === 'equal' ? sameValue = true : sameValue = false;

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
    PRIVATE.eventHandler = function(anchors) {
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].addEventListener('click', function(ev) {
                ev.preventDefault(); // prevent default anchor in href
                PRIVATE.startEvent(this);
            });
        };
    };

    // Starts the application
    PUBLIC.init = function(data) {
        var anchors = document.querySelectorAll('.anchor');
        if (anchors.length === 0) {
            throw "There's no anchors to handle";
        }

        PRIVATE.configureSettings(data);
        PRIVATE.eventHandler(anchors);
    };

    return PUBLIC;
};
