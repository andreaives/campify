var signUpBtn = $(".sign-up-btn")


var loginBtn = $("<button>")
$(".testing-btns").append(loginBtn);
loginBtn.text("Login").addClass("userBtn btn1").attr("type", "submit");

var newUserBtn = $(".newuserBtn");



newUserBtn.on("click", function(){
  $(".testing-btns").addClass("hidden")
  $(".newUser").addClass("hidden");
  $(".sign-up-btn").removeAttr("class", "hidden")
  console.log("button clicked");

})


loginBtn.on("click", function(){
  console.log("log in")
  login();
})


signUpBtn.on("click", function(){
  signUpUser()


})


function login() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var usernameInput = $("input#username-input")
  var emailInput = $("input#email-input")
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    console.log(event)
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      email: emailInput.val().trim()
    };
    

    if (!userData.username || !userData.password || !userData.email) {
      return;
    }
    console.log(userData)

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password, userData.email);
    usernameInput.val("");
    passwordInput.val("");
    emailInput.val("")
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then(function() {
        window.location.replace("/profile/:id");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};

function signUpUser(){
  var loginForm = $("form.login");
  var usernameInput = $("input#username-input")
  var emailInput = $("input#email-input")
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    console.log(event)
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      email: emailInput.val().trim()
    };
    

    if (!userData.username || !userData.password || !userData.email) {
      return;
    }
    console.log(userData)

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password, userData.email);
    usernameInput.val("");
    passwordInput.val("");
    emailInput.val("")
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then(function() {
        window.location.replace("/profile/:id");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}