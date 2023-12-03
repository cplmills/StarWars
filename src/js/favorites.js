
import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import { loadNavBar } from "./navigation.mjs";
import { getAssetFromExternal } from "./external_services.mjs";

export async function favoritesHandler(e) {
    // adds a favorite if add = true, otherwise removes it
    let originalText = e.target.innerHTML;
    console.log(originalText);
    e.target.innerHTML = "Processing...";
    if (e.target.dataset.action === "add") {
        const item = await getAssetFromExternal(e.target.dataset.id, getParam("category"), "data");
        await addItemToFavorites(item);
        e.target.setAttribute("class", "tile-button hidden");
        let showRemoveButton = document.querySelector(`[data-id="${e.target.dataset.id}"][data-action="remove"]`);
        showRemoveButton.setAttribute("class", "tile-button");
    } else {
        await removeItemFromFavorites(e.target.dataset.id);
        e.target.setAttribute("class", "tile-button hidden");
        let showButton = document.querySelector(`[data-id="${e.target.dataset.id}"][data-action="add"]`);
        showButton.setAttribute("class", "tile-button");
    }

    // let hideButton = document.querySelector(`[data-id="${e.target.dataset.id}"][data-action="add"]`);
    // hideButton.setAttribute("class", "tile-button hidden");
    e.target.innerHTML = originalText;

    // let showButton = document.querySelector(`[data-id="${e.target.dataset.id}"][data-action="remove"]`);
    // showButton.setAttribute("class", "tile-button");
    loadNavBar();
}


export function removeItemFromFavorites(id) {
    const localArray = getLocalStorage("sw-favorites");
    const existingItemIndex = localArray.findIndex((element) => element.results[0].name === id);
    if (existingItemIndex !== -1) {
        // Use splice only if the item exists
        localArray.splice(existingItemIndex, 1);
        setLocalStorage("sw-favorites", localArray);
    }
}

export function addItemToFavorites(item) {
    // Retrieve the current cart from local storage
    const favoriteItems = getLocalStorage("sw-favorites") || [];

    // Check if the item is already in the cart
    const existingItemIndex = favoriteItems.findIndex(
      (element) => {
          console.log(item);
        element.results[0].name === item.results[0].name;
    });
    if (existingItemIndex === -1) {
      // If the item is not in the cart, add it with a quantity of 1
      favoriteItems.push(item);
      console.log("added item to favorites");
      // Update the cart in local storage
      setLocalStorage("sw-favorites", favoriteItems);
    }
 }

export function checkForItemInFavorites(item) {
    const favoriteItems = getLocalStorage("sw-favorites") || [];
    const existingItemIndex = favoriteItems.findIndex(
      (element) => element.results[0].name === item);
    console.log(existingItemIndex);

    if (existingItemIndex === -1) return false;
    return true;  
}