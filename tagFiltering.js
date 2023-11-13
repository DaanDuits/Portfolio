/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showTags() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


  let projects = document.getElementsByClassName("Project");
  for (var i = 0; i < projects.length; i++)
   {
       projects[i].style.visibility= "visible";
       projects[i].style.display = "inline-block";
       let tags = JSON.parse(projects[i].dataset.filtertag);
       let img;
       for (let j = 0; j < tags.length; j++)
       {
            switch (tags[j])
            {
                case "Unity":
                    loadImage("UnityTag", i);
                    break;
                case "UnrealEngine":
                    loadImage("UnrealTag", i);
                    break;
                case "C#":
                    loadImage("CSTag", i);
                    break;
                case "C++":
                    loadImage("CPPTag", i);
                    break;
                case "Blueprints":
                    loadImage("BlueprintsTag", i);
                    break;
                case "Multiplayer":
                    loadImage("MultiplayerTag", i);
                    break;
            }
       }
   }
   
   function loadImage(imageName, i)
   {
        img = document.createElement("img");
        img.src = "/Image/Tags/" + imageName + ".png";
        img.className = "tag";
        projects[i].children[0].appendChild(img);
   }
  function filterByTag(tag)
  {
    if (tag == "All")
    {
        for (var i = 0; i < projects.length; i++)
        {
            projects[i].style.visibility= "visible";
            projects[i].style.display = "inline-block";
        }
    }
    else
    {
        for (var i = 0; i < projects.length; i++)
        {
            if (JSON.parse(projects[i].dataset.filtertag).includes(tag))
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
    }
    
  }