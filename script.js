'use strict';

const DEFAULT_COLOR = '#000';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

const colorModeBox = document.querySelector('.esketch__color-mode-box');
const colorPalette = document.querySelector('.esketch__color-palete');
const rainbowModeBox = document.querySelector('.esketch__rainbow-mode-box');
const erasorBox = document.querySelector('.esketch__erasor-box');
const clearBox = document.querySelector('.esketch__clear-box');
const gridSlider = document.querySelector('.grid__range-slider');
const showGridLinesCheckbox = document.getElementById(
    'show-grid-lines-checkbox'
);

let currentGridValue = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;
let currentColorCode = DEFAULT_COLOR;
let isMouseDown = false;

const changeMode = function (mode) {
    colorModeBox.classList.remove('active');
    rainbowModeBox.classList.remove('active');
    erasorBox.classList.remove('active');

    if (mode === 'color') {
        colorModeBox.classList.add('active');
    } else if (mode === 'rainbow') {
        rainbowModeBox.classList.add('active');
    } else if (mode === 'erasor') {
        erasorBox.classList.add('active');
    }
};

const changeColor = function (e) {
    const gridSquare = e.target;
    if (currentMode === 'color') {
        gridSquare.style.backgroundColor = `${currentColorCode}`;
    } else if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        gridSquare.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'erasor') {
        gridSquare.style.backgroundColor = '#d6d6d6';
    }
};

const clearAllColor = function () {
    clearGrid();
    createNewGrid(currentGridValue);
};

const clearGrid = function () {
    const canvas = document.getElementById('canvas');
    canvas.innerText = '';
};

const createNewGrid = function (NumberOfGrids) {
    for (let i = 0; i < NumberOfGrids * NumberOfGrids; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        canvas.appendChild(gridSquare);

        gridSquare.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            changeColor(e);
        });
        gridSquare.addEventListener('mouseover', (e) => {
            if (isMouseDown) {
                changeColor(e);
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

colorModeBox.addEventListener('click', () => {
    colorPalette.click();
    currentMode = 'color';
    changeMode('color');
});

rainbowModeBox.addEventListener('click', () => {
    currentMode = 'rainbow';
    changeMode('rainbow');
});

erasorBox.addEventListener('click', () => {
    currentMode = 'erasor';
    changeMode('erasor');
});

clearBox.addEventListener('click', clearAllColor);

colorPalette.addEventListener('change', () => {
    const colorCodeEl = document.querySelector('.esketch__color-code');
    currentColorCode = colorPalette.value;
    colorCodeEl.textContent = `${currentColorCode}`;
});

// Hide or show grid lines
showGridLinesCheckbox.addEventListener('click', () => {
    const canvas = document.getElementById('canvas');
    canvas.classList.toggle('show-grid-lines');
});

gridSlider.addEventListener('mousemove', () => {
    const gridValueEL = document.getElementById('grid-value');
    gridValueEL.textContent = `${gridSlider.value} x ${gridSlider.value}`;
});

gridSlider.addEventListener('change', (e) => {
    currentGridValue = gridSlider.value;
    clearGrid();
    createNewGrid(currentGridValue);
});

window.onload = function () {
    createNewGrid(16);
};
