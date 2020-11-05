$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var reviewId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?review_id=") !== -1) {
    reviewId = url.split("=")[1];
    getReviewData(reviewId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");

  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!titleInput.val().trim() || !bodyInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newReview = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
    };

    console.log(newReview);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newReview.id = reviewId;
      updateReview(newReview);
    }
    else {
      submitReview(newReview);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitReview(Review) {
    $.review("/api/reviews/", Review, function() {
      window.location.href = "/submitted-reviews";
    });
  }

  // Gets post data for a post if we're editing
  function getReviewData(id) {
    $.get("/api/reviews/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updateReview(review) {
    $.ajax({
      method: "PUT",
      url: "/api/reviews",
      data: review
    })
      .then(function() {
        window.location.href = "/submitted-reviews";
      });
  }
});