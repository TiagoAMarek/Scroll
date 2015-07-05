
/**
* @author Tiago Alves Marek
**/

var Scroll = function () {
    'use strict';

    var PUBLIC = this,
        PRIVATE = {},
        element = document.querySelector('body');

    PRIVATE.auxValue = 0;

    PRIVATE.scrolling = function (position) {
        var sameValue = false;

        var el = element.scrollTop + 10;
        if(el < position){
            element.scrollTop = PRIVATE.auxValue += 10;
            if(PRIVATE.auxValue !== element.scrollTop){
                sameValue = true;
            }
        } else {
            element.scrollTop += (position - element.scrollTop);
        }
        return sameValue;
    };

    PRIVATE.startEvent = function(that){
        var position = document.querySelector(that.hash).offsetTop,
            sameValue = false;

        var interval = window.setInterval(function() {
            sameValue = PRIVATE.scrolling(position);
            if(element.scrollTop >= position || sameValue === true){
                clearInterval(interval);
            }
        }, 10);
    };

    PRIVATE.eventHandler = function(anchors) {
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].addEventListener('click', function(ev) {
                ev.preventDefault();
                PRIVATE.startEvent(this);
            });
        };
    };

    PUBLIC.init = function() {
        var anchors = document.querySelectorAll('.anchor');
        if (anchors.length === 0) {
            throw "There's no anchors to handle";
        }

        PRIVATE.eventHandler(anchors);
    };

    return PUBLIC;
};
