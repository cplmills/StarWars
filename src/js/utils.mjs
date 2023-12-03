export function getParam(parameter = undefined){
    // Return the selected parameter, if no parameter is suppied, return all parameters
    //if (!parameter) return "creatures";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (!parameter) return urlParams;
    const paramValue = urlParams.get(parameter);
    return paramValue;
  }

  export function setParameter(parameter, value){
    let currentParameter = getParam(parameter);
    if (currentParameter === null) {
        window.location.href = window.location.href + "&" + parameter + "=" + value;
    }
  }

  export function getKeys(object) {
    console.log(Object.keys(object));
    return Object.keys(object);
  }

  export function proper(str, removeunderscores = false) {
    if (removeunderscores) {
        // Replace underscores with spaces
        str = str.replace(/_/g, ' ');
    }

    return str.replace(
        /(?:^|\s|-)\w/g,
        function (match) {
            return match.toUpperCase();
        }
    );
  }

  export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  // save data to local storage
  export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  export function addItemToFavorites(item) {
    // Retrieve the current cart from local storage
    const favoriteItems = getLocalStorage("sw-favorites") || [];

    // Check if the item is already in the cart
    const existingItemIndex = favoriteItems.findIndex(
      (element) => element.results[0].name === item.results[0].name);
      
    if (existingItemIndex === -1) {
      // If the item is not in the cart, add it with a quantity of 1
      favoriteItems.push(item);
      console.log("added item to favorites");
    }

    // Update the cart in local storage
    setLocalStorage("sw-favorites", favoriteItems);
  }

export function checkForItemInFavorites(item) {
    const favoriteItems = getLocalStorage("sw-favorites") || [];
    const existingItemIndex = favoriteItems.findIndex(
      (element) => element.results[0].name === item.name);

    if (existingItemIndex === -1) return false;
    return true;  
}