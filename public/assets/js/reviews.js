$(function() {

  var reviewContainer = $(".review-container");

  // Click events for the edit and delete buttons
  $("button.delete").on("click", handleReviewDelete);
  $("button.edit").on("click", handleReviewEdit);
 
  var reviews;

  // This function grabs posts from the database and updates the view
  function getReviews() {
    $.get("/api/reviews", function(data) {
      console.log("Reviews", data);
      reviews = data;
      if (!reviews || !reviews.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete reviews
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/reviews/" + id
    })
      .then(function() {
        getReviews();
      });
  }

  // Getting the initial list of reviews
  getReviews();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    reviewContainer.empty();
    var reviewsToAdd = [];
    for (var i = 0; i < reviews.length; i++) {
      reviewsToAdd.push(createNewRow(reviews[i]));
    }
    reviewContainer.append(reviewsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(review) {
    var newReviewCard = $("<div>");
    newReviewCard.addClass("card");
    var newReviewCardHeading = $("<div>");
    newReviewCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newReviewTitle = $("<h2>");
    var newReviewDate = $("<small>");
    var newReviewPrivacy = $("<h5>");
    newReviewPrivacy.text(review.Privacy);
    newReviewPrivacy.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newReviewCardBody = $("<div>");
    newReviewCardBody.addClass("card-body");
    var newReviewBody = $("<p>");
    newReviewTitle.text(review.title + " ");
    newReviewBody.text(review.body);
    var formattedDate = new Date(review.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newReviewDate.text(formattedDate);
    newReviewTitle.append(newReviewDate);
    newReviewCardHeading.append(deleteBtn);
    newReviewCardHeading.append(editBtn);
    newReviewCardHeading.append(newReviewTitle);
    newReviewCardHeading.append(newReviewPrivacy);
    newReviewCardBody.append(newReviewBody);
    newReviewCard.append(newReviewCardHeading);
    newReviewCard.append(newReviewCardBody);
    newReviewCard.data("review", review);
    return newReviewCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handleReviewDelete() {
    var currentReview = $(this)
      .parent()
      .parent()
      .data("review");
    deleteReview(currentReview.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleReviewEdit() {
    var currentReview = $(this)
      .parent()
      .parent()
      .data("review");
    window.location.href = "/cms?review_id=" + currentReview.id;
  }

  // This function displays a message when there are no reviews
  function displayEmpty() {
    reviewContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No reviews yet.");
    reviewContainer.append(messageH2);
  }

});
