function getUser() {
 $.get("/api/profile", function(data) {
   console.log("Profile", data);
 //   user = data;
 //   if (!user || !user.length) {
 //     displayEmpty();
 //   }
 //   else {
 //     initializeRows();
 //   }
 });
}
getUser()