function pinElement() {
  var products = document.querySelector('.campify-profile'),
    scroll = window.scrollY,
    nav = document.querySelector('.navbar'),
    navTop = nav.offsetTop
    calender = document.querySelector('.calender'),
    offset = header.clientHeight,
    end = products.clientHeight + products.offsetTop; 


    if (scroll >= navTop  && !(scroll >= end)) {
      nav.style.position = 'fixed';
      nav.style.top = offset;
  } else if (scroll < navTop) {
      nav.style.position = 'relative';
      
}
if(scroll >= end){
         nav.style.position = 'relative';
         nav.style.top = end.style.top; 
      }
  }    
document.addEventListener('scroll', pinElement)