

$(document).on('knack-scene-render.Logoutpage', function (event, scene) {
  let KnackScenes = $(".kn-scenes.kn-section");
  function redirect (destination = "http:// NEED TO FILL IN") { 
setTimeout(function(){
window.location = destination;
KnackScenes.show(100);
}, 1000);
}
function logoutUser(button = document.createElement("a")) {
button.className = "navbar-text";
button.innerHTML = "Click to Log Out";
document.getElementById("kn-" + scene.key).appendChild(button);

button.addEventListener("click", function() {
KnackScenes.hide();
redirect();
});
button.click();
}
if (Knack.session.user) {logoutUser()} else {redirect()}
});