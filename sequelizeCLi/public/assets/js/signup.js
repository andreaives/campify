$(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.signup");
  var usernameInput = $("input#username-input")
  var emailInput = $("input#email-input")
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    console.log(event)
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    

    if (!userData.username || !userData.password || !userData.email) {
      return;
    }
    console.log(userData)

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password, userData.email);
    usernameInput.val("");
    passwordInput.val("");
    emailInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password, email) {
    $.post("/api/profile", {
      username: username,
      password: password,
      email: email
    })
      .then(function() {
        window.location.replace("/profile");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});