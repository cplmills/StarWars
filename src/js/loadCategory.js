import { getAssetsFromExternal } from "./external_services.mjs";
import { addTile } from "./categories.mjs";
import { getParam } from "./utils.mjs";
import { loadPagination } from "./navigation.mjs";

loadAssets();

async function loadAssets() {
  let parameters = getParam("category");
  let dataResult = await getAssetsFromExternal(parameters, "data");
  let container = document.querySelector("#grid-container");
  container.innerHTML = "";
  for (let i = 0; i < dataResult.results.length; i++) {
    addTile(dataResult.results[i], container, parameters);
  }
  
  loadPagination(dataResult);
}


