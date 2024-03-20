let styleSheet = document.getElementById("style");
let isLightmode = true;

let darkMode = "/sudoku/sudokuDarkMode.css";
let lightmode = "/sudoku/sudokuLightMode.css";

let text;

function switchColor()
{
    let button = document.getElementById("switch-button");

    styleSheet.href = isLightmode ? darkMode : lightmode;
    isLightmode = !isLightmode;
    button.innerText = isLightmode ? "Dark Mode" : "Light Mode"
    localStorage.setItem("lightMode", isLightmode);
}