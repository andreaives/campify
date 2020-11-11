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


// function pinElement() {
//   var products = document.querySelector('.campify-profile'),
//     scroll = window.scrollY,
//     nav = document.querySelector('.side-nav'),
//     navTop = nav.offsetTop
//     calender = document.querySelector('.calender'),
//     offset = header.clientHeight,
//     end = products.clientHeight + products.offsetTop; 


//     if (scroll >= navTop  && !(scroll >= end)) {
//       nav.style.position = 'fixed';
//       nav.style.top = offset;
//   } else if (scroll < navTop) {
//       nav.style.position = 'relative';
      
// }
// if(scroll >= end){
//          nav.style.position = 'relative';
//          nav.style.top = end.style.top; 
//       }
//   }    
document.addEventListener('scroll', pinElement)