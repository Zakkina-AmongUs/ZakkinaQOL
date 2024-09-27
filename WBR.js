// ==UserScript==
// @name         Zakkina's WBR QOL
// @namespace    http://tampermonkey.net/
// @version      4.3
// @description  Quality of Life improvements for whatbeatsrock.com with customizable backgrounds
// @author       Zakkina & ChatGPT
// @match        https://www.whatbeatsrock.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whatbeatsrock.com
// @updateURL    https://github.com/Zakkina-AmongUs/ZakkinaQOL/raw/refs/heads/main/WBR.js
// @downloadURL  https://github.com/Zakkina-AmongUs/ZakkinaQOL/raw/refs/heads/main/WBR.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Ensure the script runs after the page is fully loaded
    window.addEventListener('load', function() {
        
        // Create the UI container
        const uiDiv = document.createElement('div');
        uiDiv.style.position = 'fixed'; // 'fixed' for better positioning
        uiDiv.style.bottom = '20px';
        uiDiv.style.right = '20px';
        uiDiv.style.padding = '10px';
        uiDiv.style.backgroundColor = '#333';  // Default background
        uiDiv.style.color = '#fff';
        uiDiv.style.borderRadius = '5px';
        uiDiv.style.zIndex = '9999'; // Ensure it's on top
        uiDiv.style.fontFamily = 'Arial, sans-serif';

        // Create the toggle button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Autoclick: OFF';
        toggleButton.style.backgroundColor = '#ff4757';
        toggleButton.style.color = '#fff';
        toggleButton.style.border = 'none';
        toggleButton.style.padding = '10px 20px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.borderRadius = '5px';
        toggleButton.style.fontSize = '14px';

        // Add the button to the UI container
        uiDiv.appendChild(toggleButton);

        // RGB Selector Label
        const rgbLabel = document.createElement('p');
        rgbLabel.textContent = 'Background Color (RGB):';
        rgbLabel.style.marginTop = '10px';
        uiDiv.appendChild(rgbLabel);

        // RGB Input Sliders
        const rgbInputs = ['Red', 'Green', 'Blue'].map((color, index) => {
            const label = document.createElement('label');
            label.textContent = `${color}: `;
            const input = document.createElement('input');
            input.type = 'range';
            input.min = '0';
            input.max = '255';
            input.value = '51';  // Default value
            input.style.margin = '5px';
            label.appendChild(input);
            uiDiv.appendChild(label);
            return input;
        });

        // Append the UI to the document body
        document.body.appendChild(uiDiv);

        // Autoclicking status
        let isAutoclickEnabled = false;
        let autoclickInterval;

        // Function to click the button if it exists
        function clickNextButton() {
            const buttons = document.getElementsByClassName("py-4 px-8 border border-1-black text-lg");
            if (buttons.length > 0) {
                buttons[0].click(); // Clicks the first button
            }
        }

        // Toggle the autoclick functionality
        toggleButton.addEventListener('click', function() {
            isAutoclickEnabled = !isAutoclickEnabled;
            if (isAutoclickEnabled) {
                toggleButton.textContent = 'Autoclick: ON';
                toggleButton.style.backgroundColor = '#2ed573'; // Change color to indicate it's on
                autoclickInterval = setInterval(clickNextButton, 50); // Start autoclicking
            } else {
                toggleButton.textContent = 'Autoclick: OFF';
                toggleButton.style.backgroundColor = '#ff4757'; // Change color to indicate it's off
                clearInterval(autoclickInterval); // Stop autoclicking
            }
        });

        // Function to create a darker version of the RGB color
        function darkenColor(r, g, b, factor = 0.5) {
            return `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`;
        }

        // Function to update both body and UI background colors
        function updateBackgroundColors() {
            const r = rgbInputs[0].value;
            const g = rgbInputs[1].value;
            const b = rgbInputs[2].value;

            // Set body's background color to the chosen RGB value
            const rgbColor = `rgb(${r},${g},${b})`;
            document.body.style.backgroundColor = rgbColor;

            // Set UI's background color to a darker version of the chosen RGB
            const darkenedColor = darkenColor(r, g, b, 0.3); // Darken by 70%
            uiDiv.style.backgroundColor = darkenedColor;
        }

        // Attach input event listeners to update background in real-time
        rgbInputs.forEach(input => {
            input.addEventListener('input', updateBackgroundColors);
        });

    });

})();
