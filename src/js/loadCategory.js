import { getAssetsFromExternal } from "./external_services.mjs";
import { addTile } from "./categories.mjs";
import { getParam, setParameter } from "./utils.mjs";

loadAssets();

async function loadAssets() {
    let parameters = getParam("category");
    let dataResult = await getAssetsFromExternal(parameters, "data");
    let pageCount = await dataResult.count;
    console.log(pageCount);
    let container = document.querySelector("#grid-container");
    container.innerHTML = "";
    for (let i = 0; i < dataResult.results.length; i++){
        addTile(dataResult.results[i], container, parameters);        
    }

    let pagination = document.createElement("ul");
    let currentPage = decodeURIComponent(new URLSearchParams(window.location.href));
    let currentPageIndex = getParam("page");
    let currentURL = new URL(window.location.href);
    if (currentPageIndex === null){
        currentPage += "&page=1";
        currentPageIndex = 1;
    }

    // paint page numbers and set page number
    for (let i = 1; i < pageCount/10; i++ ) {
        let newLi = document.createElement("li");
        let newA = document.createElement("a");
        if ( i === currentPageIndex ) {
            newA.setAttribute("href", "#");
        } else {
            currentURL.searchParams.set("page", i);
            newA.setAttribute("href", `${currentURL}`);
        }
        newA.innerHTML = `${i}`;
        newLi.appendChild(newA);
        pagination.appendChild(newLi);
    }
    let pageNav = document.querySelector("#pagination");
    console.log(pagination);
    pageNav.appendChild(pagination);
}

