const DEFAULT_GRID_DIMENSION = 16;

const gridContainer = document.querySelector("#grid-container");
const resetButton = document.querySelector("#reset-button");

function buildGrid(dim) {
    for (let i = 0; i < dim; i++) {
        let gridLine = document.createElement("div");
        gridLine.classList.add("grid-line");
        for (let j = 0; j < dim; j++) {
            let gridCell = document.createElement("div");
            gridCell.classList.add("grid-cell");
            gridCell.id = `cell-${i}.${j}`;
            gridLine.appendChild(gridCell)
        }
        gridContainer.appendChild(gridLine);
    }
}

function hoverHandler(e) {
    if(e.target === gridContainer) return;
    let classes = Array.from(e.target.classList);
    if (!classes.includes("pixel-on")) {
        e.target.classList.add("pixel-on")
    }
}

function promptGridSize() {
    message = "Please, input the new grid size.\n";
    message += "Valid values are integers between 16 and 100.";
    return prompt(message, DEFAULT_GRID_DIMENSION);
}

function validateUserInput(input) {
    size = parseInt(input);
    if (size === NaN || size < 16 || size > 100) {
        alert("Please, input a valid integer betwee 16 and 100.")
        return null;
    }
    return size;
}

function resetHandler() {
    input = promptGridSize();
    let size = validateUserInput(input);
    if (size !== null) {
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.lastChild);
        }
        buildGrid(size);
    }
}

function intensityHandler(e) {
    if(e.deltaY < 0) {
        opacity = window.getComputedStyle(e.target).getPropertyValue("opacity");
        opacity = parseFloat(opacity);
        opacity = opacity >= 1.0 ? 1.0 : opacity + 0.1;
        e.target.style.opacity = opacity;
    }
    if(e.deltaY > 0) {
        opacity = window.getComputedStyle(e.target).getPropertyValue("opacity");
        opacity = parseFloat(opacity);
        opacity = opacity <= 0.1 ? 0.1 : opacity - 0.1;
        e.target.style.opacity = opacity;
    }
}

gridContainer.addEventListener("mouseover", hoverHandler);
gridContainer.addEventListener("wheel", intensityHandler);
resetButton.addEventListener("click", resetHandler);

buildGrid(DEFAULT_GRID_DIMENSION);