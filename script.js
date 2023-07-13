"use strict";

// Controls hover animations
const controlBoxes = document.querySelectorAll(".esketch__mode-box");
controlBoxes.forEach((box) => {
    box.addEventListener("click", function () {
        toggleClicked(box);
    });
});

function toggleClicked(element) {
    const controlBoxes = document.querySelectorAll(".esketch__mode-box");
    controlBoxes.forEach(function (box) {
        box.classList.remove("active");
    });

    element.classList.add("active");
}

const erasorBox = document.querySelector(".esketch__erasor-box");
erasorBox.addEventListener("click", () => {
    erasorBox.classList.toggle("active");
});

// const gridSlider = document.querySelector(".grid-slider");
// gridSlider.addEventListener("change", () => {
//     const currentGridValue = gridSlider.value;
//     console.log(currentGridValue);
// });
