import { getAssetFromExternal, getAttributes, getCombinedJSON } from "./external_services.mjs";
import { proper, addItemToFavorites, getParam, checkForItemInFavorites } from "./utils.mjs";

export async function addTile(data, selector, category) {
    // create a new tile to be added to the page
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "tile");

    let newData = await getCombinedJSON(data.name, category);
    let newElement = document.createElement("div");
        newElement.setAttribute("class", "element-image");
    
    let newImg = document.createElement("img");
        newImg.setAttribute("class", "tile-img");
        newImg.src = newData.image;
        newElement.appendChild(newImg);
        
    let newTable = document.createElement("table");
        newTable.setAttribute("class", "tile-table");
        newElement.appendChild(newTable);

    let newButton = document.createElement("button");
        newButton.setAttribute("class", "tile-button");

        const isInFavorites = checkForItemInFavorites(data);
        if (isInFavorites) {
            newButton.innerText = "Remove From Favorites";
            newButton.addEventListener("click", (e) => {addToFavoritesHandler(e)});
        } else {
           newButton.innerText = "☆ Add to Favorites";
           newButton.addEventListener("click", (e) => {addToFavoritesHandler(e)});
        }
        newButton.setAttribute("data-id", data.name);

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
    newElement.appendChild(newButton);
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

async function addToFavoritesHandler(e) {
    const item = await getAssetFromExternal(e.target.dataset.id, getParam("category"), "data");
    console.log(item);
    addItemToFavorites(item);
}
