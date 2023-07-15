'use strict';
let currentColorCode = '#000';
let currentGridCount = 16;
let isMouseDown = false;
let currentMode = 'color' || 'rainbow' || 'erasor';
const colorModeBox = document.querySelector('.esketch__color-mode-box');
const colorPalette = document.querySelector('.esketch__color-palete');
const gridSlider = document.querySelector('.grid__range-slider');
const showGridLinesCheckbox = document.getElementById(
    'show-grid-lines-checkbox'
);
const controlBoxes = document.querySelectorAll('.esketch__mode-box');
const erasorBox = document.querySelector('.esketch__erasor-box');

// Opening color palette  whenver the color mode box is clicked
colorModeBox.addEventListener('click', function () {
    colorPalette.click();
});

colorPalette.addEventListener('change', () => {
    const colorCodeEl = document.querySelector('.esketch__color-code');
    currentColorCode = colorPalette.value;
    colorCodeEl.textContent = `${currentColorCode}`;
    colorCodeEl.style.color = currentColorCode;

    createGrids(currentGridCount, currentColorCode);
});

gridSlider.addEventListener('change', () => {
    currentGridCount = gridSlider.value;
    const gridValueEL = document.getElementById('grid-value');
    gridValueEL.textContent = `${currentGridCount} x ${currentGridCount}`;
    createGrids(currentGridCount, currentColorCode);
});

// const generateRainbowColor = function () {};

const createGrids = function (NumberOfGrids = 16) {
    // Selecting and clear canvas everytime so that elements don't overlape
    const canvas = document.getElementById('canvas');
    canvas.innerText = '';

    for (let i = 0; i < NumberOfGrids * NumberOfGrids; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        canvas.appendChild(gridSquare);

        gridSquare.addEventListener('mousedown', () => {
            isMouseDown = true;
            if (currentMode === 'color') {
                gridSquare.style.backgroundColor = `${gridColor}`;
            }
        });

        gridSquare.addEventListener('mouseover', () => {
            if (isMouseDown) {
                if (currentMode === 'color') {
                    gridSquare.style.backgroundColor = `${gridColor}`;
                }
            }
        });
    }

    // Setting grid values
    canvas.style.gridTemplateRows = `repeat(${NumberOfGrids}, 1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${NumberOfGrids}, 1fr)`;
};
window.addEventListener('mouseup', function () {
    isMouseDown = false;
});

createGrids(16, '#000');

// Hide or show grid lines
showGridLinesCheckbox.addEventListener('click', () => {
    const canvas = document.getElementById('canvas');
    canvas.classList.toggle('show-grid-lines');
});

// Control hover animations
controlBoxes.forEach((box) => {
    box.addEventListener('click', function () {
        erasorBox.classList.remove('active');
        toggleClicked(box);
    });
});

const toggleClicked = function (element) {
    const controlBoxes = document.querySelectorAll('.esketch__mode-box');

    controlBoxes.forEach(function (box) {
        box.classList.remove('active');
    });

    element.classList.add('active');
    currentMode = element.getAttribute('id');
};

erasorBox.addEventListener('click', () => {
    erasorBox.classList.toggle('active');
    currentMode = 'erasor';
});
