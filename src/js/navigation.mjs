import { getAssetFromExternal } from "./external_services.mjs";
import { getLocalStorage, getParam, logError } from "./utils.mjs";
import { addTile } from "./categories.mjs";

export async function loadNavBar(){
    let selector = document.querySelector("#nav_ul");
    selector.innerHTML = "";
    try {
        readJson().then(menuItems => {
            menuItems.map(appendMenuItem);
        });
    } catch (error) {
        logError("Could not read Json File:" + error);
    }
}

async function readJson() {
    try {
        const response = await fetch('../json/nav_bar.json');
        const data = await response.json();
        return data.menu_item;
    } catch (error) {
        logError('Error fetching data:', error);
    }
}

function appendMenuItem(menuItem) {
    if (menuItem.title === "Favorites") {
        try {
            const showFavorites = getLocalStorage("sw-favorites").length || 0;
            if (showFavorites <= 0)  return;
        } catch (error){
            logError('Error fetching favorites:', error);
        }
    }
    let selector = document.querySelector("#nav_ul");

    let newLi = document.createElement("li");
    let newDiv = document.createElement("div");
    let newLink = document.createElement("a");
    
    if (menuItem.title === "Favorites") {
        newLink.setAttribute("href","../favorites.html");
    } else {
        newLink.setAttribute("href","../categories.html?category=" + menuItem.parameter);
    }
    newLink.innerHTML = `<img src="${menuItem.icon}"></img><p>${menuItem.title}</p>`;
        
    newDiv.appendChild(newLink);
    newLi.appendChild(newDiv);
    selector.appendChild(newLi);
}

export function loadSearchBar() {
    const searchBar = document.querySelector("#search");
    searchBar.innerHTML = `
    <form id="frmSearch">
        <p>Search the Star Wars Encyclopedia:</p>
        <select id="categoryDropdown" name="category">
            <option value="planets">Planets</option>
            <option value="starships">Spaceships</option>
            <option value="vehicles">Vehicles</option>
            <option value="people">People</option>
            <option value="species">Species</option>
        </select>
        <input type="search" name="asset" placeholder="Search Here..." id="txtSearch"/>
        <button type="button" id="btnSubmit">Search</button>
    </form>
    `;

    btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.addEventListener("click", () => { 
        // Get form data
        const myForm = document.getElementById("frmSearch");
        const formData = new FormData(myForm);
        // Construct the URL with form data
        const url = 'search.html?' + new URLSearchParams(formData).toString();
        console.log(url);
        window.location.href = url;    
    });
}

export async function searchForAsset(inputElement, inputCategory, container) {
    let results = await getAssetFromExternal(inputElement, inputCategory, "data");
    let DOMContainer = document.querySelector(container);
    try {
        DOMContainer.innerHTML = "";
        for (let i = 0; i < results.results.length; i++) {
          addTile(results.results[i], DOMContainer, inputCategory);
        } 
        if (results.results.length > 8){
            loadPagination(results);
        }
    } catch (e) {
        console.log(e);
    }
}

export function loadPagination(dataResult) {
    let pageCount = dataResult.count;
    let pagination = document.createElement("ul");
    let currentPageIndex = parseInt(getParam("page")) || 1;
    let currentURL = new URL(window.location.href);
  
    // paint page numbers and set page number
    for (let i = 1; i < pageCount / 10; i++) {
      let newLi = document.createElement("li");
      let newA = document.createElement("a");
      if (i === currentPageIndex) {
        newA.setAttribute("href", "#");
        newA.setAttribute("class", "active");
      } else {
        currentURL.searchParams.set("page", i);
        newA.setAttribute("href", `${currentURL}`);
      }
      newA.innerHTML = `${i}`;
      newLi.appendChild(newA);
      pagination.appendChild(newLi);
    }
    let pageNav = document.querySelector("#pagination");
    // if pagination not found, add it after main
    pageNav.appendChild(pagination);
  }

  export function showImage(image) {
    const headerElem = document.querySelector("body");
    const firstElement = headerElem.firstChild;

    const body = document.getElementsByTagName("body");
    const fullScreenDiv = document.createElement("div");
        fullScreenDiv.setAttribute("id", "FSDiv");
        fullScreenDiv.addEventListener("click", () => {
            fullScreenDiv.remove();

        });
        
        const imgContainer = document.createElement("div");
        imgContainer.setAttribute("id", "imgContainer");
        const fullScreenImage = document.createElement("img");
        fullScreenImage.setAttribute("id", "FSImg");
        fullScreenImage.setAttribute("src", image);
        
    imgContainer.appendChild(fullScreenImage);
    fullScreenDiv.appendChild(imgContainer);
    headerElem.insertBefore(fullScreenDiv, firstElement);

  }

  export function loadFooter() {
    const footerElem = document.querySelector('footer');
    const footerP = document.createElement('p');
    footerP.innerHTML = `Star Wars Encyclopedia ©Chris Mills 2023 - Data from <a href="http://swapi.dev">SWAPI</a> and images from the<a href="https://starwars-databank.vercel.app/droid/schema">Star Wars Databank API</a> - <a href="contact.html">Contact us</a> with questions and feedback`;
    footerElem.appendChild(footerP);
  }