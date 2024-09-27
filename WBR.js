// ==UserScript==
// @name         Zakkina's WBR QOL
// @namespace    http://tampermonkey.net/
// @version      5.2
// @description  Quality of Life improvements for whatbeatsrock.com, including autoclick, slur filtering, number bypass, RGB sliders.
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

        // Autoclick toggle button
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

        // Slur filter toggle button
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

        // Number detection bypass toggle button
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

        // RGB Selector Label
        const rgbLabel = document.createElement('p');
        rgbLabel.textContent = 'Background Color (RGB):';
        rgbLabel.style.marginTop = '10px';
        uiDiv.appendChild(rgbLabel);

        // RGB Input Sliders
        const rgbInputs = ['Red', 'Green', 'Blue'].map((color) => {
            const label = document.createElement('label');
            label.textContent = `${color}: `;
            const input = document.createElement('input');
            input.type = 'range';
            input.min = '0';
            input.max = '255';
            input.value = '51';  
            input.style.margin = '5px';
            label.appendChild(input);
            uiDiv.appendChild(label);
            return input;
        });

        // UI lightness slider
        const uiLightnessLabel = document.createElement('p');
        uiLightnessLabel.textContent = 'UI Background Lightness Factor (0.1 - 0.7):';
        uiDiv.appendChild(uiLightnessLabel);

        const uiLightnessSlider = document.createElement('input');
        uiLightnessSlider.type = 'range';
        uiLightnessSlider.min = '0.1';
        uiLightnessSlider.max = '0.7';
        uiLightnessSlider.step = '0.01';
        uiLightnessSlider.value = '0.5';  
        uiDiv.appendChild(uiLightnessSlider);

        // Input lightness slider
        const inputLightnessLabel = document.createElement('p');
        inputLightnessLabel.textContent = 'WBR Input Background Lightness Factor (1.2 - 1.9):';
        uiDiv.appendChild(inputLightnessLabel);

        const inputLightnessSlider = document.createElement('input');
        inputLightnessSlider.type = 'range';
        inputLightnessSlider.min = '1.2';
        inputLightnessSlider.max = '1.9';
        inputLightnessSlider.step = '0.01';
        inputLightnessSlider.value = '1.5';  
        uiDiv.appendChild(inputLightnessSlider);

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

        // Click next button logic
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

        // Slur filtering logic
        const slurs = ["nigger", "retard", "fuck", "trannie", "cunt", "bitch", "ass", "dick", "nigga", "nigg", "heil hitler"]; 
        function filterSlurs() {
            slurs.forEach(slur => {
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

        // Number bypass logic (converting numbers to words)
        const numberToWords = (num) => {
            const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
            const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
            const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
            const convert = (n) => {
                if (n < 10) return ones[n];
                else if (n < 20) return teens[n - 10];
                else if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 === 0 ? '' : ' ' + ones[n % 10]);
                return n.toString(); 
            };
            return convert(parseInt(num));
        };

        function bypassNumbers() {
            document.body.innerHTML = document.body.innerHTML.replace(/\b\d+\b/g, function(match) {
                return numberToWords(match);
            });
        }

        // Toggle number bypass
        numberBypassToggle.addEventListener('click', function() {
            isNumberBypassEnabled = !isNumberBypassEnabled;
            if (isNumberBypassEnabled) {
                numberBypassToggle.textContent = 'Number Bypass: ON';
                numberBypassToggle.style.backgroundColor = '#2ed573';
                bypassNumbers(); 
            } else {
                numberBypassToggle.textContent = 'Number Bypass: OFF';
                numberBypassToggle.style.backgroundColor = '#ff4757';
            }
        });

        // RGB background color update
        function updateBackgroundColor() {
            const r = rgbInputs[0].value;
            const g = rgbInputs[1].value;
            const b = rgbInputs[2].value;
            document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }

        rgbInputs.forEach(input => {
            input.addEventListener('input', updateBackgroundColor);
        });

        // UI Lightness factor update
        uiLightnessSlider.addEventListener('input', function() {
            const lightnessFactor = uiLightnessSlider.value;
            uiDiv.style.backgroundColor = `rgba(51, 51, 51, ${lightnessFactor})`;
        });

        // WBR Input background lightness factor update
        inputLightnessSlider.addEventListener('input', function() {
            const inputLightnessFactor = inputLightnessSlider.value;
            const inputs = document.querySelectorAll('input[type=text], textarea');
            inputs.forEach(input => {
                input.style.backgroundColor = `rgba(51, 51, 51, ${inputLightnessFactor})`;
            });
        });

        // Hide/Unhide menu functionality
        hideButton.addEventListener('click', function() {
            if (uiDiv.style.display === 'none') {
                uiDiv.style.display = 'block';
                hideButton.textContent = 'Hide Menu';
            } else {
                uiDiv.style.display = 'none';
                hideButton.textContent = 'Unhide Menu';
            }
        });

    });
})();
