
const ChangeLang = (languageCode) => {
    console.log(languageCode);
    document.documentElement.setAttribute("lang", languageCode);
};

function LoadPage(path)
{
    window.location.href = path;
}