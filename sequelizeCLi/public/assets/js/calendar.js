
// next day function
$('a.nextDay').click(function() { 
  $('li.current').next().addClass('current').prev().removeClass('current');
});

// previous day
  $('a.prevDay').click(function() { 
  $('li.current').prev().addClass('current').next().removeClass('current');
});

// current day
$('a.today').click(function(){
  $('li.current').removeClass('current');
  $('li.today').addClass('current');
});

// expand days
$('a.expand').click(function(){
  $(this).parent().toggleClass('open');
  $(this).toggleClass('open');
});