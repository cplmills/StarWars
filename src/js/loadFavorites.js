import { addTile } from "./categories.mjs";
import { getLocalStorage, getParam } from "./utils.mjs";

loadFavorites();

async function loadFavorites() {
  let dataResult = await getLocalStorage("sw-favorites");
  let pageCount = await dataResult.count;
  let container = document.querySelector("#grid-container");
  container.innerHTML = "";

  dataResult.map((item) => { 
    console.log(item.results[0].category);
    addTile(item.results[0], container, item.results[0].category);

  });
//   for (let i = 0; i < dataResult.results.length; i++) {
//     addTile(dataResult.results[i], container, parameters);
//   }

}
