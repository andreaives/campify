$(function() {

  $(".create-review").on("submit", function(event){
    event.preventDefault();
    var newReview = {
      star: $("[name=rating]:checked").val().trim(),
      title: $("#title").val().trim(),
      body: $("#body").val().trim(),
      privacy: $("[name=postprivacy]:checked").val().trim()
    };
    $.ajax("/api/reviews", {
      type: "POST",
      data: newReview
    }).then(function(){
      console.log("New review submitted.")
      location.reload()
    })
  });

  
  $(".delete-review").on("click", function(event){
    var id = $(this).data("id");
    $.ajax("/api/reviews/" + id, {
      type: "DELETE"
    }).then(function(){
      console.log("Review" + id + "deleted.")
      location.reload()
    })
  })
});
