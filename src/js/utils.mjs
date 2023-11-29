export function getParam(parameter){
    if (!parameter) return "creatures";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(parameter);
    return product;
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
  