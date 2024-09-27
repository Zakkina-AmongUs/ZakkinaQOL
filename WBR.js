// ==UserScript==
// @name         WBR qol (Autoclick NEXT)
// @namespace    http://tampermonkey.net/
// @version      2024-09-27
// @description  Automatically clicks the "Next" button on whatbeatsrock.com
// @author       Zakkina
// @match        https://www.whatbeatsrock.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whatbeatsrock.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to click the button if it exists
    function clickNextButton() {
        var buttons = document.getElementsByClassName("myButton");
        if (buttons.length > 0) {
            buttons[0].click(); // Clicks the first button with class "myButton"
        }
    }

    // Set an interval to click the button every 2 seconds (2000ms)
    setInterval(clickNextButton, 2000);
})();
