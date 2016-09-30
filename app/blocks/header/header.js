(function(global){
	var header = {};

	header.init = function init(){
		var headerElement = $("header.header"),
    headerFixedClass = "header_fixed",
    hero = $('.hero'),
    heroTop = hero.offset().top,
    headerHeight = $('header').height();

		$(window).scroll(function() {
		  if( $(this).scrollTop() > headerHeight ) {
		    headerElement.addClass(headerFixedClass);
		    hero.css('marginTop', heroTop);
		  } else {
		    headerElement.removeClass(headerFixedClass);
		    hero.css('marginTop', 60);
		  }
		});
	}
	global.header = header;
})(this);