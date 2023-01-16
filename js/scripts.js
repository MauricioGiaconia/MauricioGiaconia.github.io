function iconReaction(str, el){

    let title = document.getElementById("icon-title");
    let oldSelected = document.querySelector(".selected");
    
    //Remuevo la clase "selected" del objeto seleccionado y se la asigno al elemento clickeado para indicar que es el nuevo seleccionado
    oldSelected.classList.replace("selected", "waiting");
    el.classList.replace("waiting", "selected");

    title.innerHTML = "";
    title.innerHTML = str;
}


//En desarrollo
function createPdf(){

    let source = document.getElementById("captura");

    html2canvas(source, {
                        useCORS:true,
                        logging:true,
                        tainted: true,
                        onrendered: function (canvas){
                            let img= canvas.toDataURL("image/png");
                            let cr = document.createElement("img");
                            cr.src = img
                            document.getElementsByTagName("body")[0].appendChild(cr);
                       
                            let doc = new jsPDF();
                            doc.addImage(img,'JPEG', 0, 0);
                            doc.output('save', 'CV-MauricioGiaconia.pdf');
                        }   
                       
    });

 
    //pdf.output('save', 'CV-MauricioGiaconia.pdf');
}

function toggleLanguage(){

    let ball = document.getElementById("ball");

    var path = window.location.pathname;
    var page = path.split("/").pop();

    //ball.style.cssFloat = 'right';
    if (ball.style.cssFloat == "left" || !ball.style.cssFloat){

        changeBallDirection("right", "english");
        deployWaitingDiv("Translating!");   

        setTimeout(function(){
            window.location.replace(page.replace(".html", "") + "-en.html");
        }, 1000);

       

    } else{

        page = page.split("-");

        changeBallDirection("left", "spanish");
        deployWaitingDiv("Traduciendo!");   

        setTimeout(function(){ 
            window.location.replace(page[0] + ".html");
        }, 1000);
       


    }
}

function changeBallDirection(direction, language){

    let ball = document.getElementById("ball");
    
    //Distintos sets al float para que funcione en todos los navegadores
    ball.style.cssFloat = direction;
    ball.style.styleFloat = direction;
    ball.setAttribute('value', language);

}

function deployWaitingDiv(xmsg){

    var body = document.body;


    var div = document.createElement("div");
    var text = document.createElement("h2");

    text.appendChild(document.createTextNode(xmsg));
    text.style.margin = "0 auto";
    text.style.color = "white";
    text.style.marginTop = "35%";
    text.style.fontSize = "55px";

    div.appendChild(text);

    div.style.backgroundColor = "#A4A4A4";
    div.style.opacity = 0.6;
    div.style.position = "fixed";
    div.style.width = "100%";
    div.style.height = "100vh";
    div.style.color = "#FFF";
    div.style.textAlign = "center";

    body.appendChild(div);
}

function countChar(str, textAreaEl){

    let p = document.getElementById("char-counter");

    if (textAreaEl.className){
        textAreaEl.className = textAreaEl.className.replace("forbidden", "");
    }
    
    if (str.length > 0){
        
        if (str.length == 500){

            p.style.color = "red";

        } else if (str.length > 500){

            str = str.slice(0, 500);
            textAreaEl.value = str;
            textAreaEl.className = textAreaEl.className + " forbidden";
            p.style.color = "red";

        } else{

            p.style.color = "grey";
        } 

        p.innerHTML = str.length + "/500";


    } else{
        p.innerHTML = 0 + "/500";
    }

    
}


window.onload = function(){
    
    var path = window.location.pathname;
    var page = path.split("/").pop();
    page = page.split("-");
    

    
    if (page[1] == "en.html"){

        changeBallDirection("right", "english");
        
    } else{

        changeBallDirection("left", "spanish");
    }

    const textArea = document.getElementById("textAreaMsg");
  
    if (textArea){
        textArea.addEventListener("keyup", function(){
            countChar(textArea.value, textArea);
        });
    }

}



