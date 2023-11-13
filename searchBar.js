let searchBar = document.getElementById("search-bar");

searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let search = document.getElementById('search-text').value;
    
    if (search.replaceAll(/\s/g,'') == '')
    {
        for (var i = 0; i < projects.length; i++)
        {
            projects[i].style.visibility= "visible";
            projects[i].style.display = "inline-block";
        }
        return;
    }

    for (var i = 0; i < projects.length; i++)
    {
        if (JSON.parse(projects[i].dataset.keywords).includes(search.toLowerCase().replaceAll("'", ' ')))
        {
            projects[i].style.visibility= "visible";
            projects[i].style.display = "inline-block";
        }
        else
        {
            projects[i].style.visibility= "hidden";
            projects[i].style.display = "none";
        }
    }
});