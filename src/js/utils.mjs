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
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      logError("could not get local storage: " + error);
      return null;
    }
  }

  // save data to local storage
  export function setLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      logError("Could not set local storage: " + error);
    }
  }

  export function validateForm(event) {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const feedback = document.getElementById('feedback');

    // Reset previous error messages
    document.getElementById('firstNameError').textContent = '';
    document.getElementById('lastNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('feedbackError').textContent = '';

    // Check if the first name is at least 5 characters long
    if (firstName.validity.patternMismatch) {
        document.getElementById('firstNameError').textContent = 'First name must be at least 5 characters long.';
        firstName.setStyle("background-color", "rgba(255,0,0,0.2");
    }

    // Check if the last name is at least 5 characters long
    if (lastName.validity.patternMismatch) {
        document.getElementById('lastNameError').textContent = 'Last name must be at least 5 characters long.';
    }

    // Check if the email is in a valid format
    if (email.validity.typeMismatch) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    }

    // Check if the feedback is empty
    if (feedback.validity.valueMissing) {
        document.getElementById('feedbackError').textContent = 'Feedback cannot be empty.';
    }

    // Prevent form submission if there are errors
    if (firstName.validity.patternMismatch || lastName.validity.patternMismatch || email.validity.typeMismatch || feedback.validity.valueMissing) {
        event.preventDefault();
    }
}

export function logError(msg, error) {
  let headerBox = document.querySelector("header");
  let errorBox = document.createElement("div");
    errorBox.setAttribute("id", "error");
    errorBox.setAttribute("class", "error-message");
  
  errorBox.innerHTML = "<h2>An error has occurred</h2>";
  headerBox.after(errorBox);
  setTimeout(() => {
    errorBox.remove();
  }, 5000);
  console.log(msg, error);

}