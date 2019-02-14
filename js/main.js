$(document).ready(function() {

	// Scroll Down Arrow

	$("#contact-link").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#contact-section").offset().top -100
	    }, 800);
	});

});	