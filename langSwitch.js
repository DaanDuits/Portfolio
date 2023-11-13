let lines;
let ids;
let lang;
let windowScrollY;
if (localStorage.getItem("lang") != "NL" && localStorage.getItem("lang") != "EN")
{
  lang = "EN";
}
else 
{
   lang = localStorage.getItem("lang");
}

var url = window.location.pathname;
var filename = url.replace( "/Lang/EN/", '');
filename = filename.replace("/Lang/NL/", '')
console.log(filename);

function loadFile(fileName)
{
    localStorage.setItem("lang", lang);
    window.location = "/Lang/" + lang + "/" + fileName + '.html';
}

function switchLanguage(newLang)
{
    lang = newLang;
    localStorage.setItem("lang", lang);
    window.location = "/Lang/" + lang + "/" + filename;
}