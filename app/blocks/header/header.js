(function(global){
	var header = {};

	// jQuery solution
	header.init = function init(){
		var headerElement = $("header.header"),
    headerFixedClass = "header_fixed",
    body = $('body'),
    headerHeight = $('header').outerHeight();

		$(window).scroll(function() {
		  if( $(this).scrollTop() > headerHeight ) {
		    headerElement.addClass(headerFixedClass);
		    body.css('marginTop', headerHeight);
		  } else {
		    headerElement.removeClass(headerFixedClass);
		    body.css('marginTop', 0);
		  }
		});

	/*var myHeader = document.getElementsByTagName('header')[0],
			headerHeight = myHeader.getBoundingClientRect().height,
			latestKnownScrollY = 0,
			content = document.getElementById('mainContent'),
			applied = false,
			ticking = false;

	function onScroll(){
		latestKnownScrollY = window.scrollY || window.pageYOffset;
		requestTick();
	}
	function requestTick(){
		if(!ticking) {
			requestAnimationFrame(update);
		}
		ticking = true;
	}
	function update(){
		ticking = false;
		var currentScroll = latestKnownScrollY;

		if((currentScroll > headerHeight) && (!applied)) {
			utils.addClass(myHeader, 'header_fixed');
			content.style.paddingTop = currentScroll + "px";
			applied = true;
		}
		if((currentScroll == 0) && applied) {
			utils.removeClass(myHeader, 'header_fixed');
			content.style.paddingTop = 0;
			applied = false;
		}
	}

	header.init = function init(){
		window.addEventListener('scroll', onScroll, false);
	}*/
	}
	global.header = header;

})(this);