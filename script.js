"use strict";

// Controls hover animations
const controlBoxes = document.querySelectorAll(".esketch__mode-box");
controlBoxes.forEach((box) => {
    box.addEventListener("click", function () {
        toggleClicked(box);
    });
});

const toggleClicked = function (element) {
    const controlBoxes = document.querySelectorAll(".esketch__mode-box");
    controlBoxes.forEach(function (box) {
        box.classList.remove("active");
    });

    element.classList.add("active");
};

const erasorBox = document.querySelector(".esketch__erasor-box");
erasorBox.addEventListener("click", () => {
    erasorBox.classList.toggle("active");
});

const createGrids = function (NumberOfGrids) {
    // Selecting and clear canvas everytime so that elements don't overlape
    const canvas = document.getElementById("canvas");
    canvas.innerText = "";

    for (let i = 0; i < NumberOfGrids; i++) {
        for (let j = 0; j < NumberOfGrids; j++) {
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            canvas.appendChild(gridSquare);
        }
    }

    // Setting grid values
    canvas.style.gridTemplateRows = `repeat(${NumberOfGrids}, 1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${NumberOfGrids}, 1fr)`;
};
createGrids(16);

// Increase or descrease Grid count
const gridSlider = document.querySelector(".grid__range-slider");
gridSlider.addEventListener("change", () => {
    // Fetching current value from slider
    const currentGridValue = gridSlider.value;

    // Showing current grid value to user
    const gridValueEL = document.getElementById("grid-value");
    gridValueEL.textContent = `${currentGridValue} x ${currentGridValue}`;

    // Generating grids dynamically
    createGrids(currentGridValue);
});

// Hide or show grid lines
const showGridLinesCheckbox = document.getElementById(
    "show-grid-lines-checkbox"
);
showGridLinesCheckbox.addEventListener("click", () => {
    const canvas = document.getElementById("canvas");
    canvas.classList.toggle("show-grid-lines");
});
