// Author Ben: accessing the form area of the html to grab values from for the validateLogin function.

// MS changed the const form assignment to .getElement for consistency in code
const form = document.getElementById("form")
const signInBtn = document.getElementById("signIn");

// Author Ben: This is the basic login function that will check that the login and password
// aren't blank before redirecting to the classes page. We can add more functionality to this
// in future builds to actually validate a password and login in a more traditional manner.
// For now, this allows ease of access for our presentation.
function validateLogin() {
    // Author Ben: creating variables for the login and password fields based on user input.
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if (username.value.trim() === "" || password.value.trim() === "") {
        document.getElementById("error").innerText = "Username and password fields cannot be blank.";
        return;
    } else {
        window.location.href = "students.html";
    }
}

// Author Ben: This is the event listener for the submit button that will trigger the validateLogin function
signInBtn.addEventListener("click", function(event) {
    event.preventDefault();
    validateLogin();
});

