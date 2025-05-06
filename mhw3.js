const baseURLRequest = "https://foodish-api.com/api";

endPoint = "https://uselessfacts.jsph.pl/";

api = endPoint + "/api/v2/facts/random";

linkOptions = [
    "https://www.bardelcorsoinfantino.it/",
    "https://www.bardelcorsoinfantino.it/our-history/",
    "https://www.bardelcorsoinfantino.it/our-team/",
    "https://www.bardelcorsoinfantino.it/shop/",
    "https://www.bardelcorsoinfantino.it/contact-us/"
]

options = ["Home", "Storia", "Pasticceria", "Shop", "Contatti"];





function onResponse(response) {
    if (!response.ok) {
        console.log("Error: " + response.status);
    }
     else return response.json();
}

function onJsonFacts(json){
    console.log("Json received\n", json);
    fact = document.createElement("p");
    fact.textContent = json.text;
    fact.classList.add("fact-text");
    container = document.querySelector("#facts-container");
    container.innerHTML = ""; // Clear previous facts
    container.appendChild(fact);

}
function getRandomFact() {
    fetch(api).then(onResponse).then(onJsonFacts);
}

function openMenu(event){
    console.log("opened");
    clicked = event.currentTarget;
    mobile = document.querySelector("#mobile");
    menu = document.querySelector("#menu");
    for(let i = 0; i < options.length; i++){
        container = document.createElement("a");
        container.classList.add("menu-item");
        container.setAttribute("href", linkOptions[i]);
        container.textContent = options[i];
        menu.appendChild(container);
    }
    X = document.createElement("img");
    X.classList.add("X");
    X.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/1/10/Large-x.png");
    mobile.appendChild(X);
    linee = document.querySelectorAll("linea");
    for(let i = 0; i < linee.length; i++){
        linee.classList.add("hidden");
    }
    mobile.addEventListener("click", closeMenu);
    clicked.removeEventListener("click", openMenu);
}

function closeMenu(event){
    console.log("closed");
    mobile = event.currentTarget;
    X = document.querySelector(".X");
    X.remove();
    linee = document.querySelectorAll("linea");
    for(let i = 0; i < linee.length; i++){
        linee.classList.remove("hidden");
    }
    container = document.querySelectorAll(".menu-item");
    for(let i = 0; i < container.length; i++){
        container[i].remove();
    }
    clicked = document.querySelector("#mobile");
    mobile.addEventListener("click", openMenu);
    mobile.removeEventListener("click", closeMenu);
}


function onResponse(response) {
    if(response.ok) {
        return response.json();
    }
    else{
        console.log("Error: " + response.status);
    }
}

function onJson(json){
    console.log("Json received");
    const  img = document.createElement("img");
    img.classList.add("food-img");
    img.src = json.image;
    container = document.querySelector("#container");
    container.innerHTML = ""; //Clear the divS
    //Create a div
    const food = document.createElement("div");
    food.classList.add("food-image");
    container.appendChild(food);
    food.appendChild(img);
}

function onClick(event){
    fetch(baseURLRequest).then(onResponse).then(onJson);
}

clicked = document.querySelector("#mobile");
clicked.addEventListener("click", openMenu);
button = document.querySelector("#image-generator");
button.addEventListener("click", onClick);

buttonFacts = document.getElementById("fact-button");
buttonFacts.addEventListener("click", getRandomFact);