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

