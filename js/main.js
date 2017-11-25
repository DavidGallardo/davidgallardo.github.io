$(document).ready(function(){

// Mobile Navigation
$("#nav-trigger span").click(function(){
      $('nav ul').toggleClass('ul-open');
      $('nav .list-wrapper').toggleClass('list-open');
      $('#close').toggleClass('show');
      $('#menu').toggleClass('show');
    });

// Scroll to section
	$("#scroll-down").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#at-content").offset().top -100
	    }, 800);
	});
  $(window).bind("mousewheel", function() {
     $("html, body").stop(true, false);;
  });

// ///////////////////////////////////////////////////////////////


// Progress Bar on Posts
 var getMax = function(){
    return $(document).height() - $(window).height();
  }
    
  var getValue = function(){
    return $(window).scrollTop();
  }
    
  if ('max' in document.createElement('progress')) {
    // Browser supports progress element
    var progressBar = $('progress');
        
    // Set the Max attr for the first time
    progressBar.attr({ max: getMax() });

    $(document).on('scroll', function(){
      // On scroll only Value attr needs to be calculated
      progressBar.attr({ value: getValue() });
    });
      
    $(window).resize(function(){
      // On resize, both Max/Value attr needs to be calculated
      progressBar.attr({ max: getMax(), value: getValue() });
    }); 
  
  } else {

    var progressBar = $('.progress-bar'), 
        max = getMax(), 
        value, width;
        
    var getWidth = function() {
      // Calculate width in percentage
      value = getValue();            
      width = (value/max) * 100;
      width = width + '%';
      return width;
    }
        
    var setWidth = function(){
      progressBar.css({ width: getWidth() });
    }
        
    $(document).on('scroll', setWidth);
    $(window).on('resize', function(){
      // Need to reset the Max attr
      max = getMax();
      setWidth();
    });
  }

// ///////////////////////////////////////////////////////////////

// Slick slider
			$('.slider').slick({
			  centerMode: true,
			  arrows: false,
			  centerPadding: '120px',
			  infinite: true,
			  slidesToShow: 1,
			  draggable: true,
			  variableWidth: true,
			  focusOnSelect: true,
			  adaptiveHeight: false,
			  responsive: [
			    {
			      breakpoint: 768,
			      settings: {
			        centerMode: true,
			        arrows: false,
			        centerPadding: '120px',
			        infinite: true,
			        slidesToShow: 2,
			        draggable: true,
			        variableWidth: true,
			        focusOnSelect: true,
			        adaptiveHeight: false
			      }
			    }
			  ]
			});
});
// Ends $Document Ready Function
// /////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////

