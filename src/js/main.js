import { getParam, logError } from "./utils.mjs";
import { loadFooter, loadNavBar, loadSearchBar, searchForAsset } from "./navigation.mjs";
import { loadAssets } from "./categories.mjs";

loadNavBar();
loadSearchBar();
if (window.location.pathname === "/search.html") {
    const searchResult = await searchForAsset(getParam("asset"), getParam("category"), "#grid-container");
    console.log(searchResult);
    if (searchResult <= 0) {
        let container = document.querySelector("#grid-container");
        container.innerHTML = `<h2>No results found for "${getParam("asset")}", or they have been removed from the archives by the Empire!</h2>`;

    }
}

if (window.location.pathname === "/categories.html") {
    loadAssets();
}

loadFooter();
