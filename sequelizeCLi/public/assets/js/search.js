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
            url: 'https://stormy-cliffs-87695.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?limit=50&latitude='+userLat+'&longitude='+userLon+'&radius=25&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
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
                .addClass("facilityBtn")
                .text("View Facilities in this Rec Area");
                facilityBtn.attr('id', "facilityBtn" + i);
                resultDiv.append(facilityBtn)
                // facilityBtn.attr('indx', indx);
                var activityBtn = $("<button>")
                .addClass("activityBtn")
                .text("View Activities in this Rec Area");
                activityBtn.attr('id', "activityBtn" + i);
                resultDiv.append(activityBtn)

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
                  url: 'https://stormy-cliffs-87695.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas/'+recIdTarget+'/facilities?limit=50&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
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
                  .text("View Campsites for this Campground");
                  campgroundBtn.attr('id', "campgroundBtn" + i);
                  // campgroundBtn.attr('indx', indx);
                  resultDiv.append(campgroundBtn)
                }
                var pinButton = $("<button>")
                pinButton.addClass("pinBtn")
                pinButton.text("PIN")
                pinButton.attr("id", "campground" + i)
                resultDiv.append(pinButton)
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
                    url: 'https://stormy-cliffs-87695.herokuapp.com/https://ridb.recreation.gov/api/v1/facilities/'+recIdTarget+'/campsites?limit=50&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
                    method: "GET",
                    contentType: "application/json"
                  }
                  $.ajax(campgroundSettings).done(function(response){
                    var resultArr = response.RECDATA
                    console.log(response)
                    resultArr.forEach(function(data) {
                      var searchItem = {
                        campsiteID: data.CampsiteID,
                        campsiteName: data.CampsiteName,
                        typeofUse: data.TypeOfUse,
                        campsiteLat: data.CampsiteLatitude,
                        campsiteLon: data.CampsiteLongitude,
                        attributes: data.ATTRIBUTES,
                        permittedEquipment: data.PERMITTEDEQUIPMENT,
                        parentFacility: data.FacilityID
                      }
                      searchArr.push(searchItem)
                    })
                    console.log(searchArr)
                    for(i=0;i<searchArr.length;i++){
                    var resultDiv = $("<div>");
                    resultDiv.addClass("searchResult");
                    resultDiv.attr("facilityId", searchArr[i].facilityID)
                    var nameResult = $("<div>");
                    nameResult.addClass("nameResult");
                    nameResult.text("Campsite Name: " + searchArr[i].campsiteName);
                    resultDiv.append(nameResult);
                    var equipmentResult = $("<div>");
                    equipmentResult.addClass("equipmentResult");
                    var equipment = (searchArr[i].permittedEquipment)
                    equipmentDiv = $("<div>")
                    equipment.forEach(function(data){
                    equipmentDiv.text("Permitted Equipment: " + data.equipmentName + ", Max Length(ft): " + data.MaxLength);
                    equipmentResult.append(equipmentDiv);
                    }) //TODO get equipment rendering nailed down
                    resultDiv.append(equipmentResult)
                    var useTypeResult = $("<div>");
                    useTypeResult.addClass("useTypeResult");
                    useTypeResult.text("Type of use: " + searchArr[i].typeofUse);
                    resultDiv.append(useTypeResult);
                    var coordResult = $("<div>");
                    coordResult.addClass("coordResult");
                    coordResult.text("Coordinates: " +"( "+ searchArr[i].campsiteLat + " , " + searchArr[i].campsiteLon+" )");
                    resultDiv.append(coordResult);
                    var attributeArr =  searchArr[i].attributes
                    attributeArr.forEach(function(data){
                      if(data.AttributeName === "Pets Allowed"){
                        var petsResult = $("<div>");
                        petsResult.addClass("petsResult");
                        petsResult.text("Pets Allowed: " + data.AttributeValue);
                        resultDiv.append(petsResult);
                      }
                    })
                    var pinButton = $("<button>")
                    pinButton.addClass("pinBtn")
                    pinButton.text("PIN")
                    pinButton.attr("id", "campground" + i)
                    resultDiv.append(pinButton)
                    $("#searchResults").append(resultDiv);
                    }
                  })
                  $("#searchResults").empty();
                })
                }
                })
                $("#searchResults").empty();
              })
                var activityListn = document.getElementById('activityBtn' + a)
                $(activityListn).on("click", function(event) {
                  var recareaID = event.target.parentElement.attributes[1].value
                  let activitySettings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://stormy-cliffs-87695.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas/'+recareaID+'/activities?limit=50&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
                    method: "GET",
                    contentType: "application/json"
                  }
                  $.ajax(activitySettings).done(function(response){
                    var resultArr = response.RECDATA
                    console.log(resultArr)
                  })
                })
              }
            })
        $("#searchResults").empty();
      })
    }
  })
})