function iconReaction(str, el){

    let title = document.getElementById("icon-title");
    let oldSelected = document.querySelector(".selected");
    
    //Remuevo la clase "selected" del objeto seleccionado y se la asigno al elemento clickeado para indicar que es el nuevo seleccionado
    oldSelected.classList.replace("selected", "waiting");
    el.classList.replace("waiting", "selected");

    title.innerHTML = "";
    title.innerHTML = str;
}


