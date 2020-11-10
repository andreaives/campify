$(function() { // data from RIDB 
  var searchArr = []
  var searchForm = $("form.search")
  searchForm.on("submit", function(event) {
    event.preventDefault();
    searchArr = []
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // https://cors-anywhere.herokuapp.com/
          const userLat = pos.lat
          const userLon = pos.lng
          let recAreaSettings = {
            async: true,
            crossDomain: true,
            url: 'https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?limit=50&latitude='+userLat+'&longitude='+userLon+'&radius=25&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
            method: "GET",
            contentType: "application/json"
          };
            $.ajax(recAreaSettings).done(function (response){
              var resultArr = response.RECDATA
              console.log(resultArr)
              resultArr.forEach(function(data) {
                var searchItem = {
                  name: data.RecAreaName,
                  // description: data.RecAreaDescription,
                  lat: data.RecAreaLatitude,
                  lon: data.RecAreaLongitude,
                  phone: data.RecAreaPhone,
                  email: data.RecAreaEmail,
                  reservable: data.reservable,
                  recAreaId: data.RecAreaID
                }
                searchArr.push(searchItem)
              })
              for(i=0;i<searchArr.length;i++){
                var resultDiv = $("<div>");
                resultDiv.addClass("searchResult");
                resultDiv.attr("RecAreaId", searchArr[i].recAreaId)
                var nameResult = $("<div>");
                nameResult.addClass("nameResult");
                nameResult.text("Rec Area Name: " + searchArr[i].name);
                resultDiv.append(nameResult);
                // var descriptionResult = $("<div>");
                // descriptionResult.addClass("descriptionResult");
                // descriptionResult.text("Description: " + searchArr[i].description);
                // resultDiv.append(descriptionResult);
                var coordResult = $("<div>");
                coordResult.addClass("coordResult");
                coordResult.text("Coordinates: " +"( "+ searchArr[i].lat + " , " + searchArr[i].lon+" )");
                resultDiv.append(coordResult);
                var phoneResult = $("<div>");
                phoneResult.addClass("phoneResult");
                phoneResult.text("Phone Number: " + searchArr[i].phone);
                resultDiv.append(phoneResult);
                var emailResult = $("<div>");
                emailResult.addClass("emailResult");
                emailResult.text("Email: " + searchArr[i].email);
                resultDiv.append(emailResult);
                var facilityBtn = $("<button>")
                .addClass("facilitybtn")
                .text("View Facilities in this Rec Area");
                facilityBtn.attr('id', "facilityBtn" + i);
                // facilityBtn.attr('indx', indx);
                resultDiv.append(facilityBtn)
                $("#searchResults").append(resultDiv);
              }
              for(a=0;a<50;a++){
                var facilityListn = document.getElementById('facilityBtn' + a)
                $(facilityListn).on("click", function(event) {
                event.preventDefault();
                searchArr = []
                console.log(event)
                let recIdTarget = event.target.parentElement.attributes[1].value
                console.log(recIdTarget)
                let facilitySettings = {
                  async: true,
                  crossDomain: true,
                  url: 'https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas/'+recIdTarget+'/facilities?limit=50&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
                  method: "GET",
                  contentType: "application/json"
                }
                $.ajax(facilitySettings).done(function(response){
                  var resultArr = response.RECDATA
                  console.log(response)
                  resultArr.forEach(function(data) {
                    var searchItem = {
                      name: data.FacilityName,
                      facilityID: data.FacilityID,
                      RecArea: data.ParentRecAreaID,
                      facilityLat: data.FacilityLatitude,
                      facilityLon: data.FacilityLongitude,
                      phone: data.FacilityPhone,
                      email: data.FacilityEmail,
                      reservable: data.Reservable,
                      facilityDesc: data.FacilityDescription,
                      facilityType: data.FacilityTypeDescription
                      // permittedequipment: data.PERMITTEDEQUIPMENT[0].EquipmentName,
                      // maxOccup: data.ATTRIBUTES[8].attributeValue,
                      // pets: data.ATTRIBUTES[12].attributeValue,
                      // photo1: data.ENTITYMEDIA[0].URL,
                      // photo2: data.ENTITYMEDIA[1].URL,
                      // photo3: data.ENTITYMEDIA[2].URL
                    }
                    searchArr.push(searchItem)
                  })
                  for(i=0;i<searchArr.length;i++){
                  var resultDiv = $("<div>");
                  resultDiv.addClass("searchResult");
                  resultDiv.attr("facilityId", searchArr[i].facilityID)
                  var nameResult = $("<div>");
                  nameResult.addClass("nameResult");
                  nameResult.text("Facility Name: " + searchArr[i].name);
                  resultDiv.append(nameResult);
                  var phoneResult = $("<div>");
                  phoneResult.addClass("phoneResult");
                  phoneResult.text("Phone #: " + searchArr[i].phone);
                  resultDiv.append(phoneResult);
                  var coordResult = $("<div>");
                  coordResult.addClass("coordResult");
                  coordResult.text("Coordinates: " +"( "+ searchArr[i].facilityLat + " , " + searchArr[i].facilityLon+" )");
                  resultDiv.append(coordResult);
                if(searchArr[i].facilityType == "Campground"){
                  var campgroundBtn = $("<button>")
                  .addClass("campgroundbtn")
                  .text("View Campgrounds for this Facility");
                  campgroundBtn.attr('id', "campgroundBtn" + i);
                  // campgroundBtn.attr('indx', indx);
                  resultDiv.append(campgroundBtn)
                }
                  $("#searchResults").append(resultDiv);
                }
                for(a=0;a<50;a++){
                  var campgroundListn = document.getElementById('campgroundBtn' + a)
                  $(campgroundListn).on("click", function(event) {
                  event.preventDefault();
                  searchArr = []
                  console.log(event)
                  let recIdTarget = event.target.parentElement.attributes[1].value
                  console.log(recIdTarget)
                  let campgroundSettings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/facilities/'+recIdTarget+'/campsites?limit=50&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
                    method: "GET",
                    contentType: "application/json"
                  }
                  $.ajax(campgroundSettings).done(function(response){
                    var resultArr = response.RECDATA
                    console.log(response)
                    console.log(resultArr)
                  })
                })
                }
                })
                $("#searchResults").empty();
              })
              }
            })
        $("#searchResults").empty();
      })
    }
  })
})