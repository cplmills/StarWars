import { addTile } from "./categories.mjs";
import { getLocalStorage } from "./utils.mjs";

loadFavorites();

async function loadFavorites() {
  let dataResult = await getLocalStorage("sw-favorites");
  let container = document.querySelector("#grid-container");
  container.innerHTML = "";

  if (dataResult.length <= 0 ) {
    container.innerHTML = "<h2>You have not selected any favorites, or they have been removed by the Empire!</h2>";
  } else {
    dataResult.map((item) => { 
      addTile(item.results[0], container, item.results[0].category);
    });
  }
}
