import { getParam } from "./utils.mjs";
import { loadFooter, loadNavBar, loadSearchBar, searchForAsset } from "./navigation.mjs";
import { loadAssets } from "./categories.mjs";

loadNavBar();
loadSearchBar();
if (window.location.pathname === "/search.html") {
    searchForAsset(getParam("asset"), getParam("category"), "#grid-container");
}

if (window.location.pathname === "/categories.html") {
    loadAssets();
}

loadFooter();
