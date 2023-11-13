var toggle = document.getElementsByClassName("toggle");
var practical = document.getElementById("practical");
var technical = document.getElementById("technical");

let dir = 1;
var width;

function Toggle()
{
    if (window.matchMedia("(max-width: 1180px)").matches) {
        width = 35;
    } else {
        width = 25;
     }
    console.log("Toggle");  
    toggle[0].style.marginLeft = `${dir == 1 ? width : 0}vw`;
    if (dir == 1)
    {
        practical.style.visibility = "invisible";
        practical.style.display = "none";

        technical.style.visibility = "visible";
        technical.style.display = "block";
        
    }
    else
    {
        practical.style.visibility = "visible";
        practical.style.display = "block";
        
        technical.style.visibility = "invisible";
        technical.style.display = "none";
    }
    dir = -dir;
}