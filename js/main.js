$( document ).ready(function() {

	// Scroll Down Arrow

	$("#scroll-arrow").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#story").offset().top -100
	    }, 800);
	});
	// $("#company").click(function() {
	//     $('html, body').animate({
	//         scrollTop: $("#contact").offset().top -100
	//     }, 800);
	// });
  $(window).bind("mousewheel", function() {
     $("html, body").stop(true, false);;
  });

  // ///////////////////////////////////////////////////////////////

  // Trigger Animations On Scroll

	var watchers = $('.faded').map(function(i, element) {

		var watcher = scrollMonitor.create( element, -200);
		watcher.enterViewport(function() {
				$(element).addClass('fadeInUp')
		});

	});

});

