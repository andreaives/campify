$(function() { // data from RIDB 
  var searchArr = []
  var searchForm = $("form.search")
  searchForm.on("submit", function(event) {
    event.preventDefault();
    // searchArr = []
    // var searchTerm = $("input#searchInput");
    // var userSearch = searchTerm.val();
    // var searchDropdown = $("select#searchCriteria")
    // var searchParam = searchDropdown.val();
    // switch(searchParam){
    //   case "Campsites":
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //           const pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude,
    //           };
    //           let campSettings = {
    //             async: true,
    //             crossDomain: true,
    //             url: 'https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/campsites?query='+userSearch+'&limit=50&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
    //             method: "GET",
    //           };
    //             $.ajax(campSettings).done(function (response){
    //               var resultArr = response.RECDATA
    //               resultArr.forEach(function(data) {
    //                 var searchItem = {
    //                   facilityID: data.FacilityID,
    //                   campsiteID: data.CampsiteID,
    //                   campsiteLat: data.CampsiteLatitude,
    //                   campsiteLon: data.CampsiteLongitude,
    //                   // permittedequipment: data.PERMITTEDEQUIPMENT[0].EquipmentName,
    //                   // maxOccup: data.ATTRIBUTES[8].AttributeValue,
    //                   // pets: data.ATTRIBUTES[12].AttributeValue,
    //                   // photo1: data.ENTITYMEDIA[0].URL,
    //                   // photo2: data.ENTITYMEDIA[1].URL,
    //                   // photo3: data.ENTITYMEDIA[2].URL
    //                 }
    //                 searchArr.push(searchItem)
    //               })
    //               for(i=0;i<searchArr.length;i++){
    //               var resultDiv = $("<div>");
    //               resultDiv.addClass("searchResult");
    //               var facilityResult = $("<div>");
    //               facilityResult.addClass("facilityResult");
    //               facilityResult.text("Facility ID: " + searchArr[i].facilityID);
    //               resultDiv.append(facilityResult);
    //               var campsiteResult = $("<div>");
    //               campsiteResult.addClass("campsiteResult");
    //               campsiteResult.text("Campsite ID: " + searchArr[i].campsiteID);
    //               resultDiv.append(campsiteResult);
    //               var coordResult = $("<div>");
    //               coordResult.addClass("coordResult");
    //               coordResult.text("Coordinates: " + searchArr[i].campsiteLat + "X" + searchArr[i].campsiteLon);
    //               resultDiv.append(coordResult);
    //               $("#searchResults").append(resultDiv);
    //               }
    //               })
    //       })
    //     }
    //   break;
    //   case "Facilities":
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //           const pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude,
    //           };
    //           let campSettings = {
    //             async: true,
    //             crossDomain: true,
    //             url: 'https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/facilities?query='+userSearch+'&limit=50&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
    //             method: "GET",
    //           };
    //             $.ajax(campSettings).done(function (response){
    //               var resultArr = response.RECDATA
    //               resultArr.forEach(function(data) {
    //                 var searchItem = {
    //                   name: data.FacilityName,
    //                   facilityID: data.FacilityID,
    //                   RecArea: data.ParentRecAreaID,
    //                   facilityLat: data.FacilityLatitude,
    //                   facilityLon: data.FacilityLongitude,
    //                   phone: data.FacilityPhone,
    //                   email: data.FacilityEmail,
    //                   reservable: data.Reservable,
    //                   facilityDesc: data.FacilityDescription
    //                   // permittedequipment: data.PERMITTEDEQUIPMENT[0].EquipmentName,
    //                   // maxOccup: data.ATTRIBUTES[8].attributeValue,
    //                   // pets: data.ATTRIBUTES[12].attributeValue,
    //                   // photo1: data.ENTITYMEDIA[0].URL,
    //                   // photo2: data.ENTITYMEDIA[1].URL,
    //                   // photo3: data.ENTITYMEDIA[2].URL
    //                 }
    //                 searchArr.push(searchItem)
    //               })

    //               })
    //       })
    //     }
    //   break;
    //   case "RecAreas":
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //           const pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude,
    //           };
    //           const userLat = pos.lat
    //           const userLon = pos.lng
    //           let campSettings = {
    //             async: true,
    //             crossDomain: true,
    //             url: 'https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?query='+userSearch+'&limit=50&latitude='+userLat+'&longitude='+userLon+'&radius=25&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
    //             method: "GET",
    //           };
    //             $.ajax(campSettings).done(function (response){
    //               var resultArr = response.RECDATA
    //               resultArr.forEach(function(data) {
    //                 var searchItem = {
    //                   name: data.RecAreaName,
    //                   description: data.RecAreaDescription,
    //                   lat: data.RecAreaLatitude,
    //                   lon: data.RecAreaLongitude,
    //                   phone: data.RecAreaPhone,
    //                   email: data.RecAreaEmail,
    //                   reservable: data.reservable
    //                 }
    //                 searchArr.push(searchItem)
    //               })
    //               for(i=0;i<searchArr.length;i++){
    //                 var resultDiv = $("<div>");
    //                 resultDiv.addClass("searchResult");
    //                 var nameResult = $("<div>");
    //                 nameResult.addClass("nameResult");
    //                 nameResult.text("Rec Area Name: " + searchArr[i].name);
    //                 resultDiv.append(nameResult);
    //                 var descriptionResult = $("<div>");
    //                 descriptionResult.addClass("descriptionResult");
    //                 descriptionResult.text("Description: " + searchArr[i].description);
    //                 resultDiv.append(descriptionResult);
    //                 var coordResult = $("<div>");
    //                 coordResult.addClass("coordResult");
    //                 coordResult.text("Coordinates: " + searchArr[i].lat + " X " + searchArr[i].lon);
    //                 resultDiv.append(coordResult);
    //                 var phoneResult = $("<div>");
    //                 phoneResult.addClass("phoneResult");
    //                 phoneResult.text("Phone Number: " + searchArr[i].phone);
    //                 resultDiv.append(phoneResult);
    //                 var emailResult = $("<div>");
    //                 emailResult.addClass("emailResult");
    //                 emailResult.text("Email: " + searchArr[i].email);
    //                 resultDiv.append(emailResult);
    //                 $("#searchResults").append(resultDiv);
    //                 }
    //               })
    //       })
    //     }
    //   break;
    // }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // https://cors-anywhere.herokuapp.com/
          const userLat = pos.lat
          const userLon = pos.lng
          let campSettings = {
            async: true,
            crossDomain: true,
            url: 'https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?limit=50&latitude='+userLat+'&longitude='+userLon+'&radius=25&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
            method: "GET",
            contentType: "application/json"
          };
            $.ajax(campSettings).done(function (response){
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
                coordResult.text("Coordinates: " + searchArr[i].lat + " X " + searchArr[i].lon);
                resultDiv.append(coordResult);
                var phoneResult = $("<div>");
                phoneResult.addClass("phoneResult");
                phoneResult.text("Phone Number: " + searchArr[i].phone);
                resultDiv.append(phoneResult);
                var emailResult = $("<div>");
                emailResult.addClass("emailResult");
                emailResult.text("Email: " + searchArr[i].email);
                resultDiv.append(emailResult);
                $("#searchResults").append(resultDiv);
                }
              })
      })
    }
    
  })

})