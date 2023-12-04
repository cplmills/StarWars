
import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import { loadNavBar } from "./navigation.mjs";
import { getAssetFromExternal } from "./external_services.mjs";

export async function favoritesHandler(e) {
    // adds a favorite if add = true, otherwise removes it
    let originalText = e.target.innerHTML;
    e.target.innerHTML = "Processing...";
    if (e.target.dataset.action === "add") {
        const item = await getAssetFromExternal(e.target.dataset.id, getParam("category"), "data");
        await addItemToFavorites(item);
        let showRemoveButton = document.querySelector(`[data-id="${e.target.dataset.id}"][data-action="remove"]`);
        showRemoveButton.setAttribute("class", "tile-button");
    } else {
        await removeItemFromFavorites(e.target.dataset.id);
        let showButton = document.querySelector(`[data-id="${e.target.dataset.id}"][data-action="add"]`);
        showButton.setAttribute("class", "tile-button");
    }
    e.target.setAttribute("class", "tile-button hidden");
    e.target.innerHTML = originalText;
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
    item.results[0].category = getParam("category");
    const favoriteItems = getLocalStorage("sw-favorites") || [];

    // Check if the item is already in the cart
    const existingItemIndex = favoriteItems.findIndex(
      (element) => element.results[0].name === item.results[0].name);

    if (existingItemIndex === -1) {
      // If the item is not in the cart, add it with a quantity of 1
      
      favoriteItems.push(item);
      // Update the cart in local storage
      setLocalStorage("sw-favorites", favoriteItems);
    }
 }

export function checkForItemInFavorites(item) {
    const favoriteItems = getLocalStorage("sw-favorites") || [];
    const existingItemIndex = favoriteItems.findIndex(
      (element) => element.results[0].name === item);

    if (existingItemIndex === -1) return false;
    return true;  
}