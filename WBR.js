// ==UserScript==
// @name         Zakkina's WBR QOL
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Quality of Life improvements for whatbeatsrock.com, including autoclick, slur filtering, number bypass, and support for custom games.
// @author       Zakkina & a lil bit of ChatGPT 
// @match        https://www.whatbeatsrock.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whatbeatsrock.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Ensure the script runs after the page is fully loaded
    window.addEventListener('load', function() {

        // Create the UI container
        const uiDiv = document.createElement('div');
        uiDiv.style.position = 'fixed'; 
        uiDiv.style.bottom = '60px';  
        uiDiv.style.right = '20px';
        uiDiv.style.padding = '10px';
        uiDiv.style.backgroundColor = '#333';  
        uiDiv.style.color = '#fff';
        uiDiv.style.borderRadius = '5px';
        uiDiv.style.zIndex = '9999'; 
        uiDiv.style.fontFamily = 'Arial, sans-serif';

        const uiDiv2 = document.createElement('div');
        uiDiv2.style.position = 'relative'; 
        uiDiv2.style.padding = '5px'; 
        uiDiv2.style.backgroundColor = '#333333AA';  
        uiDiv2.style.color = '#fff';
        uiDiv2.style.borderRadius = '5px';
        uiDiv2.style.fontFamily = 'Arial, sans-serif';
        uiDiv2.style.marginBottom = '10px'; 
        uiDiv2.innerText = "Zakkina's WhatBeatsRock QOL";

        uiDiv.appendChild(uiDiv2);

        // Create the autoclick toggle button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Autoclick: OFF';
        toggleButton.style.backgroundColor = '#ff4757';
        toggleButton.style.color = '#fff';
        toggleButton.style.border = 'none';
        toggleButton.style.padding = '10px 20px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.borderRadius = '5px';
        toggleButton.style.fontSize = '14px';
        toggleButton.style.marginTop = '10px'; 

        uiDiv.appendChild(toggleButton);

        // Create the slur filtering toggle
        const slurFilterToggle = document.createElement('button');
        slurFilterToggle.textContent = 'Slur Filter: OFF';
        slurFilterToggle.style.backgroundColor = '#ff4757';
        slurFilterToggle.style.color = '#fff';
        slurFilterToggle.style.border = 'none';
        slurFilterToggle.style.padding = '10px 20px';
        slurFilterToggle.style.cursor = 'pointer';
        slurFilterToggle.style.borderRadius = '5px';
        slurFilterToggle.style.fontSize = '14px';
        slurFilterToggle.style.marginTop = '10px'; 

        uiDiv.appendChild(slurFilterToggle);

        // Create number detection bypass toggle
        const numberBypassToggle = document.createElement('button');
        numberBypassToggle.textContent = 'Number Bypass: OFF';
        numberBypassToggle.style.backgroundColor = '#ff4757';
        numberBypassToggle.style.color = '#fff';
        numberBypassToggle.style.border = 'none';
        numberBypassToggle.style.padding = '10px 20px';
        numberBypassToggle.style.cursor = 'pointer';
        numberBypassToggle.style.borderRadius = '5px';
        numberBypassToggle.style.fontSize = '14px';
        numberBypassToggle.style.marginTop = '10px'; 

        uiDiv.appendChild(numberBypassToggle);

        // Custom game support toggle
        const customGameToggle = document.createElement('button');
        customGameToggle.textContent = 'Custom Games: OFF';
        customGameToggle.style.backgroundColor = '#ff4757';
        customGameToggle.style.color = '#fff';
        customGameToggle.style.border = 'none';
        customGameToggle.style.padding = '10px 20px';
        customGameToggle.style.cursor = 'pointer';
        customGameToggle.style.borderRadius = '5px';
        customGameToggle.style.fontSize = '14px';
        customGameToggle.style.marginTop = '10px'; 

        uiDiv.appendChild(customGameToggle);

        // RGB selector and other sliders can remain unchanged...

        // Hide/Unhide Button
        const hideButton = document.createElement('button');
        hideButton.textContent = 'Hide Menu';
        hideButton.style.backgroundColor = '#1e90ff';
        hideButton.style.color = '#fff';
        hideButton.style.border = 'none';
        hideButton.style.padding = '10px 20px';
        hideButton.style.cursor = 'pointer';
        hideButton.style.borderRadius = '5px';
        hideButton.style.fontSize = '14px';
        hideButton.style.marginTop = '10px';

        // Add the hide/unhide button outside the uiDiv
        const hideButtonDiv = document.createElement('div');
        hideButtonDiv.style.position = 'fixed';
        hideButtonDiv.style.bottom = '20px'; 
        hideButtonDiv.style.right = '20px';
        hideButtonDiv.appendChild(hideButton);

        document.body.appendChild(uiDiv);
        document.body.appendChild(hideButtonDiv);

        // Autoclicking status
        let isAutoclickEnabled = false;
        let autoclickInterval;

        // Slur filtering status
        let isSlurFilterEnabled = false;

        // Number bypass status
        let isNumberBypassEnabled = false;

        // Custom game support status
        let isCustomGameEnabled = false;

        // Function to click the button if it exists
        function clickNextButton() {
            const buttons = document.getElementsByClassName("py-4 px-8 border border-1-black text-lg");
            if (buttons.length > 0) {
                buttons[0].click(); 
            }
        }

        // Toggle autoclick functionality
        toggleButton.addEventListener('click', function() {
            isAutoclickEnabled = !isAutoclickEnabled;
            if (isAutoclickEnabled) {
                toggleButton.textContent = 'Autoclick: ON';
                toggleButton.style.backgroundColor = '#2ed573'; 
                autoclickInterval = setInterval(clickNextButton, 50); 
            } else {
                toggleButton.textContent = 'Autoclick: OFF';
                toggleButton.style.backgroundColor = '#ff4757'; 
                clearInterval(autoclickInterval); 
            }
        });

        // filtering
        const bad = ["nigger", "retard", "fuck", "trannie", "cunt", "bitch", "ass", "dick", "nigga", "nigg", "heil hitler"]; // don't take it down tis for ze filters
        function filterSlurs() {
            slurs.forEach(bad => {
                const regex = new RegExp(slur, 'gi');
                document.body.innerHTML = document.body.innerHTML.replace(regex, '****');
            });
        }

        // Toggle slur filter
        slurFilterToggle.addEventListener('click', function() {
            isSlurFilterEnabled = !isSlurFilterEnabled;
            if (isSlurFilterEnabled) {
                slurFilterToggle.textContent = 'Filter: ON';
                slurFilterToggle.style.backgroundColor = '#2ed573';
                filterSlurs(); 
            } else {
                slurFilterToggle.textContent = 'Filter: OFF';
                slurFilterToggle.style.backgroundColor = '#ff4757';
            }
        });

        // Bypass number detection (Convert numbers to words)
        const numberToWords = (num) => {
            // Converts numbers 0-999 to words, expand this logic if needed
            const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
            const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
            const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

            if (num < 10) return ones[num];
            if (num < 20) return teens[num - 10];
            if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? "-" + ones[num % 10] : "");

            return ones[Math.floor(num / 100)] + " hundred" + (num % 100 !== 0 ? " and " + numberToWords(num % 100) : "");
        };

        function replaceNumbersInInput() {
            const inputs = document.querySelectorAll('input[type="text"]');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    this.value = this.value.replace(/\d+/g, (match) => numberToWords(parseInt(match, 10)));
                });
            });
        }

        numberBypassToggle.addEventListener('click', function() {
            isNumberBypassEnabled = !isNumberBypassEnabled;
            if (isNumberBypassEnabled) {
                numberBypassToggle.textContent = 'Number Bypass: ON';
                numberBypassToggle.style.backgroundColor = '#2ed573';
                replaceNumbersInInput(); 
            } else {
                numberBypassToggle.textContent = 'Number Bypass: OFF';
                numberBypassToggle.style.backgroundColor = '#ff4757';
            }
        });

        // Custom game support
        customGameToggle.addEventListener('click', function() {
            isCustomGameEnabled = !isCustomGameEnabled;
            if (isCustomGameEnabled) {
                customGameToggle.textContent = 'Custom Games: ON';
                customGameToggle.style.backgroundColor = '#2ed573';
                // Match custom game URLs and apply the script functionality
                if (window.location.href.includes("/user/zakkina/custom")) {
                    uiDiv2
                }
            } else {
                customGameToggle.textContent = 'Custom Games: OFF';
                customGameToggle.style.backgroundColor = '#ff4757';
            }
        });

        // Other UI and functionality remains the same...

    });

})();
