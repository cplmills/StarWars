import { getAttributes, getCombinedJSON, getAssetsFromExternal } from "./external_services.mjs";
import { proper, getParam } from "./utils.mjs";
import { checkForItemInFavorites, favoritesHandler } from "./favorites";
import { showImage, loadPagination } from "./navigation.mjs";

export async function addTile(data, selector, category) {
    // create a new tile to be added to the page
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "tile");
    let existsInFavorites = checkForItemInFavorites(data.name);
    let newData = await getCombinedJSON(data.name, category);
    let newElement = document.createElement("div");
        newElement.setAttribute("class", "element-image");
    
    let newImg = document.createElement("img");
        newImg.setAttribute("class", "tile-img");
        newImg.src = newData.image;
        newImg.addEventListener("click", (img) => {showImage(newData.image)});
        newElement.appendChild(newImg);
        
    let newTable = document.createElement("table");
        newTable.setAttribute("class", "tile-table");
        newElement.appendChild(newTable);

        let newAddButton = document.createElement("button");
        if (existsInFavorites) {
            newAddButton.setAttribute("class", "tile-button hidden");
        } else {
            newAddButton.setAttribute("class", "tile-button");
        }
        newAddButton.addEventListener("click", (e) => {favoritesHandler(e)});
        newAddButton.innerText = "☆ Add to Favorites";
        newAddButton.setAttribute("data-id", data.name);
        newAddButton.setAttribute("data-action", "add");
        
        let newRemoveButton = document.createElement("button");
        if (existsInFavorites) {
            newRemoveButton.setAttribute("class", "tile-button");
        } else {
            newRemoveButton.setAttribute("class", "tile-button hidden");
        }        
        newRemoveButton.addEventListener("click", (e) => {favoritesHandler(e)});
        newRemoveButton.innerText = "Remove From Favorites";
        newRemoveButton.setAttribute("data-id", data.name);
        newRemoveButton.setAttribute("data-action", "remove");

    // Loop through elements
    let showElements = getAttributes(category);
    //let newLine = "";

    for ( let i = 0; i < showElements.length; i++) {
        let attribName = showElements[i];
        let attribValue = newData[attribName];

        let newTr = document.createElement("tr");
        newTr.innerHTML = "<td>" + proper(attribName, true) + "</td><td>" + attribValue + "</td>";
        newTable.appendChild(newTr);
    }  
    newDiv.appendChild(newElement);
    newElement.appendChild(newAddButton);
    newElement.appendChild(newRemoveButton);
    selector.appendChild(newDiv);
    
}

export function translateCategory(input) {
    if (input === "planets") {
        return "locations";
    } else if (input === "starships") {
        return "vehicles";
    } else if (input === "vehicles") {
        return "vehicles";
    } else if (input === "people") {
        return "characters";
    } else if (input === "films") {
        return "films";
    } else if (input === "species") {
        return "species";
    } else {
        return "spaceships";
    }
}

export async function loadAssets() {
    let parameters = getParam("category");
    let dataResult = await getAssetsFromExternal(parameters, "data");
    let container = document.querySelector("#grid-container");
    container.innerHTML = "";
    for (let i = 0; i < dataResult.results.length; i++) {
      addTile(dataResult.results[i], container, parameters);
    }
    
    loadPagination(dataResult);
  }