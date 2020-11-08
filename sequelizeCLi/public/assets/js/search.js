$(document).ready(function() { // data from RIDB 
  $("#searchButton").on("click", function(event) {
    event.preventDefault();
    console.log(event)
    userSearch = event.target.parentElement.children[1].value;
    console.log(userSearch)
    const searchParam = $("#searchCriteria option:selected").text()
    console.log(searchParam)
    switch(searchParam){
      case "Campsites":
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              const userLat = pos.lat
              const userLon = pos.lng
              console.log(userLat+" "+userLon)
              let campSettings = {
                async: true,
                crossDomain: true,
                url: 'https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/campsites?query='+userSearch+'&limit=50&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
                method: "GET",
              };
              console.log(campSettings)
                $.ajax(campSettings).done(function (response){
                  console.log(response)
                  })
          })
        }
      break;
      case "Facilities":
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              const userLat = pos.lat
              const userLon = pos.lng
              console.log(userLat+" "+userLon)
              let campSettings = {
                async: true,
                crossDomain: true,
                url: 'https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/facilities?query='+userSearch+'&limit=50&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
                method: "GET",
              };
              console.log(campSettings)
                $.ajax(campSettings).done(function (response){
                  console.log(response)
                  })
          })
        }
      break;
      case "Rec Areas":
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              const userLat = pos.lat
              const userLon = pos.lng
              console.log(userLat+" "+userLon)
              let campSettings = {
                async: true,
                crossDomain: true,
                url: 'https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?query='+userSearch+'&limit=50&latitude='+userLat+'&longitude='+userLon+'&radius=25&apikey=635989e4-a266-4eac-8549-5bdd1e8435a1', //heroku app is a no-cors fix for the riDB access
                method: "GET",
              };
              console.log(campSettings)
                $.ajax(campSettings).done(function (response){
                  console.log(response)
                  })
          })
        }
      break;
    }    
  })
})