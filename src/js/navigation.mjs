import { getLocalStorage } from "./utils.mjs";

export async function loadNavBar(){
    let selector = document.querySelector("#nav_ul");
    selector.innerHTML = "";

    readJson().then(menuItems => {
        menuItems.map(appendMenuItem);
    });
}

async function readJson() {
    try {
        const response = await fetch('../json/nav_bar.json');
        const data = await response.json();
        return data.menu_item;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function appendMenuItem(menuItem) {
    if (menuItem.title === "Favorites") {
        const showFavorites = getLocalStorage("sw-favorites").length;
        if (showFavorites <= 0)  return;
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
    const searchBar = document.querySelector("search");
    searchBar.innerHTML = `
    <form id="frmSearch">
        <p>Search the Star Wars Wiki:</p>
        <input type="search" placeholder="Search Here..." />
    </form>`;
}